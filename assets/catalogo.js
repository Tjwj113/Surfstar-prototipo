(() => {
  'use strict';
  const data = window.SURFSTAR_PRODUCTS || [];
  const reps = window.SURFSTAR_REPS || [];
  const categoryList = [
    ['todos','Todas as linhas'], ['feminino','Feminino adulto'],
    ['masculino','Masculino adulto'], ['infantil-m','Infantil masculino'],
    ['infantil-f','Infantil feminino'], ['exclusivos','Exclusivos'],
    ['flip-flop','Flip flop'], ['componentes','Cabedais']
  ];
  const validCategories = new Set(categoryList.map(x=>x[0]));
  const params = new URLSearchParams(location.search);
  let selected = validCategories.has(params.get('linha')) ? params.get('linha') : 'todos';
  const filters = document.getElementById('filters');
  const grid = document.getElementById('catalogGrid');
  const search = document.getElementById('productSearch');
  const sort = document.getElementById('catalogSort');
  const empty = document.getElementById('catalogEmpty');
  const count = document.getElementById('resultsCount');
  const dialog = document.getElementById('productDialog');
  const normalize = text=>String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('pt-BR');
  document.getElementById('catalogTotal').textContent = data.length;
  categoryList.forEach(([key,label])=>{
    const button = document.createElement('button');
    button.className='filter-chip';button.type='button';button.dataset.line=key;
    button.textContent=label;button.setAttribute('aria-pressed',String(key===selected));
    button.addEventListener('click',()=>{
      selected=key;
      const url=new URL(location.href);
      if (key==='todos') url.searchParams.delete('linha');
      else url.searchParams.set('linha',key);
      try { if (location.protocol!=='about:') history.replaceState(null,'',url.pathname+url.search+url.hash); } catch(_) {}
      render();
    });
    filters.append(button);
  });
  function render() {
    const q=normalize(search.value.trim());
    let filtered=data.filter(p=>(selected==='todos'||p.line===selected) && (!q||normalize(p.category+' '+p.name+' '+p.page+' '+p.line).includes(q)));
    if(sort.value==='az') filtered.sort((a,b)=>a.category.localeCompare(b.category,'pt-BR')||a.page-b.page);
    if(sort.value==='za') filtered.sort((a,b)=>b.category.localeCompare(a.category,'pt-BR')||a.page-b.page);
    document.querySelectorAll('.filter-chip').forEach(ch=>ch.setAttribute('aria-pressed',String(ch.dataset.line===selected)));
    grid.replaceChildren();
    const frag=document.createDocumentFragment();
    filtered.forEach(product=>{
      const card=document.createElement('article');card.className='catalog-card';
      card.innerHTML=`<div class="catalog-img-wrap"><img loading="lazy" decoding="async" alt="${product.category}: ${product.name}" src="${product.photo}"><span class="catalog-tag">Catálogo 2026</span></div><div class="catalog-card-body"><small>${product.category}</small><h3>${product.name}</h3><p>Imagem da página ${product.page} do catálogo</p><button class="catalog-card-button" type="button">Consultar esta imagem ↗</button></div>`;
      card.querySelector('button').addEventListener('click',()=>openProduct(product));
      frag.appendChild(card);
    });
    grid.appendChild(frag);
    empty.hidden=filtered.length!==0;
    grid.hidden=filtered.length===0;
    count.innerHTML=`<strong>${filtered.length}</strong> ${filtered.length===1?'imagem encontrada':'imagens encontradas'}`;
  }
  function openProduct(product){
    document.getElementById('dialogImage').src=product.photo;
    document.getElementById('dialogImage').alt=product.category+', '+product.name;
    document.getElementById('dialogProductName').textContent=product.name;
    document.getElementById('dialogProductLine').textContent=product.category+' • Página '+product.page+' do catálogo 2026';
    const choices=document.getElementById('dialogReps');choices.replaceChildren();
    reps.forEach(rep=>{
      const a=document.createElement('a');a.className='dialog-rep-link';a.target='_blank';a.rel='noopener noreferrer';
      const message=`Olá, ${rep.name}! Vi a ${product.name.toLowerCase()} na linha ${product.category}, página ${product.page} do catálogo 2026 da Surf Star. Poderia me ajudar a identificar os produtos dessa imagem e informar opções para revenda?`;
      a.href=window.surfstarWhatsapp(rep.phone,message);
      a.innerHTML=`<span aria-hidden="true">◉</span><span>${rep.name}</span><strong>WhatsApp ↗</strong>`;
      choices.appendChild(a);
    });
    if(typeof dialog.showModal==='function') dialog.showModal();
    else dialog.setAttribute('open','');
  }
  document.getElementById('closeDialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog) dialog.close();});
  search.addEventListener('input',render);
  sort.addEventListener('change',render);
  document.getElementById('resetFilters').addEventListener('click',()=>{
    search.value='';selected='todos';sort.value='catalogo';
    const url=new URL(location.href);url.searchParams.delete('linha');
    try { if (location.protocol!=='about:') history.replaceState(null,'',url.pathname+url.search+url.hash); } catch(_) {}
    render();
  });
  render();
})();

(() => {
  'use strict';
  const grid=document.getElementById('repsGrid');
  (window.SURFSTAR_REPS || []).forEach(rep=>{
    const card=document.createElement('article');card.className='rep-card';
    const message=`Olá, ${rep.name}! Encontrei seu contato no site demonstrativo da Surf Star e gostaria de informações sobre produtos e condições de revenda. Você atende minha região?`;
    const a=window.surfstarWhatsapp(rep.phone,message);
    card.innerHTML=`<span class="rep-monogram" aria-hidden="true">${rep.initials}</span><span class="rep-meta">Equipe comercial</span><h3>${rep.name}</h3><p>Converse sobre modelos, opções disponíveis e como revender os produtos Surf Star.</p><a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="${a}">Conversar pelo WhatsApp ↗</a><small>Contato divulgado no Linktree da Surf Star</small>`;
    grid.appendChild(card);
  });
})();

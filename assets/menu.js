(() => {
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('navLinks');
if (!toggle || !nav) return;
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click', () => {
  nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('keydown', ev=>{
  if (ev.key==='Escape') { nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }
});
})();
(() => {
  const WA = '5582999241920';
  const wa = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

  document.querySelectorAll('[data-wa]').forEach((a) => {
    a.href = wa(a.dataset.wa);
    a.target = '_blank';
    a.rel = 'noopener';
  });

  // Menu mobile
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('menu');
  const setMenu = (open) => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('is-open', open);
  };
  burger.addEventListener('click', () => setMenu(burger.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // Entradas
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    items.forEach((el) => io.observe(el));
  } else items.forEach((el) => el.classList.add('in'));

  // Formulário -> WhatsApp
  const form = document.getElementById('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const note = form.querySelector('.form__note');
    if (!nome) {
      form.nome.setAttribute('aria-invalid', 'true');
      note.textContent = 'Informe seu nome para continuar.';
      form.nome.focus();
      return;
    }
    form.nome.removeAttribute('aria-invalid');
    note.textContent = '';
    let msg = `Olá, Rômulo! Meu nome é ${nome}. Interesse: ${form.interesse.value}.`;
    const extra = form.msg.value.trim();
    if (extra) msg += ` ${extra}`;
    window.open(wa(msg), '_blank', 'noopener');
  });
})();

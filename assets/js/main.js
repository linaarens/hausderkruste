
function setupMenu(){
  const toggle = document.querySelector('.menu-toggle');
  const panel  = document.querySelector('.menu-panel');
  if(!toggle || !panel) return;

  const close = (e)=>{
    if(!panel.classList.contains('open')) return;
    if(e && (panel.contains(e.target) || toggle.contains(e.target))) return;
    panel.classList.remove('open');
  };

  toggle.addEventListener('click', ()=>{ panel.classList.toggle('open') });
  document.addEventListener('click', close);
  window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') panel.classList.remove('open') });
}


function setupCarousel(){
  const viewport = document.querySelector('.carousel__viewport');
  if(!viewport) return;
  const prev = document.querySelector('.carousel__btn--prev');
  const next = document.querySelector('.carousel__btn--next');
  const scrollBy = ()=> viewport.clientWidth * 0.9;
  prev?.addEventListener('click', ()=> viewport.scrollBy({left: -scrollBy(), behavior:'smooth'}));
  next?.addEventListener('click', ()=> viewport.scrollBy({left:  scrollBy(), behavior:'smooth'}));
}


function setupContactPrefill(){
  const form = document.querySelector('#kontaktform');
  if(!form) return;
  const params = new URLSearchParams(location.search);
  const product = params.get('product');
  const subject = form.querySelector('[name="betreff"]');
  if(product && subject){ subject.value = `Bestellanfrage: ${product}` }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const note = document.getElementById('form-note');
    if(note){
      note.hidden = false;
      form.reset();
      setTimeout(()=>{ note.hidden = true }, 6000);
    }
  });
}

window.addEventListener('DOMContentLoaded', ()=>{
  setupMenu();
  setupCarousel();
  setupContactPrefill();
  setupIntranetLogin();
});

function setupIntranetLogin(){
  const form = document.getElementById('intranet-login');
  if(!form) return;
  const okUser = 'markus wagner';   
  const okPass = '070125';

  const nameEl = form.querySelector('#loginName');
  const passEl = form.querySelector('#loginPassword');
  const msgEl  = document.getElementById('loginMsg');

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = (nameEl.value || '').trim().toLowerCase();
    const pass = (passEl.value || '').trim();

    if(name === okUser && pass === okPass){
      window.location.href = 'intranet/index.html'; 
    }else{
      if(msgEl){
        msgEl.textContent = 'Anmeldename oder Passwort falsch.';
      }
    }
  });
}


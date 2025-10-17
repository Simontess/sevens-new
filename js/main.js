// main.js - handles theme, header interactions, and some shared functionality
const toggleButtons = Array.from(document.querySelectorAll('[id^="theme-toggle"]'));
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');
const yearEls = Array.from(document.querySelectorAll('[id^="year"]'));

function setYear(){
  const y = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = y);
}

function applySavedTheme(){
  const t = localStorage.getItem('site-theme');
  if(t === 'light') document.body.classList.add('light');
}

function toggleTheme(){
  document.body.classList.toggle('light');
  localStorage.setItem('site-theme', document.body.classList.contains('light') ? 'light':'dark');
}

function initPortrait(){
  const p = document.getElementById('portrait');
  if(!p) return;
  // simple procedural "portrait" using canvas
  const canvas = document.createElement('canvas');
  canvas.width = 600; canvas.height = 600; p.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  // background
  ctx.fillStyle = '#071827'; ctx.fillRect(0,0,600,600);
  // soft glowing blob
  const g = ctx.createRadialGradient(180,140,20,300,260,380);
  g.addColorStop(0,'rgba(110,231,183,0.9)');
  g.addColorStop(1,'rgba(2,6,18,0)');
  ctx.fillStyle = g; ctx.fillRect(0,0,600,600);
  // faux face (very simple)
  ctx.fillStyle = '#0e1b2a';
  ctx.beginPath();ctx.ellipse(300,300,140,180,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.02)';ctx.fillRect(20,20,560,560);
}

function initMenu(){
  if(menuToggle){
    menuToggle.addEventListener('click', ()=>{
      if(navLinks.style.display === 'flex') navLinks.style.display = '';
      else navLinks.style.display = 'flex';
    })
  }
}

// keyboard accessibility for modal close
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    const modal = document.querySelector('.modal[aria-hidden="false"]');
    if(modal){ modal.setAttribute('aria-hidden','true'); }
  }
});

setYear(); applySavedTheme(); initPortrait(); initMenu();

// wire theme toggles
toggleButtons.forEach(b => b && b.addEventListener('click', toggleTheme));

// fill a few sample projects on the index preview (fetched from projects.js seed if available)
import('./projects.js').then(m => {
  const preview = document.getElementById('project-preview');
  if(preview){
    const seeds = m.getProjectList().slice(0,3);
    preview.innerHTML = seeds.map(p=><div class="project-card"><h3>${p.title}</h3><p class="muted">${p.tags.join(' · ')}</p></div>).join('');
  }
}).catch(()=>{});

// contact form validation/submit (works without a backend; shows status)
const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const status = document.getElementById('form-status');
    status.textContent = 'Validating...';
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if(name.length < 2 || message.length < 10){
      status.textContent = 'Please give a longer name and message.'; return;
    }
    // naive email check
    if(!email.includes('@') || !email.includes('.')){ status.textContent = 'Please give a valid email.'; return; }
    // fake async send
    status.textContent = 'Sending...';
    await new Promise(r => setTimeout(r,850));
    status.textContent = 'Message sent! I will reply as soon as I can.';
    contactForm.reset();
  })
}
//inject whatsapp button into every page
document.addEventListener('DOMContentLoaded', function() {
  const whatsappButton = document.createElement('a');
  whatsappButton.href = 'https://wa.me/254111971910';
  whatsappButton.className = 'whatsapp-float';
  whatsappButton.target = '_blank';
  whatsappButton.innerHTML = '<img src="images/whatsapp-icon.png" alt="WhatsApp Icon" style="width:24px;height:24px;">';
  document.body.appendChild(whatsappButton);
}
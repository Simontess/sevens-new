// projects.js - holds project data and the UI for the Projects page
const projects = [
    {id:'p1', title:'Campus Noticeboard', tags:['web','automation'], summary:'A small Node-less static site with admin scripts that generate content from YAML for easy deployment.', details:'Built with vanilla JS.'},
    {id:'p2', title:'APK Safety Analyzer', tags:['automation','security'], summary:'Script that scans APK metadata and flags suspicious permissions.', details:'Python backend + CLI.'},
    {id:'p3', title:'UI Kit Playground', tags:['ux','web'], summary:'A living styleguide demonstrating patterns and animations.', details:'Component examples and documentation.'},
    {id:'p4', title:'Network Visualiser', tags:['web','ux'], summary:'Interactive graph of simulated network nodes.', details:'Canvas-based interactive demo.'}
  ];
  
  export function getProjectList(){ return projects.slice(); }
  
  function createCard(p){
    const el = document.createElement('article');
    el.className = 'project-card';
    el.tabIndex = 0;
    el.innerHTML = <h3>${p.title}</h3><p class="muted">${p.tags.join(' · ')}</p><p>${p.summary}</p>;
    el.addEventListener('click', ()=> openModal(p));
    el.addEventListener('keydown', (e)=>{ if(e.key==='Enter') openModal(p); });
    return el;
  }
  
  function openModal(p){
    const modal = document.getElementById('project-modal');
    const body = document.getElementById('modal-body');
    if(!modal || !body) return;
    body.innerHTML = <h2>${p.title}</h2><p class="muted">${p.tags.join(' · ')}</p><p>${p.details}</p><p><a href="#">View on GitHub</a></p>;
    modal.setAttribute('aria-hidden','false');
  }
  
  function closeModal(){
    const modal = document.getElementById('project-modal');
    if(modal) modal.setAttribute('aria-hidden','true');
  }
  
  function initProjectsPage(){
    const grid = document.getElementById('projects-grid');
    const filter = document.getElementById('filter-select');
    const search = document.getElementById('search-projects');
    const modalClose = document.querySelector('.modal-close');
    if(grid){
      projects.forEach(p => grid.appendChild(createCard(p)));
    }
    if(filter){
      filter.addEventListener('change', ()=> filterAndSearch());
    }
    if(search){
      search.addEventListener('input', ()=> filterAndSearch());
    }
    if(modalClose) modalClose.addEventListener('click', closeModal);
    document.getElementById('project-modal')?.addEventListener('click', (e)=>{ if(e.target === e.currentTarget) closeModal(); });
  }
  
  function filterAndSearch(){
    const grid = document.getElementById('projects-grid');
    const f = document.getElementById('filter-select').value;
    const q = document.getElementById('search-projects').value.toLowerCase();
    grid.innerHTML = '';
    const filtered = projects.filter(p => (f==='all' || p.tags.includes(f)) && (p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)));
    filtered.forEach(p => grid.appendChild(createCard(p)));
    if(filtered.length === 0) grid.innerHTML = '<p class="muted">No projects match your search.</p>';
  }
  
  // auto init if on projects page
  if(document.getElementById('projects-grid')) initProjectsPage();
  
  export { initProjectsPage };
  
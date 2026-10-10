(function(){
 const search=document.getElementById('site-search');
 const select=document.getElementById('label-filter');
 const grid=document.getElementById('post-grid');
 const empty=document.getElementById('empty-state');
 const chips=[...document.querySelectorAll('.chip[data-label]')];
 if(!grid) return;
 const cards=[...grid.querySelectorAll('.post-card')];
 let activeLabel='';
 const params=new URLSearchParams(location.search);
 const requested=(params.get('label')||'').toLowerCase();
 if(requested){activeLabel=requested;if(select)select.value=requested;chips.forEach(c=>c.classList.toggle('active',c.dataset.label===requested));}
 function render(){
   const term=(search?.value||'').toLowerCase().trim();
   let visible=0;
   cards.forEach(card=>{
     const text=card.dataset.search||'';
     const labels=(card.dataset.labels||'').split('|');
     const matchTerm=!term||text.includes(term);
     const matchLabel=!activeLabel||labels.includes(activeLabel);
     const show=matchTerm&&matchLabel;
     card.style.display=show?'':'none';
     if(show)visible++;
   });
   if(empty)empty.style.display=visible?'none':'block';
   chips.forEach(c=>c.classList.toggle('active',c.dataset.label===activeLabel));
 }
 search?.addEventListener('input',render);
 select?.addEventListener('change',()=>{activeLabel=(select.value||'').toLowerCase();render();});
 chips.forEach(c=>c.addEventListener('click',()=>{activeLabel=c.dataset.label||'';if(select)select.value=activeLabel;render();}));
 const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
 render();
})();
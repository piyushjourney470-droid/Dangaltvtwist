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

 if(requested){
   activeLabel=requested;
   if(select) select.value=requested;
   chips.forEach(c=>c.classList.toggle('active',c.dataset.label===requested));
 }

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
     if(show) visible++;
   });

   if(empty) empty.style.display=visible?'none':'block';

   chips.forEach(c=>
     c.classList.toggle('active',c.dataset.label===activeLabel)
   );
 }

 search?.addEventListener('input',render);

 select?.addEventListener('change',()=>{
   activeLabel=(select.value||'').toLowerCase();
   render();
 });

 chips.forEach(c=>c.addEventListener('click',()=>{
   activeLabel=c.dataset.label||'';
   if(select) select.value=activeLabel;
   render();
 }));

 // Blogger integration: display recent public posts automatically.
 const BLOGGER_URL='https://dangaltvtwist.blogspot.com';

 function esc(value){
   return String(value||'').replace(/[&<>"]/g,ch=>({
     '&':'&amp;',
     '<':'&lt;',
     '>':'&gt;',
     '"':'&quot;'
   }[ch]));
 }

 function plain(html){
   const box=document.createElement('div');
   box.innerHTML=html||'';
   return (box.textContent||'').replace(/\s+/g,' ').trim();
 }

 function showBloggerPosts(feed){
   const items=feed?.feed?.entry||[];

   if(!items.length) return;

   const marker=document.createElement('div');
   marker.style.cssText=
     'grid-column:1/-1;padding:10px 12px;margin:0 0 4px;' +
     'border-radius:9px;background:#fff8e8;color:#69501d;font-size:12px;';

   marker.textContent=
     'Latest posts from Blogger · New posts appear here automatically';

   grid.prepend(marker);

   items.slice(0,10).reverse().forEach(post=>{
     const title=plain(post.title?.$t||'Untitled update');

     const url=(post.link||[])
       .find(link=>link.rel==='alternate')?.href||BLOGGER_URL;

     const published=post.published?.$t
       ? new Date(post.published.$t)
       : null;

     const date=published&&!isNaN(published)
       ? published.toLocaleDateString('en-IN',{
           day:'2-digit',
           month:'short',
           year:'numeric'
         })
       : 'Latest update';

     const html=post.content?.$t||post.summary?.$t||'';
     const excerpt=plain(html).slice(0,180);

     const imgMatch=html.match(/<img[^>]+src=["']([^"']+)["']/i);
     const img=imgMatch?imgMatch[1]:'';

     const labels=(post.category||[])
       .map(x=>(x.term||'').toLowerCase())
       .filter(Boolean);

     const card=document.createElement('article');
     card.className='post-card blogger-live-card';

     card.dataset.search=
       (title+' '+excerpt+' '+labels.join(' ')).toLowerCase();

     card.dataset.labels=labels.join('|');

     const imageMarkup=img
       ? '<img src="'+esc(img)+'" alt="'+esc(title)+
         '" loading="lazy" decoding="async">'
       : '<div class="no-image">DANGAL TV TWIST</div>';

     card.innerHTML=
       '<a class="card-image" href="'+esc(url)+
       '" target="_blank" rel="noopener">'+imageMarkup+'</a>'+

       '<div class="card-body">'+
         '<div class="meta">'+
           '<span>'+esc(date)+'</span>'+
           '<span class="dot"></span>'+
           '<span>Blogger Post</span>'+
         '</div>'+

         '<h3><a href="'+esc(url)+
         '" target="_blank" rel="noopener">'+
         esc(title)+'</a></h3>'+

         '<p class="excerpt">'+esc(excerpt)+'</p>'+

         '<a class="readmore" href="'+esc(url)+
         '" target="_blank" rel="noopener">Read Full Update →</a>'+
       '</div>';

     grid.prepend(card);
     cards.push(card);
   });

   render();
 }

 // Request Blogger's public JSON feed.
 const callbackName=
   'dangalBloggerFeed_'+Math.random().toString(36).slice(2);

 const script=document.createElement('script');

 window[callbackName]=function(feed){
   try{
     showBloggerPosts(feed);
   }finally{
     delete window[callbackName];
     script.remove();
   }
 };

 script.src=
   BLOGGER_URL+
   '/feeds/posts/default?alt=json-in-script&max-results=10' +
   '&orderby=published&callback='+callbackName;

 script.onerror=function(){
   delete window[callbackName];
 };

 document.head.appendChild(script);

 // Update the copyright year.
 const year=document.getElementById('year');
 if(year) year.textContent=new Date().getFullYear();

 render();
})();

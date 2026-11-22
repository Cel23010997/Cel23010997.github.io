(() => {
  const cards = [...document.querySelectorAll('.moment-card')];
  if (!cards.length) return;
  const tabs = [...document.querySelectorAll('.moment-tabs [role="tab"]')];
  const descriptions = {
    all: 'A mix of photographs, creative edits and everyday interests. Select a post to take a closer look.',
    photography: 'Through my lens: wildlife, flowers, waterfront views and live music. My GIMP-edited photographs are labelled on each post.',
    edits: 'From colour and atmosphere in GIMP to pacing and transitions in Adobe Premiere Pro.',
    music: 'Music in general, K-pop especially. Always a song in mind.',
    korean: 'A little language learning, woven into everyday life.'
  };
  function selectTab(category, updateHash = true) {
    if (!tabs.some(tab => tab.dataset.category === category)) category = 'all';
    tabs.forEach(tab => {
      const selected = tab.dataset.category === category;
      tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1;
    });
    cards.forEach(card => { card.hidden = category !== 'all' && !card.dataset.categories.split(' ').includes(category); });
    document.getElementById('moments-panel').setAttribute('aria-labelledby', 'tab-' + category);
    document.getElementById('collection-description').textContent = descriptions[category];
    if (updateHash) history.pushState(null, '', '#' + category);
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab.dataset.category));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault(); tabs[next].focus(); selectTab(tabs[next].dataset.category);
    });
  });
  if (tabs.length) {
    selectTab(location.hash.slice(1), false);
    window.addEventListener('hashchange', () => selectTab(location.hash.slice(1), false));
  }
  const dialog = document.createElement('dialog');
  dialog.className = 'hobby-dialog'; dialog.id = 'hobby-dialog';
  dialog.setAttribute('aria-labelledby', 'hobby-detail-title');
  dialog.innerHTML = `<div class="hobby-dialog-bar"><span>CELESTE’S LITTLE THINGS</span><button class="hobby-close" aria-label="Close post" autofocus>×</button></div><div class="post-detail"><div class="post-media"></div><div class="post-caption"><div class="post-author"><img src="assets/paw.svg" width="30" height="30" alt=""><b>celeste</b></div><h2 id="hobby-detail-title"></h2><p class="post-description"></p><p class="post-credit"></p><div class="post-extra"></div><div class="post-navigation"><button type="button" class="photo-previous">Previous photo</button><span class="photo-position" aria-live="polite"></span><button type="button" class="photo-next">Next photo</button></div></div></div>`;
  document.body.append(dialog);
  let current, opener, previousOverflow;
  const media = dialog.querySelector('.post-media');
  const visiblePhotos = () => cards.filter(card => !card.hidden && card.dataset.type === 'photo');
  function clearMedia() { media.querySelector('video')?.pause(); media.replaceChildren(); }
  function render(card) {
    current = card; const post = card.dataset; clearMedia();
    dialog.querySelector('h2').textContent = post.title;
    dialog.querySelector('.post-description').textContent = post.caption;
    dialog.querySelector('.post-credit').textContent = post.credit;
    const extra = dialog.querySelector('.post-extra'); extra.replaceChildren();
    if (post.type === 'video') {
      const video = document.createElement('video'); video.controls = true; video.playsInline = true;
      video.preload = 'metadata'; video.poster = post.image; video.src = 'assets/army-promotional-edit.mp4';
      video.setAttribute('aria-label', 'Academic promotional video edited by Celeste Tong'); media.append(video);
      const link = document.createElement('a'); link.href = 'projects/army-bomb.html#video';
      link.className = 'text-link'; link.textContent = 'Read the editing case study'; extra.append(link);
    } else {
      const img = new Image(); img.src = post.image; img.alt = post.caption;
      img.className = post.type === 'note' ? 'post-illustration' : ''; media.append(img);
    }
    if (post.id === 'korean') {
      const note = document.createElement('p'); note.textContent = 'Regular practice, videos and music keep the language part of my everyday life.'; extra.append(note);
    }
    const photos = visiblePhotos(), index = photos.indexOf(card);
    dialog.querySelector('.post-navigation').hidden = post.type !== 'photo' || photos.length < 2;
    dialog.querySelector('.photo-position').textContent = `${index + 1} / ${photos.length}`;
  }
  function step(direction) {
    const photos = visiblePhotos(); if (current?.dataset.type !== 'photo' || !photos.length) return;
    render(photos[(photos.indexOf(current) + direction + photos.length) % photos.length]);
  }
  cards.forEach(card => card.querySelector('button').addEventListener('click', event => {
    opener = event.currentTarget; render(card); previousOverflow = document.body.style.overflow;
    dialog.showModal(); document.body.style.overflow = 'hidden'; dialog.scrollTop = 0;
  }));
  dialog.querySelector('.hobby-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.photo-previous').addEventListener('click', () => step(-1));
  dialog.querySelector('.photo-next').addEventListener('click', () => step(1));
  dialog.addEventListener('keydown', event => {
    if (current?.dataset.type !== 'photo') return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); step(event.key === 'ArrowLeft' ? -1 : 1); }
  });
  dialog.addEventListener('close', () => { clearMedia(); document.body.style.overflow = previousOverflow || ''; opener?.focus({preventScroll:true}); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
})();

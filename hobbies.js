(() => {
  const cards = [
    ['.photo-hobby', 'photography', 'View the photograph'],
    ['.hobby-card.music', 'music', 'A little more about music'],
    ['.hobby-card:not(.music):not(.korean)', 'edits', 'Explore my editing interests'],
    ['.hobby-card.korean', 'korean', 'My learning habits']
  ];
  if (!document.querySelector('.hobbies')) return;
  const panels = {
    photography: {
      title: 'Chasing light, keeping little moments',
      content: '<figure class="hobby-photo-full"><img src="assets/concert-blue.jpg" alt="Celeste’s wide concert photograph, with blue stage lighting and audience lightsticks"><figcaption>A photograph I took: blue light, a live stage and a room full of energy.</figcaption></figure><p>I enjoy photographing atmosphere—the colours, the light and how a place feels in that moment. Concerts bring all three together.</p>'
    },
    music: {
      title: 'Always a song in mind',
      content: '<img class="hobby-feature-art" src="assets/music-pixel.svg" alt="Pixel headphones, cassette and a blue lightstick"><p>I love music in general, especially K-pop. It is part of my everyday life, from a song on repeat to the energy of a live performance.</p><div class="hobby-notes"><div><b>The music</b><p>Something to listen to while taking a break or finding a little inspiration.</p></div><div><b>The performance</b><p>The stage, the lighting and the small details that make a live moment memorable.</p></div><div><b>The memories</b><p>Photography lets me keep a little of that atmosphere after the show ends.</p></div></div>'
    },
    edits: {
      title: 'Little moments, connected',
      content: '<div class="detail-timeline" aria-label="Illustration of a video-editing timeline"><span>VIDEO</span><div><i></i><i></i><i></i><i></i></div><span>AUDIO</span><div class="audio-track"><i></i><i></i><i></i></div></div><p class="hobby-caption">A little illustration of the editing process.</p><p>I enjoy video editing: choosing clips, finding a rhythm and bringing separate moments into one visual story. My academic editing work includes Adobe Premiere Pro projects with layered video, audio and transitions.</p><p><a class="text-link" href="projects/army-bomb.html">Explore my promotional editing coursework →</a></p><div class="hobby-notes"><div><b>Choose</b><p>Pick the moments that belong together.</p></div><div><b>Shape</b><p>Arrange clips and audio into a sequence with a clear pace.</p></div><div><b>Refine</b><p>Review the cuts, transitions and small visual details.</p></div></div>'
    },
    korean: {
      title: 'A little Korean, every day',
      content: '<div class="korean-detail" lang="ko">안녕하세요!<span aria-hidden="true">✦</span></div><p class="korean-badge">TOPIK Level 1</p><p>I have a Level 1 qualification in the Test of Proficiency in Korean (TOPIK). I keep learning through Duolingo and Korean YouTube content, including Jeongwaja.</p><p>I like making the language part of everyday life. Watching videos and listening to Korean alongside regular practice helps me keep coming back to it.</p>'
    }
  };
  const dialog = document.createElement('dialog'); dialog.className = 'hobby-dialog'; dialog.id = 'hobby-dialog';
  dialog.setAttribute('aria-labelledby', 'hobby-detail-title');
  dialog.innerHTML = '<div class="hobby-dialog-bar"><span>CELESTE’S LITTLE THINGS</span><button class="hobby-close" aria-label="Close hobby details" autofocus>×</button></div><div class="hobby-dialog-body"><h2 id="hobby-detail-title"></h2><div id="hobby-detail-content"></div></div>';
  document.body.append(dialog);
  cards.forEach(([selector,key,label]) => {
    const card = document.querySelector(selector); if (!card) return;
    card.dataset.hobby = key; card.classList.add('hobby-clickable');
    const button = document.createElement('button'); button.type = 'button'; button.className = 'hobby-open';
    button.textContent = label + ' ↗'; button.setAttribute('aria-haspopup', 'dialog'); card.append(button);
    card.addEventListener('click', () => {
      const panel = panels[key]; document.getElementById('hobby-detail-title').textContent = panel.title;
      document.getElementById('hobby-detail-content').innerHTML = panel.content;
      dialog.showModal(); document.body.style.overflow = 'hidden'; dialog.scrollTop = 0;
    });
  });
  dialog.querySelector('.hobby-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
})();

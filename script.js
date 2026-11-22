(() => {
  const dog = document.getElementById('pet-dog');
  const message = document.getElementById('dog-message');
  const lines = ['a very good project buddy', 'thanks for the pat!', 'currently supervising the code', 'one paw at a time'];
  let pats = 0;
  dog?.addEventListener('click', () => { dog.classList.remove('patted'); void dog.offsetWidth; dog.classList.add('patted'); message.textContent = lines[pats++ % lines.length]; });
  const dialog = document.getElementById('play-dialog');
  const frame = document.getElementById('game-frame');
  const siteBase = new URL('.', document.currentScript.src);
  let activeGame = null, slowTimer = null, readyTimer = null, openedAt = 0;
  let loader, loaderText, retry;
  if (dialog && frame) {
    const stage = document.createElement('div'); stage.className = 'play-stage';
    frame.before(stage); stage.append(frame);
    loader = document.createElement('div'); loader.className = 'launch-loader'; loader.hidden = true;
    loader.innerHTML = '<div class="launch-card"><img class="launch-dog" alt="" width="128" height="128"><p class="launch-eyebrow">ONE LITTLE MOMENT</p><h2>Loading<span class="launch-dots" aria-hidden="true">...</span></h2><p class="launch-status" role="status" aria-live="polite"></p><div class="launch-paws" aria-hidden="true"><i></i><i></i><i></i><i></i></div><button class="button small launch-retry" hidden>Try again</button></div>';
    loader.querySelector('img').src = new URL('assets/dog-mascot.svg', siteBase).href;
    stage.append(loader); loaderText = loader.querySelector('.launch-status'); retry = loader.querySelector('button');
  }
  const games = {
    'concert-chaos': {title:'Concert Chaos',url:'https://cel23010997.github.io/concert-chaos/',note:'Browser recreation · Drag to look · 2: crowd · Controls guide inside'},
    'astral-siege': {title:'Astral Siege',url:'https://Cel23010997.github.io/astral-siege/',note:'Full C++ game port · Mouse controls · Desktop recommended'},
    'guild-up': {title:'GuildUp!',url:'https://Cel23010997.github.io/guild-up/',note:'W A S D to move · E to interact · Local demo'},
    'order-n-chaos': {title:'Order N Chaos',url:'https://tanukifurhire.com/play/order-n-chaos/',note:'Team-hosted browser build'}
  };
  function showReady() {
    if (!activeGame || !dialog.open) return;
    clearTimeout(slowTimer); clearTimeout(readyTimer);
    readyTimer = setTimeout(() => {
      if (!dialog.open) return;
      loader.hidden = true; frame.removeAttribute('aria-busy');
    }, Math.max(0, 550 - (performance.now() - openedAt)));
  }
  function loadGame(key) {
    const game = games[key]; if (!game || !dialog) return;
    activeGame = key; clearTimeout(slowTimer); clearTimeout(readyTimer); openedAt = performance.now();
    loader.hidden = false; retry.hidden = true; frame.setAttribute('aria-busy', 'true');
    loaderText.textContent = 'Getting ' + game.title + ' ready for you.';
    document.getElementById('play-title').textContent = game.title;
    document.getElementById('play-note').textContent = game.note;
    document.getElementById('play-external').href = game.url;
    frame.title = game.title + ' playable demo'; frame.src = game.url;
    if (!dialog.open) dialog.showModal(); document.body.style.overflow = 'hidden';
    slowTimer = setTimeout(() => {
      loaderText.textContent = 'This is taking a little longer. You can retry or open the demo separately.';
      retry.hidden = false;
    }, 45000);
  }
  frame?.addEventListener('load', () => {
    if (activeGame && !['astral-siege','concert-chaos'].includes(activeGame)) showReady();
  });
  frame?.addEventListener('error', () => {
    if (!activeGame) return;
    clearTimeout(slowTimer); loaderText.textContent = 'The demo could not load. Please try again.'; retry.hidden = false;
  });
  window.addEventListener('message', event => {
    if (!activeGame || event.source !== frame?.contentWindow || event.origin !== new URL(games[activeGame].url).origin) return;
    if (event.data?.type === 'celeste-demo-ready' && event.data.game === activeGame) showReady();
    if (event.data?.type === 'celeste-demo-error' && event.data.game === activeGame) {
      clearTimeout(slowTimer); loaderText.textContent = 'The demo could not start. Please retry or open it separately.'; retry.hidden = false;
    }
  });
  retry?.addEventListener('click', () => loadGame(activeGame));
  document.querySelectorAll('[data-play]').forEach(button => button.addEventListener('click', () => loadGame(button.dataset.play)));
  document.getElementById('close-play')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('close', () => { activeGame = null; clearTimeout(slowTimer); clearTimeout(readyTimer); frame.removeAttribute('src'); loader.hidden = true; document.body.style.overflow = ''; });
})();

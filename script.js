(() => {
  const dog = document.getElementById('pet-dog');
  const message = document.getElementById('dog-message');
  const lines = ['a very good project buddy', 'thanks for the pat!', 'currently supervising the code', 'one paw at a time'];
  let pats = 0;
  dog?.addEventListener('click', () => { dog.classList.remove('patted'); void dog.offsetWidth; dog.classList.add('patted'); message.textContent = lines[pats++ % lines.length]; });
  const dialog = document.getElementById('play-dialog');
  const frame = document.getElementById('game-frame');
  const games = {
    'astral-siege': {title:'Astral Siege',url:'https://Cel23010997.github.io/astral-siege/',note:'Full C++ game port · Mouse controls · Desktop recommended'},
    'guild-up': {title:'GuildUp!',url:'https://Cel23010997.github.io/guild-up/',note:'W A S D to move · E to interact · Local demo'},
    'order-n-chaos': {title:'Order N Chaos',url:'https://tanukifurhire.com/play/order-n-chaos/',note:'Team-hosted browser build'}
  };
  document.querySelectorAll('[data-play]').forEach(button => button.addEventListener('click', () => {
    const game = games[button.dataset.play]; if (!game || !dialog) return;
    document.getElementById('play-title').textContent = game.title;
    document.getElementById('play-note').textContent = game.note;
    document.getElementById('play-external').href = game.url;
    frame.title = game.title + ' playable demo'; frame.src = game.url;
    dialog.showModal(); document.body.style.overflow = 'hidden';
  }));
  document.getElementById('close-play')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('close', () => { frame.removeAttribute('src'); document.body.style.overflow = ''; });
})();

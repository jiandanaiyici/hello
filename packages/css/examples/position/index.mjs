window.onload = function () {
  const outer = document.getElementById('wrapper');
  const cache = {};
  const btns = [...document.querySelectorAll('.pointer')];
  const len = btns.length;
  for(let index = 0; index < len; index++) {
    btns[index].onclick = function () {
      const text = btns[index].innerText;
      if(text !== 'none' && text !== '1' && !cache[text]) {
        cache[text] = outer.querySelector(`.${text}`);
      }

      if(text === 'outer') {
        cache['outer'] = outer;
      }

      Object.values(cache).filter(item => !!item).forEach(element => {
        element.classList.remove('relative');
      });

      if(text !== 'none' && text !== '1') {
        cache[text].classList.add('relative');
      }
    };
  }
};

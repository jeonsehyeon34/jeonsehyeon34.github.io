(function () {
  const months = document.querySelectorAll('.mcal-viewport > .mcal');
  const arrows = document.querySelectorAll('.mcal-arrow');
  if (months.length) {
    let idx = 0;
    function render() {
      months.forEach((m, i) => { m.style.display = i === idx ? '' : 'none'; });
      arrows.forEach(btn => {
        const dir = parseInt(btn.getAttribute('data-dir'), 10);
        btn.disabled = (dir < 0 && idx === 0) || (dir > 0 && idx === months.length - 1);
      });
    }
    arrows.forEach(btn => {
      btn.addEventListener('click', () => {
        const dir = parseInt(btn.getAttribute('data-dir'), 10);
        idx = Math.min(months.length - 1, Math.max(0, idx + dir));
        render();
      });
    });
    render();
  }

  const ghchartWrap = document.querySelector('.ghchart-wrap');
  if (ghchartWrap) {
    ghchartWrap.scrollLeft = ghchartWrap.scrollWidth;
  }
})();

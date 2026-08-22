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

  const ghgrid = document.getElementById('ghgrid');
  if (ghgrid) {
    const username = ghgrid.getAttribute('data-username');
    fetch('https://github-contributions-api.jogruber.de/v4/' + username + '?y=last')
      .then(res => res.json())
      .then(data => {
        const days = (data.contributions || []).slice(-98); // ~14 weeks
        const weeks = [];
        for (let i = 0; i < days.length; i += 7) {
          weeks.push(days.slice(i, i + 7));
        }
        ghgrid.innerHTML = weeks.map(week => {
          const cells = week.map(d =>
            `<span class="ghgrid-cell l${d.level}" title="${d.date}: ${d.count}커밋"></span>`
          ).join('');
          return `<span class="ghgrid-col">${cells}</span>`;
        }).join('');
      })
      .catch(() => {
        ghgrid.innerHTML = '<span class="ghgrid-error">잔디를 불러오지 못했습니다</span>';
      });
  }
})();

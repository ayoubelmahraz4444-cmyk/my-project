/* ============================================
   ANIMATED PIPELINE — hero background
   Nodes connect and pulse like a live n8n workflow
   ============================================ */
(function () {
  const canvas = document.getElementById('pipeline-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width, height, dpr;
  let nodes = [];
  let pulses = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildGraph();
  }

  function buildGraph() {
    const cols = Math.max(5, Math.floor(width / 160));
    const rows = Math.max(3, Math.floor(height / 140));
    nodes = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const jitterX = (Math.random() - 0.5) * 60;
        const jitterY = (Math.random() - 0.5) * 50;
        nodes.push({
          x: (c + 0.5) * (width / cols) + jitterX,
          y: (r + 0.5) * (height / rows) + jitterY,
          r: 2 + Math.random() * 1.5,
          pulse: Math.random() * Math.PI * 2
        });
      }
    }

    // connect each node to 1-2 nearby nodes (right/down) to form a flow-like mesh
    nodes.forEach((n, i) => {
      n.links = [];
      const candidates = nodes
        .map((other, j) => ({ j, d: Math.hypot(other.x - n.x, other.y - n.y) }))
        .filter(o => o.j !== i && o.d < 200 && o.d > 40)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      candidates.forEach(c => n.links.push(c.j));
    });
  }

  function spawnPulse() {
    if (!nodes.length) return;
    const start = nodes[Math.floor(Math.random() * nodes.length)];
    if (!start.links.length) return;
    const endIdx = start.links[Math.floor(Math.random() * start.links.length)];
    pulses.push({ from: start, to: nodes[endIdx], t: 0, speed: 0.012 + Math.random() * 0.01 });
  }

  let frame = 0;
  function draw() {
    frame++;
    ctx.clearRect(0, 0, width, height);

    // draw connections
    ctx.strokeStyle = 'rgba(58, 70, 80, 0.35)';
    ctx.lineWidth = 1;
    nodes.forEach(n => {
      n.links.forEach(li => {
        const other = nodes[li];
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      });
    });

    // draw nodes
    nodes.forEach(n => {
      const pulseScale = 1 + Math.sin(frame * 0.02 + n.pulse) * 0.15;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(154, 165, 172, 0.5)';
      ctx.fill();
    });

    // draw traveling pulses
    pulses.forEach(p => {
      p.t += p.speed;
      const x = p.from.x + (p.to.x - p.from.x) * p.t;
      const y = p.from.y + (p.to.y - p.from.y) * p.t;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 8);
      grad.addColorStop(0, 'rgba(61, 255, 193, 0.9)');
      grad.addColorStop(1, 'rgba(61, 255, 193, 0)');
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });
    pulses = pulses.filter(p => p.t < 1);

    if (frame % 35 === 0) spawnPulse();

    if (!reduceMotion) requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();

  if (reduceMotion) {
    draw(); // single static frame
  } else {
    requestAnimationFrame(draw);
  }
})();

/* ============================================
   SCROLL-TRIGGERED SKILL BARS
   ============================================ */
(function () {
  const bars = document.querySelectorAll('.skill-bar');
  if (!bars.length || !('IntersectionObserver' in window)) {
    bars.forEach(b => b.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();

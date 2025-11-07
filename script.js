// Interactive fireworks (cursor stop -> burst). No dependencies.
(() => {
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resize(){
    canvas.width  = Math.floor(innerWidth * DPR);
    canvas.height = Math.floor(innerHeight * DPR);
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  addEventListener('resize', resize, {passive:true}); resize();

  let particles = [];
  const gravity = 0.08, air = 0.985, fade = 0.012;
  const palette = ['#ffffff', '#ffd1d1', '#ff7a7a', '#ffb703', '#9bf6ff', '#b69cff', '#f9f871', '#E60012'];

  function burst(x,y,colors=palette){
    const n = 90 + Math.random()*50;
    for(let i=0;i<n;i++){
      const a = (i/n) * Math.PI*2;
      const sp = 2.2 + Math.random()*3.2;
      particles.push({
        x, y,
        vx: Math.cos(a)*sp*(0.6+Math.random()*0.8),
        vy: Math.sin(a)*sp*(0.6+Math.random()*0.8),
        life: 1,
        color: colors[Math.floor(Math.random()*colors.length)],
        size: 1 + Math.random()*1.6,
        spark: Math.random() < 0.25
      });
    }
  }

  function loop(){
    ctx.fillStyle = 'rgba(11,16,32,0.25)';
    ctx.fillRect(0,0,innerWidth,innerHeight);

    for(let i=particles.length-1;i>=0;i--){
      const p=particles[i];
      p.vx*=air; p.vy=p.vy*air+gravity;
      p.x+=p.vx; p.y+=p.vy;
      p.life -= fade*(p.spark?1.8:1);

      ctx.globalAlpha = Math.max(p.life,0);
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.size*(1+p.life*0.6), 0, Math.PI*2);
      ctx.fill();

      if(p.life<=0) particles.splice(i,1);
    }
    requestAnimationFrame(loop);
  }
  loop();

  // Debounced "mouse stop" trigger
  let timer=null;
  function coords(e){ const t=e.touches && e.touches[0]; return {x:(t?t.clientX:e.clientX), y:(t?t.clientY:e.clientY)}; }
  addEventListener('mousemove', e=>{ const {x,y}=coords(e); if(timer)clearTimeout(timer); timer=setTimeout(()=>burst(x,y),120); }, {passive:true});
  addEventListener('touchmove', e=>{ const {x,y}=coords(e); if(timer)clearTimeout(timer); timer=setTimeout(()=>burst(x,y),120); }, {passive:true});
  addEventListener('click', e=>{ const {x,y}=coords(e); burst(x,y); }, {passive:true});
  addEventListener('touchend', e=>{ const {x,y}=coords(e); burst(x,y); }, {passive:true});

  // Intro firework
  setTimeout(()=> burst(innerWidth*0.5, innerHeight*0.6), 500);

  // Music toggle (optional)
  const bgm = document.getElementById('bgm');
  const btn = document.getElementById('musicBtn');
  if (bgm && btn){
    let playing=false;
    btn.addEventListener('click', ()=>{
      if (playing){ bgm.pause(); playing=false; btn.textContent='Play Music'; }
      else { bgm.volume=0.6; bgm.loop=true; bgm.play(); playing=true; btn.textContent='Pause Music'; }
    });
  }
})();
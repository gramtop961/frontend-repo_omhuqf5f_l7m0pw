// Progress tracking using localStorage. Provides XP, badges, streaks, completed experiments.
window.VR_LAB = window.VR_LAB || {};
(function(){
  const KEY = 'vr_lab_progress_v1';
  const defaultData = {
    xp: 0,
    coins: 0,
    badges: [],
    streak: 0,
    lastLogin: null,
    completed: {},
    settings: { quality: 'medium', comfort: true }
  };

  function load(){
    try{ return JSON.parse(localStorage.getItem(KEY)) || {...defaultData}; }catch(e){ return {...defaultData}; }
  }
  function save(data){ localStorage.setItem(KEY, JSON.stringify(data)); }

  function addXP(amount, reason=''){ const data = load(); data.xp += amount; if(reason){ console.log('XP+', amount, reason); } save(data); return data.xp; }
  function addBadge(b){ const data = load(); if(!data.badges.includes(b)){ data.badges.push(b); save(data);} }
  function markComplete(domain, name){ const data = load(); data.completed[domain] = data.completed[domain]||{}; data.completed[domain][name] = true; save(data); }
  function get(){ return load(); }

  function mountProgress(scene, uiRoot){
    const panel = document.createElement('a-entity');
    panel.setAttribute('position', '-1.2 1.5 -1');
    panel.setAttribute('geometry', 'primitive: plane; width: 1.1; height: 0.75');
    panel.setAttribute('material', 'color: #0b1220; opacity: 0.85; transparent: true; metalness: 0.1; roughness: 0.7');
    panel.setAttribute('class', 'interactive');
    panel.setAttribute('id', 'progressPanel');

    const txt = document.createElement('a-entity');
    txt.setAttribute('text', 'value: Progress Terminal; color: #a5b4fc; align: center; width: 1.2');
    txt.setAttribute('position', '0 0.3 0.01');
    panel.appendChild(txt);

    // Dynamic stats using canvas texture
    const canvas = document.createElement('canvas'); canvas.width=512; canvas.height=256; const ctx = canvas.getContext('2d');
    const chartPlane = document.createElement('a-plane');
    chartPlane.setAttribute('width', '1');
    chartPlane.setAttribute('height', '0.45');
    chartPlane.setAttribute('position', '0 -0.05 0.01');
    const tex = new AFRAME.THREE.CanvasTexture(canvas); chartPlane.setObject3D('mesh', new AFRAME.THREE.Mesh(new AFRAME.THREE.PlaneGeometry(1,0.45), new AFRAME.THREE.MeshBasicMaterial({map: tex, transparent: true})));
    panel.appendChild(chartPlane);

    function draw(){
      const d = get();
      ctx.fillStyle = '#0b1220'; ctx.fillRect(0,0,512,256);
      ctx.fillStyle = '#a5b4fc'; ctx.font = '20px Inter'; ctx.fillText(`XP: ${d.xp}  Coins: ${d.coins}  Streak: ${d.streak}`, 16, 30);
      // Simple bar chart of domain completion
      const domains = ['physics','chemistry','ai','missions'];
      const counts = domains.map(k=> d.completed[k] ? Object.keys(d.completed[k]).length : 0);
      const max = Math.max(1,...counts); const W=440,H=140, x0=36,y0=196;
      for(let i=0;i<domains.length;i++){
        const h = (counts[i]/max)*H; ctx.fillStyle = '#60a5fa'; ctx.fillRect(x0 + i*(W/4), y0-h, 60, h);
        ctx.fillStyle = '#c7d2fe'; ctx.fillText(domains[i], x0 + i*(W/4), y0+20);
      }
      tex.needsUpdate = true;
    }
    setInterval(draw, 1000);
    draw();

    uiRoot.appendChild(panel);
  }

  window.VR_LAB.getProgress = get;
  window.VR_LAB.addXP = addXP;
  window.VR_LAB.addBadge = addBadge;
  window.VR_LAB.markComplete = markComplete;
  window.VR_LAB.mountProgress = mountProgress;
})();

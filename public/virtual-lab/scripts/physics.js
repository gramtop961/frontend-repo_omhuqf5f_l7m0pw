// Physics Lab: multiple demos with minimal visualizations and readouts
window.VR_LAB = window.VR_LAB || {};
(function(){
  function uiButton(y, label, onClick){
    const btn = document.createElement('a-entity');
    btn.setAttribute('geometry', 'primitive: plane; width: 0.95; height: 0.1');
    btn.setAttribute('material', 'color: #0f172a; opacity: 0.95');
    btn.setAttribute('position', `0 ${y} 0.01`);
    btn.setAttribute('class', 'interactive');
    const text = document.createElement('a-entity');
    text.setAttribute('text', `value: ▶ ${label}; color: #e2e8f0; align: center; width: 1.8`);
    text.setAttribute('position', '0 0 0.01');
    btn.appendChild(text);
    btn.addEventListener('click', onClick);
    return btn;
  }

  function mountPhysics(scene, uiRoot){
    const panel = document.createElement('a-entity');
    panel.setAttribute('position', '-0.2 1.6 -1');
    panel.setAttribute('geometry', 'primitive: plane; width: 1.1; height: 1.6');
    panel.setAttribute('material', 'color: #091425; opacity: 0.9; transparent: true');
    panel.setAttribute('class', 'interactive');

    const header = document.createElement('a-entity');
    header.setAttribute('text', 'value: Physics Lab; color: #93c5fd; align: center; width: 1.6');
    header.setAttribute('position', '0 0.7 0.01');
    panel.appendChild(header);

    const items = [
      ['Pendulum', pendulumDemo], ['Projectile', projectileDemo], ['Free Fall', freeFallDemo],
      ['Energy', energyDemo], ['Collisions', collisionDemo], ['Momentum', momentumDemo],
      ['Harmonic Oscillator', oscillatorDemo], ['Wave Interference', waveDemo], ['Doppler', dopplerDemo],
      ['Buoyancy', buoyancyDemo], ['RC Circuit', rcCircuitDemo], ['Lens Ray Tracing', lensDemo]
    ];

    items.forEach((it, idx)=> panel.appendChild(uiButton(0.55 - idx*0.11, it[0], ()=> it[1](scene))));

    uiRoot.appendChild(panel);
  }

  function readout(text){
    const el = document.createElement('a-entity');
    el.setAttribute('text', `value: ${text}; color: #c7d2fe; wrapCount: 36;`);
    el.setAttribute('position', '0 1.1 -1');
    document.querySelector('a-scene').appendChild(el);
    setTimeout(()=> el.remove(), 6000);
  }

  function clearDemos(scene){
    const old = scene.querySelectorAll('.demo'); old.forEach(e=> e.parentNode.removeChild(e));
  }

  // Minimal demo skeletons
  function pendulumDemo(scene){
    clearDemos(scene);
    const root = document.createElement('a-entity'); root.classList.add('demo');
    const bob = document.createElement('a-sphere'); bob.setAttribute('radius','0.08'); bob.setAttribute('color','#60a5fa'); bob.setAttribute('position','0 1.2 -1.6'); root.appendChild(bob);
    let t=0; function tick(){ t+=0.016; const ang = Math.sin(t)*0.6; bob.setAttribute('position', `${Math.sin(ang)*0.5} ${1.2 - (1-Math.cos(ang))*0.5} -1.6`); if(root.parentNode) requestAnimationFrame(tick);} requestAnimationFrame(tick);
    scene.appendChild(root);
    readout('Pendulum: T ≈ 2π√(L/g)'); VR_LAB.addXP(10,'Pendulum'); VR_LAB.markComplete('physics','pendulum');
  }

  function projectileDemo(scene){
    clearDemos(scene);
    const root = document.createElement('a-entity'); root.classList.add('demo');
    const ball = document.createElement('a-sphere'); ball.setAttribute('radius','0.06'); ball.setAttribute('color','#34d399'); root.appendChild(ball);
    let t=0; const v0=4, angle=Math.PI/4; const g=9.8; function tick(){ t+=0.016; const x=v0*Math.cos(angle)*t; const y=v0*Math.sin(angle)*t - 0.5*g*(t*t)*0.15; ball.setAttribute('position', `${-1+x} ${1.2+y} -1.6`); if(y>-0.8) requestAnimationFrame(tick);} requestAnimationFrame(tick);
    scene.appendChild(root); readout('Projectile: y = v0 sinθ t − 1/2 g t²'); VR_LAB.addXP(10,'Projectile'); VR_LAB.markComplete('physics','projectile');
  }

  function freeFallDemo(scene){ clearDemos(scene); const root=document.createElement('a-entity'); root.classList.add('demo'); let t=0; const box=document.createElement('a-box'); box.setAttribute('color','#f87171'); root.appendChild(box); function tick(){ t+=0.016; box.setAttribute('position', `0 ${2 - 0.5*9.8*(t*t)*0.15} -1.6`); if(2 - 0.5*9.8*(t*t)*0.15>-0.8) requestAnimationFrame(tick);} requestAnimationFrame(tick); scene.appendChild(root); readout('Free fall: s = 1/2 g t²'); VR_LAB.addXP(8,'Free Fall'); VR_LAB.markComplete('physics','freefall'); }

  function energyDemo(scene){ clearDemos(scene); const root=document.createElement('a-entity'); root.classList.add('demo'); const sled=document.createElement('a-box'); sled.setAttribute('color','#fbbf24'); root.appendChild(sled); let t=0; function tick(){ t+=0.016; const x=Math.sin(t)*0.8; sled.setAttribute('position', `${x} ${0.8 + (1-Math.cos(t))*0.2} -1.6`);} requestAnimationFrame(function loop(){ tick(); if(root.parentNode) requestAnimationFrame(loop);}); scene.appendChild(root); readout('Energy: Exchange between KE and PE'); VR_LAB.addXP(8,'Energy'); VR_LAB.markComplete('physics','energy'); }

  function collisionDemo(scene){ clearDemos(scene); const root=document.createElement('a-entity'); root.classList.add('demo'); const a=document.createElement('a-sphere'); const b=document.createElement('a-sphere'); a.setAttribute('color','#60a5fa'); b.setAttribute('color','#f472b6'); a.setAttribute('position','-0.5 1 -1.6'); b.setAttribute('position','0.5 1 -1.6'); root.appendChild(a); root.appendChild(b); let t=0; function tick(){ t+=0.016; a.setAttribute('position', `${-0.5 + t*0.2} 1 -1.6`); b.setAttribute('position', `${0.5 - t*0.2} 1 -1.6`); if(t<5) requestAnimationFrame(tick);} requestAnimationFrame(tick); scene.appendChild(root); readout('Collisions: momentum conserved in elastic case'); VR_LAB.addXP(10,'Collisions'); VR_LAB.markComplete('physics','collisions'); }

  function momentumDemo(scene){ clearDemos(scene); readout('Momentum p=mv: visualize with mass sliders in full version'); VR_LAB.addXP(6,'Momentum'); VR_LAB.markComplete('physics','momentum'); }
  function oscillatorDemo(scene){ clearDemos(scene); const root=document.createElement('a-entity'); root.classList.add('demo'); const m=document.createElement('a-box'); m.setAttribute('color','#a78bfa'); root.appendChild(m); let t=0; function tick(){ t+=0.016; m.setAttribute('position', `${Math.sin(t)*0.6} 1 -1.6`);} requestAnimationFrame(function loop(){ tick(); if(root.parentNode) requestAnimationFrame(loop);}); scene.appendChild(root); readout('Harmonic oscillator: x=A sin(ωt)'); VR_LAB.addXP(8,'Oscillator'); VR_LAB.markComplete('physics','oscillator'); }
  function waveDemo(scene){ clearDemos(scene); const root=document.createElement('a-entity'); root.classList.add('demo'); const pts=[]; for(let i=0;i<24;i++){ const s=document.createElement('a-sphere'); s.setAttribute('radius','0.02'); s.setAttribute('color','#67e8f9'); s.setAttribute('position', `${-1 + i*0.08} 1 -1.6`); root.appendChild(s); pts.push(s); } let t=0; function tick(){ t+=0.07; pts.forEach((s,i)=> s.setAttribute('position', `${-1 + i*0.08} ${1 + Math.sin(t+i*0.5)*0.25 + Math.sin(t*0.7+i*0.9)*0.2} -1.6`)); if(root.parentNode) requestAnimationFrame(tick);} requestAnimationFrame(tick); scene.appendChild(root); readout('Wave interference: superposition of two waves'); VR_LAB.addXP(12,'Wave'); VR_LAB.markComplete('physics','wave'); }
  function dopplerDemo(scene){ clearDemos(scene); readout('Doppler effect: frequency shift due to source motion'); VR_LAB.addXP(6,'Doppler'); VR_LAB.markComplete('physics','doppler'); }
  function buoyancyDemo(scene){ clearDemos(scene); readout('Buoyancy: upthrust equals weight of displaced fluid'); VR_LAB.addXP(6,'Buoyancy'); VR_LAB.markComplete('physics','buoyancy'); }
  function rcCircuitDemo(scene){ clearDemos(scene); const root=document.createElement('a-entity'); root.classList.add('demo'); const led=document.createElement('a-sphere'); led.setAttribute('radius','0.03'); led.setAttribute('color','#22d3ee'); root.appendChild(led); let t=0; function tick(){ t+=0.016; const v=1-Math.exp(-t/1.5); const glow = 0.2+v*0.8; led.setAttribute('scale', `${1+v*0.4} ${1+v*0.4} 1`); led.setAttribute('material', `color: hsl(${180+v*60}, 100%, ${40+v*20}%); emissive: #22d3ee; emissiveIntensity: ${glow}`); if(root.parentNode) requestAnimationFrame(tick);} requestAnimationFrame(tick); scene.appendChild(root); readout('RC Circuit: Vc = V(1-e^{-t/RC})'); VR_LAB.addXP(10,'RC Circuit'); VR_LAB.markComplete('physics','rc'); }
  function lensDemo(scene){ clearDemos(scene); readout('Lens ray tracing: adjust focal length to focus rays (concept)'); VR_LAB.addXP(6,'Lens'); VR_LAB.markComplete('physics','lens'); }

  window.VR_LAB.mountPhysics = mountPhysics;
})();

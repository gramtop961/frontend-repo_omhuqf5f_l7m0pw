// Virtual Reality Science Lab - Bootstrap and Scene management
// 3D Anti-Black-Screen Checklist implemented here
(() => {
  let isMounted = true;
  const container = document.getElementById('sceneContainer');
  const debug = document.getElementById('debug');

  function setDebug(msg){ debug.textContent = msg; }

  function hasWebGL(){
    try{
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch(e){ return false; }
  }

  function qualityPresetToAttrs(preset){
    switch(preset){
      case 'low': return { antialias: false, foveationLevel: 2, shadow: false };
      case 'high': return { antialias: true, foveationLevel: 0, shadow: true };
      default: return { antialias: true, foveationLevel: 1, shadow: false };
    }
  }

  function injectScene({quality, comfort}){
    // Remove previous scene if exists
    while(container.firstChild){ container.removeChild(container.firstChild); }

    const attrs = qualityPresetToAttrs(quality);

    // Build the scene element after click to ensure XR initialization occurs on user gesture
    const scene = document.createElement('a-scene');
    scene.setAttribute('renderer', `alpha: true; antialias: ${attrs.antialias}; colorManagement: true; physicallyCorrectLights: true; sortObjects: true; logarithmicDepthBuffer: false; precision: highp;`);
    scene.setAttribute('vr-mode-ui', 'enabled: true');
    scene.setAttribute('webxr', `optionalFeatures: hit-test,local-floor,bounded-floor,hand-tracking,anchors;`);
    scene.setAttribute('background', 'color: #000011');
    scene.setAttribute('embedded', '');
    scene.style.width = '100%';
    scene.style.height = '100%';

    // Environment (lab room)
    const env = document.createElement('a-entity');
    env.setAttribute('environment', 'preset: arches; dressing: shelves; dressingAmount: 12; dressingVariance: 0.2; groundTexture: checkerboard; groundColor: #0e1726; grid: cross; lightPosition: 0.5 1 0.2; horizonColor: #0b1220; skyType: gradient; skyColor: #0a0f1f');
    scene.appendChild(env);

    // Default lighting
    const ambient = document.createElement('a-entity');
    ambient.setAttribute('light', 'type: ambient; intensity: 0.45; color: #bcd7ff');
    scene.appendChild(ambient);

    const dir = document.createElement('a-entity');
    dir.setAttribute('light', `type: directional; castShadow: ${attrs.shadow}; intensity: 1.2; color: #ffffff`);
    dir.setAttribute('position', '3 6 2');
    scene.appendChild(dir);

    // Lab safety signage
    const sign = document.createElement('a-entity');
    sign.setAttribute('geometry', 'primitive: plane; width: 1.2; height: 0.6');
    sign.setAttribute('material', 'color: #1e293b; metalness: 0.2; roughness: 0.6');
    sign.setAttribute('text', 'value: Safety First: Wear goggles, no open flames near solvents.; align: center; wrapCount: 28; color: #93c5fd;');
    sign.setAttribute('position', '0 2.2 -2');
    scene.appendChild(sign);

    // Spline VR headset hero as hologram in lobby
    const spline = document.createElement('a-entity');
    spline.setAttribute('gltf-model', ''); // placeholder no gltf, we will use html overlay for Spline hero
    const hero = document.createElement('div');
    hero.style.position = 'absolute';
    hero.style.top = '20px';
    hero.style.right = '20px';
    hero.style.width = '360px';
    hero.style.height = '240px';
    hero.style.border = '1px solid rgba(147,197,253,.35)';
    hero.style.borderRadius = '12px';
    hero.style.overflow = 'hidden';
    hero.style.background = 'rgba(2,6,23,.55)';
    hero.style.backdropFilter = 'blur(8px)';
    hero.innerHTML = `<iframe src="https://prod.spline.design/9HgHYACX2il7xmYO/scene.splinecode" style="width:100%;height:100%;border:0"></iframe>`;
    container.appendChild(hero);

    // Camera rig with teleportation and smooth locomotion
    const rig = document.createElement('a-entity');
    rig.setAttribute('id', 'rig');
    rig.setAttribute('movement-controls', `fly: false; enabled: true; speed: ${comfort?0.08:0.15}; constrainToNavMesh: true`);

    const head = document.createElement('a-entity');
    head.setAttribute('camera', 'active: true');
    head.setAttribute('position', '0 1.6 3');
    head.setAttribute('look-controls', 'pointerLockEnabled: true; reverseMouseDrag: true');
    rig.appendChild(head);

    const leftHand = document.createElement('a-entity');
    leftHand.setAttribute('laser-controls', 'hand: left');
    leftHand.setAttribute('raycaster', 'objects: .interactive; far: 10');
    leftHand.setAttribute('teleport-controls', 'cameraRig: #rig; teleportOrigin: [camera]; button: trigger; collisionEntities: [environment];');
    rig.appendChild(leftHand);

    const rightHand = document.createElement('a-entity');
    rightHand.setAttribute('laser-controls', 'hand: right');
    rightHand.setAttribute('raycaster', 'objects: .interactive; far: 10');
    rightHand.setAttribute('teleport-controls', 'cameraRig: #rig; teleportOrigin: [camera]; button: trigger; collisionEntities: [environment];');
    rig.appendChild(rightHand);

    scene.appendChild(rig);

    // Benches and equipment (simple primitives for performance)
    for(let i=0;i<4;i++){
      const bench = document.createElement('a-box');
      bench.setAttribute('width', '2.4');
      bench.setAttribute('height', '0.9');
      bench.setAttribute('depth', '0.8');
      bench.setAttribute('color', '#0f172a');
      bench.setAttribute('material', 'metalness: 0.3; roughness: 0.8');
      bench.setAttribute('position', `${-2 + i*1.6} 0.45 -1.2`);
      bench.setAttribute('class', 'environment');
      scene.appendChild(bench);
    }

    // UI floating panel root
    const uiRoot = document.createElement('a-entity');
    uiRoot.setAttribute('id', 'uiRoot');
    uiRoot.setAttribute('position', '0 1.6 -1');
    scene.appendChild(uiRoot);

    // Mount domain-specific labs
    window.VR_LAB.mountPhysics(scene, uiRoot);
    window.VR_LAB.mountChemistry(scene, uiRoot);
    window.VR_LAB.mountAI(scene, uiRoot);
    window.VR_LAB.mountMissions(scene, uiRoot);

    // Progress terminal panel
    window.VR_LAB.mountProgress(scene, uiRoot);

    container.appendChild(scene);
  }

  function start(){
    const quality = document.getElementById('quality').value;
    const comfort = document.getElementById('comfort').checked;
    document.getElementById('preload-screen').style.display = 'none';
    injectScene({quality, comfort});
  }

  function init(){
    const status = document.getElementById('webglStatus');
    if(!hasWebGL()){
      status.textContent = 'WebGL not available. Starting 2D fallback...';
      launchFallback2D();
      return;
    } else {
      status.textContent = 'WebGL detected. Ready.';
    }

    const startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', () => { if(!isMounted) return; start(); });
  }

  function launchFallback2D(){
    document.getElementById('preload-screen').style.display = 'none';
    const fb = document.getElementById('fallback2d');
    fb.classList.remove('hidden');
    const canvas = document.getElementById('fallbackCanvas');
    const ctx = canvas.getContext('2d');
    function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize); resize();
    let t = 0; function loop(){ if(!isMounted) return; t+=0.016; ctx.fillStyle = '#000011'; ctx.fillRect(0,0,canvas.width,canvas.height); for(let i=0;i<140;i++){ const x = (i*37 + t*60)%canvas.width; const y = (i*53 + Math.sin(t+i)*120 + canvas.height/2)%canvas.height; ctx.fillStyle = `hsla(${(i*7+t*20)%360}, 80%, 60%, .25)`; ctx.beginPath(); ctx.arc(x,y,2+(i%5),0,Math.PI*2); ctx.fill(); } requestAnimationFrame(loop);} loop();
    document.getElementById('retryWebGL').onclick = () => location.reload();
  }

  window.addEventListener('beforeunload', () => { isMounted = false; });
  init();
})();

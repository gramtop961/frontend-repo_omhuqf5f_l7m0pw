// AI Lab using TensorFlow.js demos and holographic assistant
window.VR_LAB = window.VR_LAB || {};
(function(){
  let model = null;

  async function ensureModel(){
    if(model) return model;
    // Small MobileNet from tfjs-models
    model = await tf.loadGraphModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v2_1.0_224/model.json');
    return model;
  }

  function mountAI(scene, uiRoot){
    const panel = document.createElement('a-entity');
    panel.setAttribute('position', '0 1.0 -0.9');
    panel.setAttribute('geometry', 'primitive: plane; width: 1.0; height: 1.0');
    panel.setAttribute('material', 'color: #081425; opacity: 0.9; transparent: true');
    panel.setAttribute('class', 'interactive');

    const header = document.createElement('a-entity');
    header.setAttribute('text', 'value: AI Lab [Dr. Nova]; color: #93c5fd; align: center; width: 1.6');
    header.setAttribute('position', '0 0.42 0.01');
    panel.appendChild(header);

    const classifyBtn = makeBtn(0.25, 'Image Classification', async ()=>{
      await ensureModel();
      VR_LAB.addXP(15,'AI:Classify');
      VR_LAB.markComplete('ai','classification');
      alert('Use console to run image classification with MobileNet.');
    });

    const transferBtn = makeBtn(0.12, 'Transfer Learning (concept)', ()=>{
      VR_LAB.addXP(10,'AI:Transfer'); VR_LAB.markComplete('ai','transfer');
      alert('Transfer learning demo concept loaded.');
    });

    const reactionPredBtn = makeBtn(-0.01, 'Reaction Predictor (concept)', ()=>{
      VR_LAB.addXP(10,'AI:ReactionPredict'); VR_LAB.markComplete('ai','reaction');
      alert('Predicts reaction feasibility (concept).');
    });

    const faultBtn = makeBtn(-0.14, 'Fault Detection (concept)', ()=>{
      VR_LAB.addXP(10,'AI:Fault'); VR_LAB.markComplete('ai','fault');
      alert('Detects anomalies (concept).');
    });

    const saliencyBtn = makeBtn(-0.27, 'Saliency Visualization', ()=>{
      VR_LAB.addXP(10,'AI:Saliency'); VR_LAB.markComplete('ai','saliency');
      alert('Saliency visualization placeholder.');
    });

    const quizBtn = makeBtn(-0.40, 'Adaptive Quiz Tutor', ()=>{
      VR_LAB.addXP(10,'AI:Quiz'); VR_LAB.markComplete('ai','quiz');
      alert('Adaptive quiz placeholder.');
    });

    panel.appendChild(classifyBtn);
    panel.appendChild(transferBtn);
    panel.appendChild(reactionPredBtn);
    panel.appendChild(faultBtn);
    panel.appendChild(saliencyBtn);
    panel.appendChild(quizBtn);

    // Holographic assistant: simple animated entity
    const holo = document.createElement('a-entity');
    holo.setAttribute('position', '0 1.8 -1.3');
    const ring = document.createElement('a-torus'); ring.setAttribute('radius','0.15'); ring.setAttribute('radius-tubular','0.01'); ring.setAttribute('color','#60a5fa'); ring.setAttribute('material','emissive:#60a5fa; emissiveIntensity:0.6; metalness:0.4'); holo.appendChild(ring);
    const orb = document.createElement('a-sphere'); orb.setAttribute('radius','0.05'); orb.setAttribute('color','#7c3aed'); orb.setAttribute('material','emissive:#7c3aed; emissiveIntensity:0.6'); orb.setAttribute('position','0 0.12 0'); holo.appendChild(orb);
    let t=0; (function loop(){ t+=0.02; if(!holo.parentNode) return; ring.setAttribute('rotation', `0 ${t*40} ${t*60}`); orb.setAttribute('position', `0 ${0.12 + Math.sin(t)*0.04} 0`); requestAnimationFrame(loop); })();
    scene.appendChild(holo);

    uiRoot.appendChild(panel);
  }

  function makeBtn(y, label, onClick){
    const btn = document.createElement('a-entity');
    btn.setAttribute('geometry', 'primitive: plane; width: 0.9; height: 0.1');
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

  window.VR_LAB.mountAI = mountAI;
})();

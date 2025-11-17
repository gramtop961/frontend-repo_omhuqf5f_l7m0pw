// Chemistry Lab: reactions with visual effects and reset
window.VR_LAB = window.VR_LAB || {};
(function(){
  function mountChemistry(scene, uiRoot){
    const panel = document.createElement('a-entity');
    panel.setAttribute('position', '0.5 1.6 -1');
    panel.setAttribute('geometry', 'primitive: plane; width: 1.2; height: 1.4');
    panel.setAttribute('material', 'color: #0a1326; opacity: 0.9; transparent: true');
    panel.setAttribute('class', 'interactive');

    const header = document.createElement('a-entity');
    header.setAttribute('text', 'value: Chemistry Lab; color: #93c5fd; align: center; width: 1.6');
    header.setAttribute('position', '0 0.55 0.01');
    panel.appendChild(header);

    const reactions = [
      ['HCl + NaOH', ()=> reactionBubble(scene,'Salt + Water','exothermic')],
      ['Baking Soda + Vinegar', ()=> reactionFoam(scene)],
      ['Fe + CuSO4', ()=> reactionPrecipitate(scene,'Copper deposition')],
      ['AgNO3 + NaCl', ()=> reactionPrecipitate(scene,'AgCl precipitate')],
      ['CH4 Combustion', ()=> reactionFire(scene)],
      ['NH4NO3 Endothermic', ()=> reactionCool(scene)],
      ['Esterification', ()=> reactionAroma(scene)],
      ['KMnO4 Color Change', ()=> reactionColor(scene)],
      ['Salt Hydrolysis', ()=> reactionInfo(scene,'Hydrolysis shifts pH')],
      ['Electrolysis', ()=> reactionElectrolysis(scene)],
      ['Multi-Reactant', ()=> reactionBalance(scene)],
    ];

    reactions.forEach((r, idx)=>{
      const btn = document.createElement('a-entity');
      btn.setAttribute('geometry', 'primitive: plane; width: 1.05; height: 0.1');
      btn.setAttribute('material', 'color: #0f172a; opacity: 0.95');
      btn.setAttribute('position', `0 ${0.4 - idx*0.1} 0.01`);
      btn.setAttribute('class', 'interactive');
      const label = document.createElement('a-entity');
      label.setAttribute('text', `value: ▶ ${r[0]}; color: #e2e8f0; align: center; width: 1.8`);
      label.setAttribute('position', '0 0 0.01');
      btn.appendChild(label);
      btn.addEventListener('click', r[1]);
      panel.appendChild(btn);
    });

    // Reset button
    const reset = document.createElement('a-entity');
    reset.setAttribute('geometry', 'primitive: plane; width: 0.6; height: 0.12');
    reset.setAttribute('material', 'color: #7c3aed');
    reset.setAttribute('position', '0 -0.55 0.01');
    const l2 = document.createElement('a-entity'); l2.setAttribute('text','value: Reset Experiments; color: #fff; align: center; width: 1.6'); l2.setAttribute('position','0 0 0.01'); reset.appendChild(l2);
    reset.addEventListener('click', ()=> clearEffects(scene));
    panel.appendChild(reset);

    uiRoot.appendChild(panel);
  }

  function clearEffects(scene){ scene.querySelectorAll('.chemfx').forEach(e=> e.remove()); }

  function addXP(name){ VR_LAB.addXP(12, name); VR_LAB.markComplete('chemistry', name.toLowerCase()); }
  function info(text){ const el=document.createElement('a-entity'); el.setAttribute('text',`value: ${text}; color: #fde68a; wrapCount: 30`); el.setAttribute('position','0 1.0 -1'); document.querySelector('a-scene').appendChild(el); setTimeout(()=> el.remove(), 5000); }

  function reactionBubble(scene, title){ clearEffects(scene); const root=document.createElement('a-entity'); root.classList.add('chemfx'); for(let i=0;i<40;i++){ const s=document.createElement('a-sphere'); s.setAttribute('radius','0.01'); s.setAttribute('color','#93c5fd'); s.setAttribute('position', `${(Math.random()-0.5)*0.4} 0.9 ${(Math.random()*-0.4)-1.4}`); root.appendChild(s); setTimeout(()=> s.remove(), 5000+Math.random()*2000);} scene.appendChild(root); info(`${title}: Neutralization`); addXP('HCl+NaOH'); }
  function reactionFoam(scene){ clearEffects(scene); const root=document.createElement('a-entity'); root.classList.add('chemfx'); for(let i=0;i<80;i++){ const s=document.createElement('a-sphere'); s.setAttribute('radius', `${0.01+Math.random()*0.03}`); s.setAttribute('color','#e5e7eb'); s.setAttribute('position', `${(Math.random()-0.5)*0.5} ${0.8+Math.random()*0.5} -1.6`); root.appendChild(s); setTimeout(()=> s.remove(), 6000);} scene.appendChild(root); info('CO2 bubbles released'); addXP('BakingSoda+Vinegar'); }
  function reactionPrecipitate(scene, title){ clearEffects(scene); const plate=document.createElement('a-plane'); plate.classList.add('chemfx'); plate.setAttribute('width','0.6'); plate.setAttribute('height','0.3'); plate.setAttribute('color','#1f2937'); plate.setAttribute('position','0 0.9 -1.6'); scene.appendChild(plate); for(let i=0;i<60;i++){ const s=document.createElement('a-sphere'); s.setAttribute('radius','0.008'); s.setAttribute('color','#fbbf24'); s.setAttribute('position', `${(Math.random()-0.5)*0.5} ${0.9+Math.random()*0.3} -1.6`); scene.appendChild(s); s.classList.add('chemfx'); } info(title); addXP('Precipitation'); }
  function reactionFire(scene){ clearEffects(scene); const root=document.createElement('a-entity'); root.classList.add('chemfx'); for(let i=0;i<80;i++){ const p=document.createElement('a-sphere'); p.setAttribute('radius','0.01'); p.setAttribute('color',`hsl(${30+Math.random()*20},100%,${50+Math.random()*20}%)`); p.setAttribute('position', `${(Math.random()-0.5)*0.2} ${0.9+Math.random()*0.5} -1.6`); root.appendChild(p); setTimeout(()=> p.remove(), 3000);} scene.appendChild(root); info('Combustion: CH4 + 2 O2 → CO2 + 2 H2O + heat'); addXP('Combustion'); }
  function reactionCool(scene){ clearEffects(scene); const root=document.createElement('a-entity'); root.classList.add('chemfx'); for(let i=0;i<40;i++){ const s=document.createElement('a-sphere'); s.setAttribute('radius','0.012'); s.setAttribute('color','#67e8f9'); s.setAttribute('position', `${(Math.random()-0.5)*0.4} ${0.9+Math.random()*0.4} -1.6`); root.appendChild(s);} scene.appendChild(root); info('Endothermic: absorbs heat, temp drops'); addXP('NH4NO3'); }
  function reactionAroma(scene){ clearEffects(scene); const root=document.createElement('a-entity'); root.classList.add('chemfx'); for(let i=0;i<30;i++){ const p=document.createElement('a-sphere'); p.setAttribute('radius','0.01'); p.setAttribute('color','#f472b6'); p.setAttribute('position', `${(Math.random()-0.5)*0.4} ${0.9+Math.random()*0.4} -1.6`); root.appendChild(p);} scene.appendChild(root); info('Esterification: pleasant aroma indicates ester'); addXP('Esterification'); }
  function reactionColor(scene){ clearEffects(scene); const root=document.createElement('a-entity'); root.classList.add('chemfx'); for(let i=0;i<20;i++){ const p=document.createElement('a-box'); p.setAttribute('depth','0.01'); p.setAttribute('height','0.03'); p.setAttribute('width','0.03'); p.setAttribute('color','#a78bfa'); p.setAttribute('position', `${-0.3 + i*0.03} 0.9 -1.6`); root.appendChild(p);} scene.appendChild(root); info('KMnO4: purple to colorless when reduced'); addXP('KMnO4'); }
  function reactionElectrolysis(scene){ clearEffects(scene); const root=document.createElement('a-entity'); root.classList.add('chemfx'); for(let i=0;i<40;i++){ const b=document.createElement('a-sphere'); b.setAttribute('radius','0.008'); b.setAttribute('color','#93c5fd'); b.setAttribute('position', `${(Math.random()-0.5)*0.5} ${0.8+Math.random()*0.6} -1.6`); root.appendChild(b);} scene.appendChild(root); info('Electrolysis: gas bubbles at electrodes'); addXP('Electrolysis'); }
  function reactionBalance(scene){ clearEffects(scene); info('Multi-reactant: choose 2-3 reactants → balanced equation'); addXP('Multi-Reactant'); }

  window.VR_LAB.mountChemistry = mountChemistry;
})();

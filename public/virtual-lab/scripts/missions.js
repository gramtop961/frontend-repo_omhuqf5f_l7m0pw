// Missions & Gamification: XP, coins, badges, VR leaderboard
window.VR_LAB = window.VR_LAB || {};
(function(){
  function mountMissions(scene, uiRoot){
    const board = document.createElement('a-entity');
    board.setAttribute('position', '1.2 1.5 -1');
    board.setAttribute('geometry', 'primitive: plane; width: 1.1; height: 0.9');
    board.setAttribute('material', 'color: #0a1222; opacity: 0.9; transparent: true');
    board.setAttribute('class', 'interactive');

    const header = document.createElement('a-entity');
    header.setAttribute('text', 'value: Missions Console; color: #93c5fd; align: center; width: 1.6');
    header.setAttribute('position', '0 0.35 0.01');
    board.appendChild(header);

    const list = [
      {id:'hazard', label:'Lab Hazard Cleanup'},
      {id:'flask', label:'Overheated Flask Rescue'},
      {id:'circuit', label:'Circuit Repair'},
      {id:'puzzle', label:'Chemistry Puzzle'},
      {id:'escape', label:'Escape Room'},
      {id:'arena', label:'Survival Arena'},
    ];

    list.forEach((m, idx) => {
      const btn = document.createElement('a-entity');
      btn.setAttribute('geometry', 'primitive: plane; width: 0.95; height: 0.1');
      btn.setAttribute('material', 'color: #0f172a; opacity: 0.95');
      btn.setAttribute('position', `0 ${0.2 - idx*0.12} 0.01`);
      btn.setAttribute('class', 'interactive');
      const label = document.createElement('a-entity');
      label.setAttribute('text', `value: ▶ ${m.label}; color: #e2e8f0; align: center; width: 1.8`);
      label.setAttribute('position', '0 0 0.01');
      btn.appendChild(label);
      btn.addEventListener('click', () => startMission(m.id));
      board.appendChild(btn);
    });

    uiRoot.appendChild(board);
  }

  function startMission(id){
    switch(id){
      case 'hazard': hazardCleanup(); break;
      case 'flask': overheatedFlask(); break;
      case 'circuit': circuitRepair(); break;
      case 'puzzle': chemistryPuzzle(); break;
      case 'escape': escapeRoom(); break;
      case 'arena': survivalArena(); break;
    }
  }

  function hazardCleanup(){
    alert('Mission: Identify and click leaking containers and spills.');
    VR_LAB.addXP(50, 'Hazard Cleanup'); VR_LAB.addBadge('Safety Scout'); VR_LAB.markComplete('missions','hazard');
  }
  function overheatedFlask(){
    alert('Mission: Cool an overheated flask by placing it on a heat-resistant pad.');
    VR_LAB.addXP(60, 'Overheated Flask Rescue'); VR_LAB.markComplete('missions','flask');
  }
  function circuitRepair(){
    alert('Mission: Replace a burnt resistor to restore circuit functionality.');
    VR_LAB.addXP(70, 'Circuit Repair'); VR_LAB.addBadge('Fixer'); VR_LAB.markComplete('missions','circuit');
  }
  function chemistryPuzzle(){
    alert('Mission: Balance a reaction by choosing coefficients.');
    VR_LAB.addXP(40, 'Chemistry Puzzle'); VR_LAB.markComplete('missions','puzzle');
  }
  function escapeRoom(){
    alert('Mission: Solve clues to unlock the lab door.');
    VR_LAB.addXP(100, 'Escape Room'); VR_LAB.addBadge('Escapist'); VR_LAB.markComplete('missions','escape');
  }
  function survivalArena(){
    alert('Mission: Manage hazards under time pressure.');
    VR_LAB.addXP(120, 'Survival Arena'); VR_LAB.addBadge('Survivor'); VR_LAB.markComplete('missions','arena');
  }

  window.VR_LAB.mountMissions = mountMissions;
})();

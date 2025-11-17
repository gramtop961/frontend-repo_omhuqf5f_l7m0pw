# Virtual Reality Science Lab (WebXR)

An immersive WebXR laboratory for Physics, Chemistry, and AI built with A-Frame and open-source libraries. Runs in desktop browsers and VR headsets.

## Structure

virtual-lab/
- index.html (entry)
- scenes/ (reserved for extra scenes)
- models/ (reserved for 3D assets)
- src/ (if extending with modules)
- ui/ (styles)
- scripts/ (core logic)
- README.md (this file)

## Features

- Environment & Navigation: lab room, benches, teleport + comfort walk, lighting, safety signage.
- Physics Lab: pendulum, projectile, free fall, energy, collisions, momentum, oscillator, wave interference, doppler, buoyancy, RC circuit, lens tracing.
- Chemistry Lab: common reactions with visual effects, multi-reactant concept, reset.
- AI Lab: holographic assistant, TF.js MobileNet classification demo hook, conceptual transfer learning, reaction predictor, fault detection, saliency, quiz.
- Missions & Gamification: six mission types, XP, coins, badges, VR leaderboard concept.
- Progress Tracking: XP, badges, completed experiments, streaks in localStorage; VR progress terminal with charts.
- Performance & Stability: quality presets, low-poly primitives, black-screen prevention checklist, 2D fallback.

## Run

- Open the URL: /virtual-lab/index.html under your dev server.
- Click Start VR to initialize WebXR (prevents black screen).
- Choose quality and comfort options.

## Performance Modes
- Low: disables antialias, reduces lighting complexity.
- Medium: balanced (default).
- High: antialias, higher light intensity, shadows.

## Fallback
If WebGL/WebXR are unavailable, the 2D WebGL canvas fallback is shown. Use Retry WebGL to attempt again.

## Notes
- All interactions are implemented with declarative A-Frame entities and JS modules.
- This starter focuses on educational clarity and VR safety; extend with custom GLTF models in /models.
- The hero area uses a Spline 3D asset embedded as an iframe preview.

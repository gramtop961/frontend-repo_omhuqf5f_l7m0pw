import React from 'react'
import Spline from '@splinetool/react-spline'

function App() {
  return (
    <div className="min-h-screen relative bg-white">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-white pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">WebXR • VR Science Lab</p>
              <h1 className="mt-4 text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900">Explore Physics, Chemistry & AI in VR</h1>
              <p className="mt-4 text-lg text-slate-600">A browser-based virtual laboratory with teleportation, experiments, missions, and progress tracking. Works on desktop and VR headsets.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/virtual-lab/index.html" className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold shadow hover:bg-blue-700 transition">Launch VR Lab</a>
                <a href="/virtual-lab/README.md" className="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-white font-semibold shadow hover:bg-black transition">Read Docs</a>
              </div>
            </div>
            <div className="h-[420px] lg:h-[520px] rounded-2xl border border-blue-200/60 bg-white/80 shadow-xl overflow-hidden">
              <Spline scene="https://prod.spline.design/9HgHYACX2il7xmYO/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>
      </header>
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[{
              title:'Physics Experiments',desc:'Pendulum, projectile, waves, RC circuits, optics and more with live readouts.'
            },{
              title:'Chemistry Reactions',desc:'Neutralization, combustion, precipitates, electrolysis, color change.'
            },{
              title:'AI Lab',desc:'Holographic assistant with TF.js classification and learning demos.'
            }].map((f,i)=> (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow">
                <h3 className="font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="py-10 text-center text-slate-500">Built with A-Frame, TF.js, and WebXR</footer>
    </div>
  )
}

export default App

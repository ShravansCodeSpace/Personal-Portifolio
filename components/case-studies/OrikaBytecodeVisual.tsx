export function OrikaBytecodeVisual() {
  return (
    <div className="orika-visual relative h-full min-h-[19rem] w-full overflow-hidden bg-[#f8fafc] text-[#101828]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(20,184,166,0.18),transparent_28%),radial-gradient(circle_at_82%_24%,rgba(245,158,11,0.16),transparent_30%),linear-gradient(135deg,#f8fafc_0%,#eef6ff_48%,#fff7ed_100%)]" />

      <div className="relative z-10 flex h-full flex-col justify-between gap-4 p-[clamp(1rem,2.6vw,2rem)]">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-label text-[clamp(0.62rem,1.1vw,0.78rem)] uppercase tracking-[0.22em] text-[#0f766e]">
              SAP Commerce OCC
            </p>
            <h3 className="mt-1 font-display text-[clamp(1.6rem,4vw,3rem)] uppercase leading-none text-[#111827]">
              Orika Mapper Limit
            </h3>
          </div>
          <div className="rounded-md border border-[#dc2626]/30 bg-[#fff1f2] px-3 py-2 text-right shadow-sm">
            <p className="font-label text-[clamp(0.55rem,1vw,0.7rem)] uppercase tracking-[0.18em] text-[#991b1b]">
              JVM method limit
            </p>
            <p className="font-display text-[clamp(1.2rem,2.6vw,2rem)] leading-none text-[#dc2626]">65,535</p>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className="rounded-md border border-[#cbd5e1] bg-white/90 p-4 shadow-sm">
            <p className="font-label text-[clamp(0.58rem,1vw,0.72rem)] uppercase tracking-[0.18em] text-[#64748b]">
              Startup chain
            </p>
            <p className="mt-2 text-[clamp(0.82rem,1.25vw,1rem)] font-semibold text-[#111827]">Controller needs dataMapper</p>
            <p className="mt-1 text-[clamp(0.7rem,1vw,0.86rem)] leading-5 text-[#475569]">
              The visible failure looks like Spring bean creation.
            </p>
          </div>

          <div className="hidden h-1 w-14 overflow-hidden rounded bg-[#cbd5e1] md:block">
            <span className="orika-flow block h-full w-1/2 rounded bg-[#14b8a6]" />
          </div>

          <div className="rounded-md border border-[#f59e0b]/40 bg-[#fffbeb] p-4 shadow-sm">
            <p className="font-label text-[clamp(0.58rem,1vw,0.72rem)] uppercase tracking-[0.18em] text-[#92400e]">
              Generated mapper
            </p>
            <p className="mt-2 text-[clamp(0.82rem,1.25vw,1rem)] font-semibold text-[#111827]">
              OrderData -&gt; OrderWsDTO
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#fde68a]">
              <span className="orika-bytebar block h-full rounded-full bg-[#f97316]" />
            </div>
          </div>

          <div className="hidden h-1 w-14 overflow-hidden rounded bg-[#cbd5e1] md:block">
            <span className="orika-flow block h-full w-1/2 rounded bg-[#f97316]" />
          </div>

          <div className="rounded-md border border-[#dc2626]/40 bg-[#fff1f2] p-4 shadow-sm">
            <p className="font-label text-[clamp(0.58rem,1vw,0.72rem)] uppercase tracking-[0.18em] text-[#991b1b]">
              Root cause
            </p>
            <p className="mt-2 font-display text-[clamp(1.6rem,3.5vw,2.7rem)] leading-none text-[#dc2626]">65,540</p>
            <p className="mt-1 text-[clamp(0.74rem,1vw,0.9rem)] font-semibold text-[#991b1b]">5 bytes over the JVM limit</p>
          </div>
        </div>

        <footer className="grid gap-3 rounded-md border border-[#0f766e]/25 bg-[#ecfdf5] p-4 shadow-sm md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div>
            <p className="font-label text-[clamp(0.58rem,1vw,0.72rem)] uppercase tracking-[0.18em] text-[#0f766e]">
              Safer design
            </p>
            <p className="mt-1 text-[clamp(0.78rem,1.1vw,0.96rem)] font-semibold text-[#064e3b]">
              Keep Orika for common fields.
            </p>
          </div>
          <div className="hidden h-px w-12 bg-[#14b8a6] md:block" />
          <p className="text-[clamp(0.78rem,1.1vw,0.96rem)] font-semibold text-[#064e3b]">
            Populate feature fields directly on the WS DTO.
          </p>
        </footer>
      </div>

      <style>{`
        .orika-flow {
          animation: orika-flow 1.6s ease-in-out infinite;
        }

        .orika-bytebar {
          animation: orika-bytebar 2.4s ease-in-out infinite;
        }

        @keyframes orika-flow {
          0% { transform: translateX(-120%); }
          55%, 100% { transform: translateX(220%); }
        }

        @keyframes orika-bytebar {
          0%, 100% { width: 68%; }
          50% { width: 96%; }
        }
      `}</style>
    </div>
  );
}

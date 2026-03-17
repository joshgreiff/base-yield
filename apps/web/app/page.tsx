import Link from "next/link";
import Image from "next/image";
import { baseNetwork } from "@/lib/base";

const stack = [
  {
    label: "Digital Capital",
    title: "Bitcoin",
    description: "Global collateral foundation and long-duration capital layer."
  },
  {
    label: "Digital Credit",
    title: "STRC",
    description: "Credit primitive linking Bitcoin-backed balance sheet logic to programmable wrappers."
  },
  {
    label: "Layer-3 Product",
    title: "BaseYield",
    description: "Configurable digital money and digital yield modes distributed on Base."
  }
];

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-10 md:px-10">
      <header className="rounded-2xl border border-edge/80 bg-panel/60 p-6 shadow-soft backdrop-blur md:p-10">
        <Image src="/wordmark.svg" alt="BaseYield" width={210} height={45} className="mb-5 h-auto w-44 md:w-52" />
        <div className="mb-5 inline-flex rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          BaseYield Prototype
        </div>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-5xl">
          Programmable Digital Money Built on Bitcoin Credit
        </h1>
        <p className="mt-5 max-w-3xl text-base text-slate-300 md:text-lg">
          BaseYield explores a new financial stack: Bitcoin as digital capital, STRC as digital
          credit, and programmable Layer-3 wrappers on Base for money-like and yield-seeking user
          profiles.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-blue-300"
          >
            Open Prototype Dashboard
          </Link>
          <a
            href="https://youtu.be/smlZdop6M3U"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-edge bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500"
          >
            Watch Intro Video
          </a>
          <a
            href="https://base.org"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-edge bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500"
          >
            Built for {baseNetwork.name}
          </a>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {stack.map((item) => (
          <article key={item.title} className="rounded-xl border border-edge bg-slate-900/70 p-5">
            <p className="text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-edge bg-slate-900/70 p-6">
        <h2 className="text-2xl font-semibold text-white">The Problem</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
          Credit-linked products are often opaque and rigid. Users cannot easily see or configure
          how reserve policy, liquidity windows, and risk posture drive return profiles. We believe
          this is where programmable finance can materially improve product clarity.
        </p>
      </section>

      <section className="rounded-xl border border-edge bg-slate-900/70 p-6">
        <h2 className="text-2xl font-semibold text-white">The New Stack</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
          Traditional markets evolved from capital to credit to products. BaseYield applies this
          sequence natively onchain and frames Base as the distribution and policy layer for
          programmable digital money and digital yield.
        </p>
        <Image
          src="/architecture-diagram.svg"
          alt="Bitcoin to STRC to BaseYield architecture"
          width={1200}
          height={260}
          className="mt-5 h-auto w-full rounded-lg border border-edge"
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-mint/30 bg-mint/10 p-6">
          <h3 className="text-xl font-semibold text-mint">Money Mode</h3>
          <p className="mt-2 text-sm text-slate-200">
            Targeted 8-10% simulated APY with higher reserve posture, lower volatility, and daily
            liquidity orientation.
          </p>
        </article>
        <article className="rounded-xl border border-warm/30 bg-warm/10 p-6">
          <h3 className="text-xl font-semibold text-warm">Yield Mode</h3>
          <p className="mt-2 text-sm text-slate-200">
            Targeted 15-25% simulated APY with higher STRC concentration and optional structured
            overlays that increase risk and return variability.
          </p>
        </article>
      </section>

      <section className="rounded-xl border border-edge bg-slate-900/70 p-6">
        <h2 className="text-2xl font-semibold text-white">Why Base</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Base offers low-cost execution and high-quality developer tooling, making it a strong
          substrate for iterative vault design, policy experiments, and user-facing distribution
          of credit-linked wrappers.
        </p>
      </section>

      <section className="rounded-xl border border-edge bg-slate-900/70 p-6">
        <h2 className="text-2xl font-semibold text-white">Roadmap Snapshot</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          <li>Phase 1: Product thesis demo, dashboard simulation, contract scaffold</li>
          <li>Phase 2: Base Sepolia testnet integration and scenario analytics</li>
          <li>Phase 3: Partner and offchain integration exploration</li>
          <li>Phase 4: Regulated wrapper and distribution model exploration</li>
        </ul>
      </section>

      <footer className="rounded-xl border border-edge bg-slate-900/50 p-5 text-xs leading-6 text-slate-400">
        This repository is an exploratory prototype. All figures shown in the dashboard are
        simulated and for product design discussion only.
      </footer>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { listProfiles, simulateBtcAccumulation, simulateMode } from "@/lib/simulation";

const exposureByMode = {
  money: [
    { label: "STRC Core", value: 70, color: "bg-blue-400" },
    { label: "Treasury/Cash Sleeve", value: 20, color: "bg-emerald-400" },
    { label: "Reserve Buffer", value: 10, color: "bg-slate-400" }
  ],
  yield: [
    { label: "STRC Core", value: 90, color: "bg-blue-400" },
    { label: "Reserve Buffer", value: 5, color: "bg-emerald-400" },
    { label: "Enhanced Yield Sleeve", value: 5, color: "bg-amber-400" }
  ]
} as const;

const navSeries = [100.1, 99.9, 100.2, 100.05, 100.15, 100.03, 99.98, 100.12];
const samplePositionUsd = 100_000;
const simulatedBtcPriceUsd = 85_000;

export default function DashboardPage() {
  const [mode, setMode] = useState<"money" | "yield">("money");
  const [reserveAdjust, setReserveAdjust] = useState(0);
  const [payoutPreference, setPayoutPreference] = useState<"usd" | "btc">("usd");
  const [btcConvertPercent, setBtcConvertPercent] = useState(35);
  const profiles = listProfiles();
  const selected = profiles.find((p) => p.id === mode) ?? profiles[0];
  const result = useMemo(() => simulateMode(mode, reserveAdjust), [mode, reserveAdjust]);
  const btcSimulation = useMemo(
    () =>
      simulateBtcAccumulation(
        samplePositionUsd,
        result.apy,
        payoutPreference === "btc" ? btcConvertPercent : 0,
        simulatedBtcPriceUsd
      ),
    [btcConvertPercent, payoutPreference, result.apy]
  );

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pb-16 pt-8 md:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">BaseYield Dashboard</p>
          <h1 className="mt-1 text-3xl font-semibold text-white">Prototype Vault Simulator</h1>
        </div>
        <Link
          href="/"
          className="rounded-lg border border-edge bg-slate-900/60 px-4 py-2 text-sm text-slate-200 hover:border-slate-500"
        >
          Back to Landing
        </Link>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total Deposited (sim)" value="$42.8M" detail="Across all wrappers" />
        <StatCard label="Estimated APY" value={`${result.apy.toFixed(2)}%`} detail={selected.name} />
        <StatCard label="Reserve Ratio" value={`${result.reserveRatio.toFixed(1)}%`} detail="Policy-adjusted" />
        <StatCard
          label="BTC Accumulation (12m sim)"
          value={`${btcSimulation.estimatedBtcAccumulated.toFixed(4)} BTC`}
          detail={
            payoutPreference === "btc"
              ? `${btcConvertPercent}% of yield converted`
              : "Disabled (USD payout selected)"
          }
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-xl border border-edge bg-slate-900/70 p-5 lg:col-span-2">
          <h2 className="text-lg font-semibold text-white">Mode Configuration</h2>
          <p className="mt-1 text-sm text-slate-300">
            Choose a mode and adjust reserve policy to simulate yield, volatility, and redemption
            outcomes.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {profiles.map((profile) => (
              <button
                key={profile.id}
                type="button"
                onClick={() => setMode(profile.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  profile.id === mode
                    ? "bg-accent text-slate-950"
                    : "border border-edge bg-slate-950/50 text-slate-200 hover:border-slate-500"
                }`}
              >
                {profile.name}
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-lg border border-edge bg-slate-950/40 p-4">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Reserve policy adjustment</span>
              <span>{reserveAdjust > 0 ? `+${reserveAdjust}` : reserveAdjust}%</span>
            </div>
            <input
              className="mt-3 w-full accent-accent"
              type="range"
              min={-5}
              max={10}
              step={1}
              value={reserveAdjust}
              onChange={(event) => setReserveAdjust(Number(event.target.value))}
            />
            <p className="mt-2 text-xs text-slate-400">
              More reserve generally lowers yield but improves redemption profile.
            </p>
          </div>

          <div className="mt-5 rounded-lg border border-edge bg-slate-950/40 p-4">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Yield payout preference (optional)</span>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => setPayoutPreference("usd")}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  payoutPreference === "usd"
                    ? "bg-accent text-slate-950"
                    : "border border-edge bg-slate-950/50 text-slate-200 hover:border-slate-500"
                }`}
              >
                USD / Stable payout
              </button>
              <button
                type="button"
                onClick={() => setPayoutPreference("btc")}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  payoutPreference === "btc"
                    ? "bg-accent text-slate-950"
                    : "border border-edge bg-slate-950/50 text-slate-200 hover:border-slate-500"
                }`}
              >
                Auto-convert yield to BTC
              </button>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Yield converted to BTC</span>
                <span>{payoutPreference === "btc" ? `${btcConvertPercent}%` : "0%"}</span>
              </div>
              <input
                className="mt-2 w-full accent-accent disabled:opacity-50"
                type="range"
                min={0}
                max={100}
                step={5}
                value={btcConvertPercent}
                disabled={payoutPreference !== "btc"}
                onChange={(event) => setBtcConvertPercent(Number(event.target.value))}
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Optional user-controlled setting. Simulates converting a share of yield into BTC and
              does not change core vault allocations.
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <MiniCard label="Liquidity Profile" value={`${result.estimatedRedemptionHours}h est.`} note={result.liquidityLabel} />
            <MiniCard
              label="Yield Profile"
              value={`${result.apy.toFixed(2)}%`}
              note={`Range target: ${selected.targetRange}`}
            />
            <MiniCard label="Volatility Profile" value={`${result.volatility.toFixed(2)}%`} note="Estimated annualized" />
          </div>
          <div className="mt-4 rounded-lg border border-edge bg-slate-950/40 p-3 text-xs text-slate-300">
            Example using a ${samplePositionUsd.toLocaleString()} position at BTC price $
            {simulatedBtcPriceUsd.toLocaleString()}: annual simulated yield $
            {btcSimulation.annualYieldUsd.toLocaleString()} | converted $
            {btcSimulation.annualYieldConvertedUsd.toLocaleString()}.
          </div>
        </article>

        <article className="rounded-xl border border-edge bg-slate-900/70 p-5">
          <h2 className="text-lg font-semibold text-white">Exposure Breakdown</h2>
          <p className="mt-1 text-sm text-slate-300">Conceptual composition, not live allocations.</p>
          <div className="mt-4 space-y-3">
            {exposureByMode[mode].map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex justify-between text-xs text-slate-300">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-edge bg-slate-950/50 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Yield Source</p>
            <p className="mt-1 text-sm text-slate-200">{selected.yieldSource}</p>
          </div>
        </article>
      </section>

      <section className="rounded-xl border border-edge bg-slate-900/70 p-5">
        <h2 className="text-lg font-semibold text-white">Simulated NAV Trend (Placeholder)</h2>
        <p className="mt-1 text-sm text-slate-300">
          Conceptual chart only. Live feeds and reconciliation are not integrated in this
          prototype.
        </p>
        <SimpleSeriesChart values={navSeries} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {profiles.map((profile) => (
          <article key={profile.id} className="rounded-xl border border-edge bg-slate-900/70 p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
              <span className="rounded-full border border-edge bg-slate-800 px-2 py-1 text-xs text-slate-300">
                Target APY {profile.targetRange}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{profile.strategy}</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <Detail label="Volatility">
                {profile.baseVolatility.toFixed(1)}% {profile.id === "money" ? "low band" : "higher band"}
              </Detail>
              <Detail label="Liquidity Terms">{profile.liquidity}</Detail>
              <Detail label="Reserve Buffer">{profile.reserveBuffer}% baseline</Detail>
              <Detail label="STRC Exposure">{profile.strcExposure}%</Detail>
              <Detail label="Yield Source">{profile.yieldSource}</Detail>
            </dl>
          </article>
        ))}
      </section>

      <footer className="rounded-xl border border-edge bg-slate-900/60 p-4 text-xs leading-6 text-slate-400">
        Prototype notice: all values shown are simulated for concept demonstration and do not
        represent live asset data, custody integration, production risk controls, or automated BTC
        conversion execution.
      </footer>
    </main>
  );
}

function SimpleSeriesChart({ values }: { values: number[] }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values
    .map((value, i) => {
      const x = (i / (values.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="mt-4 rounded-lg border border-edge bg-slate-950/50 p-3">
      <svg viewBox="0 0 100 100" className="h-36 w-full">
        <polyline fill="none" stroke="#60a5fa" strokeWidth="2" points={points} />
      </svg>
      <div className="mt-2 flex justify-between text-xs text-slate-400">
        <span>t-7</span>
        <span>t</span>
      </div>
    </div>
  );
}

function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="rounded-xl border border-edge bg-slate-900/70 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{detail}</p>
    </article>
  );
}

function MiniCard({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <article className="rounded-lg border border-edge bg-slate-950/40 p-3">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{note}</p>
    </article>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-edge bg-slate-950/40 p-2">
      <dt className="text-xs text-slate-400">{label}</dt>
      <dd className="mt-1 text-slate-200">{children}</dd>
    </div>
  );
}

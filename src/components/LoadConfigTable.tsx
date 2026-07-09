import { useState } from 'react';
import type { LoadItem } from '../types';
import { calcLoadKw } from '../lib/calculations';

interface LoadConfigTableProps {
  loads: LoadItem[];
  onChange: (id: string, patch: Partial<LoadItem>) => void;
}

const numberFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 3,
});

export function LoadConfigTable({ loads, onChange }: LoadConfigTableProps) {
  const [isOpen, setIsOpen] = useState(true);

  const totalSelectedKw = loads
    .filter((load) => load.enabled)
    .reduce((sum, load) => sum + calcLoadKw(load), 0);

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Configuração de cargas
          </span>
        </span>
        <span className="flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-1.5 dark:bg-emerald-950/40">
          <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
            Carga total selecionada
          </span>
          <span className="text-base font-bold tabular-nums text-emerald-900 dark:text-emerald-200">
            {numberFormatter.format(totalSelectedKw)} kW
          </span>
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-slate-100 px-4 pb-4 pt-3 dark:border-slate-800">
          <table className="w-full table-fixed border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500 dark:border-slate-700 dark:text-slate-400">
                <th className="w-14 py-2 pr-2 font-medium">Ativa</th>
                <th className="py-2 pr-2 font-medium">Carga</th>
                <th className="w-32 py-2 pr-2 text-right font-medium">Potência (CV)</th>
                <th className="w-32 py-2 pr-2 text-right font-medium">Fator de demanda</th>
                <th className="w-28 py-2 pl-2 text-right font-medium">kW</th>
              </tr>
            </thead>
            <tbody>
              {loads.map((load) => (
                <tr
                  key={load.id}
                  className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                >
                  <td className="py-2 pr-2">
                    <input
                      type="checkbox"
                      checked={load.enabled}
                      onChange={(e) => onChange(load.id, { enabled: e.target.checked })}
                      className="h-4 w-4 accent-emerald-600"
                      aria-label={`Ativar ${load.name}`}
                    />
                  </td>
                  <td className="py-2 pr-2 text-slate-800 dark:text-slate-200">{load.name}</td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      value={load.powerCv}
                      min={0}
                      onChange={(e) => onChange(load.id, { powerCv: Number(e.target.value) })}
                      className="w-full rounded border border-slate-300 bg-white px-2 py-1 text-right dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    />
                  </td>
                  <td className="py-2 pr-2">
                    <input
                      type="number"
                      value={load.demandFactor}
                      min={0}
                      step={0.01}
                      onChange={(e) => onChange(load.id, { demandFactor: Number(e.target.value) })}
                      className="w-full rounded border border-slate-300 bg-white px-2 py-1 text-right dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    />
                  </td>
                  <td className="py-2 pl-2 text-right tabular-nums text-slate-700 dark:text-slate-300">
                    {numberFormatter.format(calcLoadKw(load))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

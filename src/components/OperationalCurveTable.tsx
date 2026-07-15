import type { CurveSummary, HourResult } from '../types';
import { SummaryFooter } from './SummaryFooter';

interface OperationalCurveTableProps {
  title: string;
  hourResults: HourResult[];
  summary: CurveSummary;
}

const kwFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const lhFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function OperationalCurveTable({ title, hourResults, summary }: OperationalCurveTableProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-3 text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <table className="w-full table-fixed border-collapse text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500 dark:border-slate-700 dark:text-slate-400">
            <th className="py-2 pr-2 font-medium">Hora</th>
            <th className="py-2 pr-2 text-right font-medium">Carga Total (kW)</th>
            <th className="py-2 pr-2 text-right font-medium">Solar (kW)</th>
            <th className="py-2 pr-2 text-right font-medium">Excedente (kW)</th>
            <th className="py-2 pr-2 text-right font-medium">Diesel (kW)</th>
            <th className="py-2 pr-2 text-right font-medium">Nº ger.</th>
            <th className="py-2 pl-2 text-right font-medium">Consumo (L/h)</th>
          </tr>
        </thead>
        <tbody>
          {hourResults.map((row) => (
            <tr
              key={row.hourLabel}
              className="border-b border-slate-100 last:border-0 dark:border-slate-800"
            >
              <td className="py-1.5 pr-2 text-slate-800 dark:text-slate-200">{row.hourLabel}</td>
              <td className="py-1.5 pr-2 text-right tabular-nums text-slate-700 dark:text-slate-300">
                {kwFormatter.format(row.totalLoadKw)}
              </td>
              <td className="py-1.5 pr-2 text-right tabular-nums text-slate-700 dark:text-slate-300">
                {kwFormatter.format(row.usefulSolarKw)}
              </td>
              <td className="py-1.5 pr-2 text-right tabular-nums">
                {row.excessSolarKw > 0 ? (
                  <span className="inline-block rounded bg-green-100 px-1.5 py-0.5 font-medium text-green-800 dark:bg-green-950/40 dark:text-green-400">
                    {kwFormatter.format(row.excessSolarKw)}
                  </span>
                ) : (
                  <span className="text-slate-400 dark:text-slate-600">
                    {kwFormatter.format(row.excessSolarKw)}
                  </span>
                )}
              </td>
              <td className="py-1.5 pr-2 text-right tabular-nums text-slate-700 dark:text-slate-300">
                {kwFormatter.format(row.dieselOutputKw)}
              </td>
              <td className="py-1.5 pr-2 text-right tabular-nums text-slate-700 dark:text-slate-300">
                {row.numGenerators}
              </td>
              <td className="py-1.5 pl-2 text-right">
                <span className="tabular-nums font-semibold text-emerald-700 dark:text-emerald-400">
                  {lhFormatter.format(row.consumptionLh)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <SummaryFooter summary={summary} />
    </section>
  );
}

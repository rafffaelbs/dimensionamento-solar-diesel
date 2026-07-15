import type { CurveSummary } from '../types';

interface SummaryFooterProps {
  summary: CurveSummary;
}

const lhFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

type Unit = 'L' | 'R$';

export function SummaryFooter({ summary }: SummaryFooterProps) {
  const consumptionRows: Array<{ label: string; value: number; emphasize?: boolean; unit: Unit }> = [
    { label: 'Consumo no período de sol pleno (08h–17h)', value: summary.fullSunConsumption, unit: 'L' },
    {
      label: 'Consumo nos períodos de baixo sol (07h-08h e 17h-18h)',
      value: summary.lowSunConsumption,
      unit: 'L',
    },
    { label: 'Consumo total do dia', value: summary.totalDayConsumption, emphasize: true, unit: 'L' },
  ];

  const costRows: Array<{ label: string; value: number; unit: Unit; highlight?: boolean }> = [
    { label: 'Custo Somente Diesel (R$)', value: summary.dieselOnlyCost, unit: 'R$' },
    { label: 'Custo Total com Solar (R$)', value: summary.totalCostSolar, unit: 'R$' },
    { label: 'Economia em Litros', value: summary.savingsLiters, unit: 'L', highlight: true },
    { label: 'Economia em Reais', value: summary.savingsReais, unit: 'R$', highlight: true },
  ];

  const formatValue = (value: number, unit: Unit) =>
    unit === 'R$' ? currencyFormatter.format(value) : `${lhFormatter.format(value)} L`;

  const formatKwh = (value: number) => `${lhFormatter.format(value)} kWh`;

  return (
    <dl className="mt-3 divide-y divide-slate-200 border-t border-slate-200 text-sm dark:divide-slate-800 dark:border-slate-800">
      {consumptionRows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-4 py-2">
          <dt
            className={
              row.emphasize
                ? 'font-semibold text-slate-900 dark:text-slate-100'
                : 'text-slate-500 dark:text-slate-400'
            }
          >
            {row.label}
          </dt>
          <dd
            className={
              row.emphasize
                ? 'whitespace-nowrap font-bold tabular-nums text-slate-900 dark:text-slate-100'
                : 'whitespace-nowrap tabular-nums text-slate-700 dark:text-slate-300'
            }
          >
            {formatValue(row.value, row.unit)}
          </dd>
        </div>
      ))}
      {costRows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-4 py-2">
          <dt
            className={
              row.highlight
                ? 'font-bold text-emerald-700 dark:text-emerald-400'
                : 'text-slate-500 dark:text-slate-400'
            }
          >
            {row.label}
          </dt>
          <dd
            className={
              row.highlight
                ? 'whitespace-nowrap font-bold tabular-nums text-emerald-700 dark:text-emerald-400'
                : 'whitespace-nowrap tabular-nums text-slate-700 dark:text-slate-300'
            }
          >
            {formatValue(row.value, row.unit)}
          </dd>
        </div>
      ))}
      <div className="flex items-center justify-between gap-4 py-2">
        <dt className="font-bold text-amber-700 dark:text-amber-400">
          Potencial de Armazenamento em Baterias (Excedente Diário)
        </dt>
        <dd className="whitespace-nowrap font-bold tabular-nums text-amber-700 dark:text-amber-400">
          {formatKwh(summary.dailyExcessKwh)}
        </dd>
      </div>
    </dl>
  );
}

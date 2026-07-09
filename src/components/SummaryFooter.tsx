import type { CurveSummary } from '../types';

interface SummaryFooterProps {
  summary: CurveSummary;
}

const lhFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function SummaryFooter({ summary }: SummaryFooterProps) {
  const rows: Array<{ label: string; value: number; emphasize?: boolean }> = [
    { label: 'Consumo no período de sol pleno (08h–17h)', value: summary.fullSunConsumption },
    {
      label: 'Consumo nos períodos de baixo sol (07h-08h e 17h-18h)',
      value: summary.lowSunConsumption,
    },
    { label: 'Consumo total do dia', value: summary.totalDayConsumption, emphasize: true },
  ];

  return (
    <dl className="mt-3 divide-y divide-slate-200 border-t border-slate-200 text-sm dark:divide-slate-800 dark:border-slate-800">
      {rows.map((row) => (
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
            {lhFormatter.format(row.value)} L
          </dd>
        </div>
      ))}
    </dl>
  );
}

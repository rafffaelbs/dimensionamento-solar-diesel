import { useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { LegendPayload } from 'recharts/types/component/DefaultLegendContent';

export interface ChartDataPoint {
  hourLabel: string;
  totalLoadKw: number;
  fixedUsefulKw: number;
  fixedTotalKw: number;
  trackerUsefulKw: number;
  trackerTotalKw: number;
}

interface ChartComponentProps {
  data: ChartDataPoint[];
}

type SeriesKey = keyof Omit<ChartDataPoint, 'hourLabel'>;

interface SeriesConfig {
  dataKey: SeriesKey;
  name: string;
  stroke: string;
  dashed: boolean;
}

const SERIES: SeriesConfig[] = [
  { dataKey: 'totalLoadKw', name: 'Carga Total', stroke: '#dc2626', dashed: false },
  { dataKey: 'fixedUsefulKw', name: 'Solar Fixa (Útil)', stroke: '#f59e0b', dashed: false },
  { dataKey: 'fixedTotalKw', name: 'Solar Fixa (Total)', stroke: '#f59e0b', dashed: true },
  { dataKey: 'trackerUsefulKw', name: 'Solar Tracker (Útil)', stroke: '#2563eb', dashed: false },
  { dataKey: 'trackerTotalKw', name: 'Solar Tracker (Total)', stroke: '#2563eb', dashed: true },
];

export function ChartComponent({ data }: ChartComponentProps) {
  const [hiddenKeys, setHiddenKeys] = useState<Set<SeriesKey>>(new Set());

  const toggleSeries = (dataKey: SeriesKey) => {
    setHiddenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(dataKey)) {
        next.delete(dataKey);
      } else {
        next.add(dataKey);
      }
      return next;
    });
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-1 text-base font-semibold text-slate-900 dark:text-slate-100">
        Carga vs. Geração Solar (Útil x Total)
      </h3>
      <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
        Clique nos itens da legenda para mostrar ou ocultar linhas.
      </p>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis dataKey="hourLabel" tick={{ fontSize: 12 }} />
            <YAxis
              tick={{ fontSize: 12 }}
              label={{ value: 'Potência (kW)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend
              wrapperStyle={{ cursor: 'pointer' }}
              onClick={(entry: LegendPayload) => toggleSeries(entry.dataKey as SeriesKey)}
              formatter={(value: string, entry: LegendPayload) => {
                const isHidden = hiddenKeys.has(entry.dataKey as SeriesKey);
                return (
                  <span
                    className={isHidden ? 'text-slate-400 line-through dark:text-slate-600' : ''}
                  >
                    {value}
                  </span>
                );
              }}
            />
            {SERIES.map((series) => (
              <Line
                key={series.dataKey}
                type="monotone"
                dataKey={series.dataKey}
                name={series.name}
                stroke={series.stroke}
                strokeWidth={2}
                strokeDasharray={series.dashed ? '5 5' : undefined}
                dot={false}
                hide={hiddenKeys.has(series.dataKey)}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

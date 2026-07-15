import { useMemo, useState } from 'react';
import { LoadConfigTable } from './components/LoadConfigTable';
import { SolarPowerInput } from './components/SolarPowerInput';
import { OperationalCurveTable } from './components/OperationalCurveTable';
import { ChartComponent, type ChartDataPoint } from './components/ChartComponent';
import { GENERATOR_SPEC, HOURLY_SOLAR_CURVES, INITIAL_LOADS } from './data/constants';
import {
  calcCurveResults,
  calcDieselOnlyConsumption,
  calcSummary,
  calcTotalLoadKw,
} from './lib/calculations';
import type { LoadItem } from './types';

function App() {
  const [loads, setLoads] = useState<LoadItem[]>(INITIAL_LOADS);
  const [installedSolarKw, setInstalledSolarKw] = useState(1500);
  const [dieselPrice, setDieselPrice] = useState(6.2);

  const handleLoadChange = (id: string, patch: Partial<LoadItem>) => {
    setLoads((prev) => prev.map((load) => (load.id === id ? { ...load, ...patch } : load)));
  };

  const handleAddLoad = () => {
    const newLoadId = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 9);
    setLoads((prev) => [
      ...prev,
      {
        id: newLoadId,
        name: `Carga ${prev.length + 1}`,
        powerCv: 100,
        demandFactor: 1.0,
        enabled: true,
        horaInicio: 7,
        horaFim: 18,
      },
    ]);
  };

  const handleRemoveLoad = (id: string) => {
    setLoads((prev) => prev.filter((load) => load.id !== id));
  };

  const totalLoadKw = useMemo(() => calcTotalLoadKw(loads), [loads]);
  const safeSolarKw = Math.max(installedSolarKw, 0);
  const safeDieselPrice = Math.max(dieselPrice, 0);

  const fixedResults = useMemo(
    () =>
      calcCurveResults(
        HOURLY_SOLAR_CURVES,
        'fixed',
        loads,
        safeSolarKw,
        GENERATOR_SPEC,
      ),
    [loads, safeSolarKw],
  );
  const trackerResults = useMemo(
    () =>
      calcCurveResults(
        HOURLY_SOLAR_CURVES,
        'tracker',
        loads,
        safeSolarKw,
        GENERATOR_SPEC,
      ),
    [loads, safeSolarKw],
  );

  const dieselOnlyConsumption = useMemo(
    () => calcDieselOnlyConsumption(loads, HOURLY_SOLAR_CURVES, GENERATOR_SPEC),
    [loads],
  );

  const fixedSummary = useMemo(
    () => calcSummary(fixedResults, dieselOnlyConsumption, safeDieselPrice),
    [fixedResults, dieselOnlyConsumption, safeDieselPrice],
  );
  const trackerSummary = useMemo(
    () => calcSummary(trackerResults, dieselOnlyConsumption, safeDieselPrice),
    [trackerResults, dieselOnlyConsumption, safeDieselPrice],
  );

  const chartData: ChartDataPoint[] = useMemo(
    () =>
      fixedResults.map((fixedResult, index) => ({
        hourLabel: fixedResult.hourLabel,
        totalLoadKw: fixedResult.totalLoadKw,
        fixedUsefulKw: fixedResult.usefulSolarKw,
        fixedTotalKw: fixedResult.solarGeneratedKw,
        trackerUsefulKw: trackerResults[index].usefulSolarKw,
        trackerTotalKw: trackerResults[index].solarGeneratedKw,
      })),
    [fixedResults, trackerResults],
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-16 dark:bg-slate-950">
      <header className="border-b border-slate-200 bg-white px-6 py-5 dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Dimensionamento Solar-Diesel
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Selecione as cargas, defina a potência solar instalada e compare as curvas fixa e
          tracker.
        </p>
      </header>

      <main className="mx-auto mt-6 flex w-full max-w-[1600px] flex-col gap-6 px-6">
        <LoadConfigTable
          loads={loads}
          onChange={handleLoadChange}
          onAdd={handleAddLoad}
          onRemove={handleRemoveLoad}
        />

        <SolarPowerInput
          value={installedSolarKw}
          onChange={setInstalledSolarKw}
          dieselPrice={dieselPrice}
          onDieselPriceChange={setDieselPrice}
        />

        {totalLoadKw === 0 && (
          <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200">
            Nenhuma carga selecionada — a carga total é 0 kW. Os geradores permanecem no mínimo
            (1 gerador, 96 kW) em todas as horas.
          </div>
        )}

        <div>
          <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100">
            Curva operacional (07h–18h)
          </h2>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <OperationalCurveTable title="Curva Fixa" hourResults={fixedResults} summary={fixedSummary} />
            <OperationalCurveTable
              title="Curva Tracker"
              hourResults={trackerResults}
              summary={trackerSummary}
            />
          </div>
        </div>

        <ChartComponent data={chartData} />
      </main>
    </div>
  );
}

export default App;

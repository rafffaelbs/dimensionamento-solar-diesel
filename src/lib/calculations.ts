import { CV_TO_KW, FULL_SUN_HOUR_INDEXES, LOW_SUN_HOUR_INDEXES } from '../data/constants';
import type {
  CurveSummary,
  CurveType,
  GeneratorSpec,
  HourResult,
  HourlySolarCurve,
  LoadItem,
} from '../types';

export function calcLoadKw(load: Pick<LoadItem, 'powerCv' | 'demandFactor'>): number {
  return load.powerCv * CV_TO_KW * load.demandFactor;
}

export function calcTotalLoadKw(loads: LoadItem[]): number {
  return loads
    .filter((load) => load.enabled)
    .reduce((sum, load) => sum + calcLoadKw(load), 0);
}

export function calcGeneratorConsumption(loadKw: number): number {
  return 0.00045411 * loadKw * loadKw + 0.0769035 * loadKw + 9;
}

export function calcHourResult(
  hourLabel: string,
  totalLoadKw: number,
  solarPct: number,
  installedSolarKw: number,
  generatorSpec: GeneratorSpec,
): HourResult {
  const solarGeneratedKw = solarPct * installedSolarKw;
  const dieselNeededKw = totalLoadKw - solarGeneratedKw;

  let numGenerators: number;
  let loadPerGeneratorKw: number;

  if (dieselNeededKw <= 0) {
    numGenerators = 1;
    loadPerGeneratorKw = generatorSpec.minLoadKw;
  } else {
    numGenerators = Math.ceil(dieselNeededKw / generatorSpec.unitPowerKw);
    const rawLoadPerGenerator = dieselNeededKw / numGenerators;
    loadPerGeneratorKw = Math.max(rawLoadPerGenerator, generatorSpec.minLoadKw);
  }

  const unitConsumptionLh = calcGeneratorConsumption(loadPerGeneratorKw);
  const consumptionLh = unitConsumptionLh * numGenerators;
  const dieselOutputKw = loadPerGeneratorKw * numGenerators;

  return {
    hourLabel,
    solarGeneratedKw,
    dieselNeededKw,
    dieselOutputKw,
    numGenerators,
    loadPerGeneratorKw,
    consumptionLh,
  };
}

export function calcCurveResults(
  hourlyCurves: HourlySolarCurve[],
  curveType: CurveType,
  totalLoadKw: number,
  installedSolarKw: number,
  generatorSpec: GeneratorSpec,
): HourResult[] {
  return hourlyCurves.map((curve) => {
    const solarPct = curveType === 'fixed' ? curve.fixedPct : curve.trackerPct;
    return calcHourResult(
      curve.hourLabel,
      totalLoadKw,
      solarPct,
      installedSolarKw,
      generatorSpec,
    );
  });
}

export function calcSummary(hourResults: HourResult[]): CurveSummary {
  const sumAt = (indexes: number[]) =>
    indexes.reduce((sum, i) => sum + (hourResults[i]?.consumptionLh ?? 0), 0);

  const fullSunConsumption = sumAt(FULL_SUN_HOUR_INDEXES);
  const lowSunConsumption = sumAt(LOW_SUN_HOUR_INDEXES);

  return {
    fullSunConsumption,
    lowSunConsumption,
    totalDayConsumption: fullSunConsumption + lowSunConsumption,
  };
}

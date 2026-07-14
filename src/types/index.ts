export interface LoadItem {
  id: string;
  name: string;
  powerCv: number;
  demandFactor: number;
  enabled: boolean;
}

export type CurveType = 'fixed' | 'tracker';

export interface HourlySolarCurve {
  hourLabel: string;
  fixedPct: number;
  trackerPct: number;
}

export interface GeneratorSpec {
  unitPowerKw: number;
  minLoadFactor: number;
  minLoadKw: number;
}

export interface HourResult {
  hourLabel: string;
  solarGeneratedKw: number;
  dieselNeededKw: number;
  dieselOutputKw: number;
  numGenerators: number;
  loadPerGeneratorKw: number;
  consumptionLh: number;
}

export interface CurveSummary {
  fullSunConsumption: number;
  lowSunConsumption: number;
  totalDayConsumption: number;
}

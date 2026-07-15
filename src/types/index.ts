export interface LoadItem {
  id: string;
  name: string;
  powerCv: number;
  demandFactor: number;
  enabled: boolean;
  horaInicio: number;
  horaFim: number;
}

export type CurveType = 'fixed' | 'tracker';

export interface HourlySolarCurve {
  hourLabel: string;
  hour: number;
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
  totalLoadKw: number;
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
  dieselOnlyConsumption: number;
  totalCostSolar: number;
  dieselOnlyCost: number;
  savingsLiters: number;
  savingsReais: number;
}

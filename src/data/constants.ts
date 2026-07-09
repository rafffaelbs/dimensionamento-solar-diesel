import type {
  ConsumptionPoint,
  GeneratorSpec,
  HourlySolarCurve,
  LoadItem,
} from '../types';

export const CV_TO_KW = 0.736;

export const INITIAL_LOADS: LoadItem[] = [
  { id: '1', name: 'Pivô 1', powerCv: 250, demandFactor: 1.12, enabled: true },
  { id: '2', name: 'Pivô 2', powerCv: 200, demandFactor: 1.12, enabled: true },
  { id: '3', name: 'Pivô 3', powerCv: 200, demandFactor: 1.12, enabled: true },
  { id: '4', name: 'Pivô 4', powerCv: 200, demandFactor: 1.12, enabled: true },
  { id: '5', name: 'Pivô 5', powerCv: 250, demandFactor: 1.12, enabled: true },
  { id: '6', name: 'Pivô 6', powerCv: 250, demandFactor: 1.12, enabled: true },
  { id: '7', name: 'Pivô 7', powerCv: 120, demandFactor: 1.12, enabled: true },
  { id: '8', name: 'Pivô 8', powerCv: 120, demandFactor: 1.12, enabled: true },
  { id: '9', name: 'Pivô 9', powerCv: 120, demandFactor: 1.12, enabled: true },
  { id: '10', name: 'Pivô 10', powerCv: 120, demandFactor: 1.12, enabled: true },
  { id: '11', name: 'Pivô 11', powerCv: 120, demandFactor: 1.12, enabled: true },
  { id: 'Bomb.01', name: 'Bombeamento', powerCv: 700, demandFactor: 1.12, enabled: false },
];

export const HOURLY_SOLAR_CURVES: HourlySolarCurve[] = [
  { hourLabel: '07-08', fixedPct: 0.04, trackerPct: 0.57 },
  { hourLabel: '08-09', fixedPct: 0.15, trackerPct: 0.82 },
  { hourLabel: '09-10', fixedPct: 0.38, trackerPct: 1.0 },
  { hourLabel: '10-11', fixedPct: 0.66, trackerPct: 1.0 },
  { hourLabel: '11-12', fixedPct: 0.87, trackerPct: 1.0 },
  { hourLabel: '12-13', fixedPct: 0.98, trackerPct: 1.0 },
  { hourLabel: '13-14', fixedPct: 1.0, trackerPct: 1.0 },
  { hourLabel: '14-15', fixedPct: 0.90, trackerPct: 1.0 },
  { hourLabel: '15-16', fixedPct: 0.70, trackerPct: 1.0 },
  { hourLabel: '16-17', fixedPct: 0.43, trackerPct: 0.82 },
  { hourLabel: '17-18', fixedPct: 0.16, trackerPct: 0.57 },
];

// Índices (0-based) de HOURLY_SOLAR_CURVES cobertos por cada período de agregação.
export const FULL_SUN_HOUR_INDEXES = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // 08-09 até 16-17
export const LOW_SUN_HOUR_INDEXES = [0, 10]; // 07-08 e 17-18

export const GENERATOR_SPEC: GeneratorSpec = {
  unitPowerKw: 320,
  minLoadFactor: 0.3,
  minLoadKw: 96,
};

// Planilha2: curva de consumo do gerador, kW (0-320, passo 8) -> L/h.
export const CONSUMPTION_TABLE: ConsumptionPoint[] = [
  { kw: 0, lh: 9.0 },
  { kw: 8, lh: 9.644 },
  { kw: 16, lh: 10.347 },
  { kw: 24, lh: 11.107 },
  { kw: 32, lh: 11.926 },
  { kw: 40, lh: 12.803 },
  { kw: 48, lh: 13.738 },
  { kw: 56, lh: 14.731 },
  { kw: 64, lh: 15.782 },
  { kw: 72, lh: 16.891 },
  { kw: 80, lh: 18.059 },
  { kw: 88, lh: 19.284 },
  { kw: 96, lh: 20.568 },
  { kw: 104, lh: 21.91 },
  { kw: 112, lh: 23.31 },
  { kw: 120, lh: 24.768 },
  { kw: 128, lh: 26.284 },
  { kw: 136, lh: 27.858 },
  { kw: 144, lh: 29.491 },
  { kw: 152, lh: 31.181 },
  { kw: 160, lh: 32.93 },
  { kw: 168, lh: 34.737 },
  { kw: 176, lh: 36.602 },
  { kw: 184, lh: 38.525 },
  { kw: 192, lh: 40.506 },
  { kw: 200, lh: 42.545 },
  { kw: 208, lh: 44.643 },
  { kw: 216, lh: 46.798 },
  { kw: 224, lh: 49.012 },
  { kw: 232, lh: 51.284 },
  { kw: 240, lh: 53.614 },
  { kw: 248, lh: 56.002 },
  { kw: 256, lh: 58.448 },
  { kw: 264, lh: 60.952 },
  { kw: 272, lh: 63.515 },
  { kw: 280, lh: 66.135 },
  { kw: 288, lh: 68.814 },
  { kw: 296, lh: 71.551 },
  { kw: 304, lh: 74.346 },
  { kw: 312, lh: 77.199 },
  { kw: 320, lh: 80.11 },
];

import type {
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
  { hourLabel: '07-08', fixedPct: 0.309, trackerPct: 0.371 },
  { hourLabel: '08-09', fixedPct: 0.619, trackerPct: 0.951 },
  { hourLabel: '09-10', fixedPct: 0.834, trackerPct: 0.991 },
  { hourLabel: '10-11', fixedPct: 0.953, trackerPct: 0.998 },
  { hourLabel: '11-12', fixedPct: 0.976, trackerPct: 1.0 },
  { hourLabel: '12-13', fixedPct: 1.0, trackerPct: 0.996 },
  { hourLabel: '13-14', fixedPct: 0.953, trackerPct: 0.99 },
  { hourLabel: '14-15', fixedPct: 0.881, trackerPct: 0.967 },
  { hourLabel: '15-16', fixedPct: 0.714, trackerPct: 0.943 },
  { hourLabel: '16-17', fixedPct: 0.452, trackerPct: 0.878 },
  { hourLabel: '17-18', fixedPct: 0.160, trackerPct: 0.322 },
];

// Índices (0-based) de HOURLY_SOLAR_CURVES cobertos por cada período de agregação.
export const FULL_SUN_HOUR_INDEXES = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // 08-09 até 16-17
export const LOW_SUN_HOUR_INDEXES = [0, 10]; // 07-08 e 17-18

export const GENERATOR_SPEC: GeneratorSpec = {
  unitPowerKw: 320,
  minLoadFactor: 0.3,
  minLoadKw: 96,
};


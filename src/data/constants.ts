import type {
  GeneratorSpec,
  HourlySolarCurve,
  LoadItem,
} from '../types';

export const CV_TO_KW = 0.736;

export const INITIAL_LOADS: LoadItem[] = [
  { id: '1', name: 'Pivô 1', powerCv: 100, demandFactor: 1.12, enabled: true, horaInicio: 7, horaFim: 18 },
  { id: '2', name: 'Pivô 2', powerCv: 100, demandFactor: 1.12, enabled: true, horaInicio: 7, horaFim: 18 },
  { id: '3', name: 'Pivô 3', powerCv: 75, demandFactor: 1.12, enabled: true, horaInicio: 7, horaFim: 18 },
  { id: '4', name: 'Pivô 4', powerCv: 75, demandFactor: 1.12, enabled: true, horaInicio: 7, horaFim: 18 },
  { id: '5', name: 'Pivô 5', powerCv: 125, demandFactor: 1.12, enabled: true, horaInicio: 7, horaFim: 18 },
  { id: '6', name: 'Pivô 6', powerCv: 100, demandFactor: 1.12, enabled: true, horaInicio: 7, horaFim: 18 },
  { id: '7', name: 'Bomba 1', powerCv: 200, demandFactor: 1.12, enabled: true, horaInicio: 7, horaFim: 18 },
  { id: '8', name: 'Bomba 2', powerCv: 200, demandFactor: 1.12, enabled: true, horaInicio: 7, horaFim: 18 },
 ];

export const HOURLY_SOLAR_CURVES: HourlySolarCurve[] = [
  { hourLabel: '07-08', hour: 7, fixedPct: 0.309, trackerPct: 0.371 },
  { hourLabel: '08-09', hour: 8, fixedPct: 0.619, trackerPct: 0.951 },
  { hourLabel: '09-10', hour: 9, fixedPct: 0.834, trackerPct: 0.991 },
  { hourLabel: '10-11', hour: 10, fixedPct: 0.953, trackerPct: 0.998 },
  { hourLabel: '11-12', hour: 11, fixedPct: 0.976, trackerPct: 1.0 },
  { hourLabel: '12-13', hour: 12, fixedPct: 1.0, trackerPct: 0.996 },
  { hourLabel: '13-14', hour: 13, fixedPct: 0.953, trackerPct: 0.99 },
  { hourLabel: '14-15', hour: 14, fixedPct: 0.881, trackerPct: 0.967 },
  { hourLabel: '15-16', hour: 15, fixedPct: 0.714, trackerPct: 0.943 },
  { hourLabel: '16-17', hour: 16, fixedPct: 0.452, trackerPct: 0.878 },
  { hourLabel: '17-18', hour: 17, fixedPct: 0.160, trackerPct: 0.322 },
];

// Horas inteiras disponíveis para os selects de início/fim de funcionamento das cargas.
export const OPERATING_HOURS = Array.from({ length: 12 }, (_, i) => 7 + i); // 7..18

// Índices (0-based) de HOURLY_SOLAR_CURVES cobertos por cada período de agregação.
export const FULL_SUN_HOUR_INDEXES = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // 08-09 até 16-17
export const LOW_SUN_HOUR_INDEXES = [0, 10]; // 07-08 e 17-18

export const GENERATOR_SPEC: GeneratorSpec = {
  unitPowerKw: 320,
  minLoadFactor: 0.3,
  minLoadKw: 96,
};


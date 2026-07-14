import { useState } from 'react';
import type { LoadItem } from '../types';
import { calcLoadKw } from '../lib/calculations';

interface LoadConfigTableProps {
  loads: LoadItem[];
  onChange: (id: string, patch: Partial<LoadItem>) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

const numberFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 3,
});

export function LoadConfigTable({ loads, onChange, onAdd, onRemove }: LoadConfigTableProps) {
  const [isOpen, setIsOpen] = useState(true);

  const totalSelectedKw = loads
    .filter((load) => load.enabled)
    .reduce((sum, load) => sum + calcLoadKw(load), 0);

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Configuração de cargas
          </span>
        </span>
        <span className="flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-1.5 dark:bg-emerald-950/40">
          <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
            Carga total selecionada
          </span>
          <span className="text-base font-bold tabular-nums text-emerald-900 dark:text-emerald-200">
            {numberFormatter.format(totalSelectedKw)} kW
          </span>
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-slate-100 px-4 pb-4 pt-3 dark:border-slate-800">
          {loads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-slate-500 dark:text-slate-400 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-10 w-10 text-slate-400 dark:text-slate-500 mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <p className="text-sm">Nenhuma carga cadastrada.</p>
              <button
                type="button"
                onClick={onAdd}
                className="mt-3 flex items-center gap-1.5 rounded-md bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-3.5 w-3.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Adicionar Carga
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] table-fixed border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-slate-500 dark:border-slate-700 dark:text-slate-400">
                      <th className="w-14 py-2 pr-2 font-medium">Ativa</th>
                      <th className="py-2 pr-2 font-medium">Carga</th>
                      <th className="w-32 py-2 pr-2 text-right font-medium">Potência (CV)</th>
                      <th className="w-32 py-2 pr-2 text-right font-medium">Fator de demanda</th>
                      <th className="w-28 py-2 pl-2 text-right font-medium">kW</th>
                      <th className="w-16 py-2 text-center font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loads.map((load) => (
                      <tr
                        key={load.id}
                        className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                      >
                        <td className="py-2 pr-2">
                          <input
                            type="checkbox"
                            checked={load.enabled}
                            onChange={(e) => onChange(load.id, { enabled: e.target.checked })}
                            className="h-4 w-4 accent-emerald-600 cursor-pointer"
                            aria-label={`Ativar ${load.name}`}
                          />
                        </td>
                        <td className="py-2 pr-2">
                          <input
                            type="text"
                            value={load.name}
                            onChange={(e) => onChange(load.id, { name: e.target.value })}
                            className="w-full rounded border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 font-medium"
                          />
                        </td>
                        <td className="py-2 pr-2">
                          <input
                            type="number"
                            value={load.powerCv}
                            min={0}
                            onChange={(e) => onChange(load.id, { powerCv: Number(e.target.value) })}
                            className="w-full rounded border border-slate-300 bg-white px-2 py-1 text-right dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                          />
                        </td>
                        <td className="py-2 pr-2">
                          <input
                            type="number"
                            value={load.demandFactor}
                            min={0}
                            step={0.01}
                            onChange={(e) => onChange(load.id, { demandFactor: Number(e.target.value) })}
                            className="w-full rounded border border-slate-300 bg-white px-2 py-1 text-right dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                          />
                        </td>
                        <td className="py-2 pl-2 text-right tabular-nums text-slate-700 dark:text-slate-300">
                          {numberFormatter.format(calcLoadKw(load))}
                        </td>
                        <td className="py-2 text-center">
                          <button
                            type="button"
                            onClick={() => onRemove(load.id)}
                            className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-colors cursor-pointer"
                            title={`Remover ${load.name}`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={onAdd}
                  className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-colors cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Adicionar Carga
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}

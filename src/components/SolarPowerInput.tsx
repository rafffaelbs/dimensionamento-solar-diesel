interface SolarPowerInputProps {
  value: number;
  onChange: (value: number) => void;
  dieselPrice: number;
  onDieselPriceChange: (value: number) => void;
}

export function SolarPowerInput({
  value,
  onChange,
  dieselPrice,
  onDieselPriceChange,
}: SolarPowerInputProps) {
  const isInvalid = value < 0;
  const isDieselPriceInvalid = dieselPrice < 0;

  return (
    <section className="rounded-lg border-2 border-emerald-500 bg-emerald-50 px-4 py-3 shadow-sm dark:border-emerald-600 dark:bg-emerald-950/30">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <label
            htmlFor="solar-power"
            className="text-lg font-semibold text-emerald-900 dark:text-emerald-100"
          >
            Potência solar instalada (kW)
          </label>
          <input
            id="solar-power"
            type="number"
            min={0}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-56 rounded-md border border-emerald-400 bg-white px-4 py-2 text-2xl font-bold tabular-nums text-emerald-900 shadow-inner focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-700 dark:bg-slate-900 dark:text-emerald-100"
          />
          {isInvalid && (
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              A potência solar instalada não pode ser negativa.
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <label
            htmlFor="diesel-price"
            className="text-lg font-semibold text-emerald-900 dark:text-emerald-100"
          >
            Preço do Diesel (R$)
          </label>
          <input
            id="diesel-price"
            type="number"
            min={0}
            step={0.01}
            value={dieselPrice}
            onChange={(e) => onDieselPriceChange(Number(e.target.value))}
            className="w-40 rounded-md border border-emerald-400 bg-white px-4 py-2 text-2xl font-bold tabular-nums text-emerald-900 shadow-inner focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-700 dark:bg-slate-900 dark:text-emerald-100"
          />
          {isDieselPriceInvalid && (
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              O preço do diesel não pode ser negativo.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

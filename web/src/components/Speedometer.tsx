import { useState } from "react";
import { useNuiEvent } from "../utils/useNuiEvent";
import { SemiGauge } from "./ui/SemiGauge";
import {
  PiCarBold,
  PiEngineBold,
  PiGasPumpBold,
  PiSeatbeltBold,
} from "react-icons/pi";

export interface SpeedometerData {
  speed: number;
  rpm: number;
  fuel: number;
  gear: number;
  seatbelt: boolean;
  engineOn: boolean;
  engineHealth: number;
  lightsOn: boolean;
  visible: boolean;
}

/** Cor da barra/valor de RPM baseada no nível (0.0–1.0) */
export function rpmColor(rpm: number): string {
  if (rpm > 0.85) return "#ef4444";
  if (rpm > 0.7) return "#f59e0b";
  return "#38bdf8";
}

/** Cor dos segmentos de combustível baseada no nível (0.0–1.0) */
export function fuelColor(fuel: number): string {
  if (fuel < 0.15) return "#ef4444";
  if (fuel < 0.3) return "#f59e0b";
  return "#34d399";
}

/** Cor da barra de saúde do motor baseada no nível (0.0–1.0) */
export function engineColor(health: number): string {
  if (health < 0.3) return "#ef4444";
  if (health < 0.6) return "#f59e0b";
  return "#34d399";
}

/** Retorna 'R' para ré, ou o número da marcha como string */
export function gearLabel(gear: number): string {
  return gear === 0 ? "R" : String(gear);
}

export function Speedometer() {
  const [speedometerData, setSpeedometerData] = useState<SpeedometerData>({
    speed: 999,
    rpm: 1,
    fuel: 0,
    gear: 1,
    seatbelt: false,
    engineOn: true,
    engineHealth: 1.0,
    lightsOn: false,
    visible: true,
  });

  useNuiEvent<Partial<SpeedometerData>>("updateSpeedometer", (data) => {
    setSpeedometerData((prev) => ({ ...prev, ...data }));
  });

  return (
    <div className="absolute bottom-5 right-5 p-5 flex flex-col gap-2 w-60 items-end">
      {/* Speed */}
      <div className="flex items-center justify-between w-full">
        <div className="font-oswald font-bold text-white leading-none text-shadow-black/30 text-shadow-lg flex items-end">
          <h1 className="text-[52pt]">{Math.round(speedometerData.speed)}</h1>
        </div>

        <div className="text-3xl font-oswald font-bold text-white ml-2 text-shadow-black/30 text-shadow-lg flex flex-col items-end">
          <h1>{gearLabel(speedometerData.gear)}</h1>
          <h1>KM/H</h1>
        </div>
      </div>

      {/* RPM */}
      <div className="bg-black/80 h-2 w-full rounded">
        <div
          className="h-full rounded transition-colors"
          style={{
            width: `${(speedometerData.rpm / 1.1) * 100}%`,
            backgroundColor: rpmColor(speedometerData.rpm),
          }}
        ></div>
      </div>

      <div className="flex gap-3 items-center w-full justify-between">
        {/* Engine */}
        <div className="flex items-center justify-center relative">
          <PiEngineBold
            color={engineColor(speedometerData.engineHealth)}
            className="absolute top-[50%]"
          />
          <SemiGauge
            value={speedometerData.engineHealth}
            color={engineColor(speedometerData.engineHealth)}
          />
        </div>
        {/* Fuel */}
        <div className="flex items-center justify-center relative">
          <PiGasPumpBold
            color={fuelColor(speedometerData.fuel)}
            className="absolute top-[50%]"
          />
          <SemiGauge
            value={speedometerData.fuel}
            color={fuelColor(speedometerData.fuel)}
          />
        </div>
        <PiSeatbeltBold
          color={speedometerData.seatbelt ? "#34d399" : "#ef4444"}
          size={22}
        />

        <PiCarBold
          color={speedometerData.engineOn ? "#34d399" : "#ef4444"}
          size={22}
        />
      </div>
    </div>
  );
}

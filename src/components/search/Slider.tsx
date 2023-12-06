import React from "react";
import * as S from "@radix-ui/react-slider";
import { useDebounce } from "@uidotdev/usehooks";

interface Props {
  min: number;
  max: number;
  step: number;
  transform?: (e: number) => string;
}

interface RangeSlider extends Props {
  kind: "range";
  value: [number, number];
  onChange: (e: [number, number]) => void;
}

interface SingleSlider extends Props {
  kind: "single";
  value: number;
  onChange: (e: number) => void;
}

function SliderThumb({ value }: { value: string }) {
  return (
    <S.Thumb className="relative block h-4 w-4 rounded-[10px] border border-nobel-500 bg-white focus:border-none focus:shadow-[0_0_0_2px] focus:outline-none">
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-nobel-500 bg-white px-1 py-0.5 text-sm text-nobel-500">
        {value}
      </span>
    </S.Thumb>
  );
}

export default function Slider({
  value,
  min,
  max,
  step,
  transform,
  onChange,
  kind,
}: SingleSlider | RangeSlider) {
  const valueToString = transform ?? ((e: number) => String(e));

  const [localValue, setLocalValue] = React.useState<number[]>(
    kind === "range" ? value : [value],
  );

  const [localMin, localMax] =
    kind === "range"
      ? (localValue as [number, number])
      : ([localValue[0], localValue[0]] as [number, number]);

  const [lowerPercent, rangePercent] =
    kind === "range"
      ? [
          Math.round(((localMin - min) / (max - min)) * 100),
          Math.round(((localMax - localMin) / (max - min)) * 100),
        ]
      : [0, Math.round(((localMin - min) / (max - min)) * 100)];

  function handlerFactory(f: (_: number[]) => void) {
    return kind === "range"
      ? ([a, b]: number[]) => {
          if (a === undefined || b === undefined) return;

          f([Math.min(a, b), Math.max(a, b)]);
        }
      : ([v]: number[]) => v !== undefined && f([v]);
  }

  const debouncedValue = useDebounce(localValue, 1000);
  React.useEffect(() => {
    kind === "range" ? onChange([localMin, localMax]) : onChange(localMin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className="flex space-x-2">
      <S.Root
        className="relative col-span-2 mt-7 flex h-5 w-full touch-none select-none items-center"
        min={min}
        max={max}
        step={step}
        value={localValue}
        onValueChange={handlerFactory(setLocalValue)}
      >
        <S.Track className="relative h-[4px] w-full rounded-full border border-nobel-500 bg-white">
          <S.Range className="absolute h-full rounded-full bg-white" />
          <div
            className="absolute h-full bg-nobel-500"
            style={{ left: `${lowerPercent}%`, width: `${rangePercent}%` }}
          />
        </S.Track>
        <SliderThumb value={valueToString(localMin)} />
        {kind === "range" && <SliderThumb value={valueToString(localMax)} />}
      </S.Root>
    </div>
  );
}

import React from "react";
import * as S from "@radix-ui/react-slider";
import * as L from "@radix-ui/react-label";

interface Props {
  min: number;
  max: number;
  step: number;
  transform?: (e: number) => string;
}

interface RangeSlider extends Props {
  value: [number, number];
  onChange: (e: [number, number]) => void;
}

interface SingleSlider extends Props {
  value: number;
  onChange: (e: number) => void;
}

const SliderThumb = () => (
  <S.Thumb className="relative block h-4 w-4 rounded-[10px] border-[1px] border-nobel-500 bg-white focus:border-none focus:shadow-[0_0_0_2px] focus:outline-none" />
);

export default function Slider({
  value,
  min,
  max,
  step,
  transform,
  onChange,
}: SingleSlider | RangeSlider) {
  const [localValue, setLocalValue] = React.useState(value);

  const isRange = typeof value !== "number";
  const [localLow, localHigh] = isRange
    ? (localValue as [number, number])
    : ([localValue, localValue] as [number, number]);

  const [lowerPercent, rangePercent] = isRange
    ? [
        Math.round(((localLow - min) / (max - min)) * 100),
        Math.round(((localHigh - localLow) / (max - min)) * 100),
      ]
    : [0, Math.round(((localLow - min) / (max - min)) * 100)];

  function handlerFactory(
    f: ((_: number) => void) | ((_: [number, number]) => void),
  ) {
    return isRange
      ? ([a, b]: number[]) => {
          // @ts-expect-error value change is [number, number]
          const low = Math.min(a, b);
          // @ts-expect-error value change is [number, number]
          const high = Math.max(a, b);

          // @ts-expect-error if isRange, f is (_: [number, number]) => void
          f([low, high]);
        }
      : // @ts-expect-error otherwise f is (_: number) => void
        ([v]: number[]) => f(v);
  }

  return (
    <div className="flex space-x-3">
      <L.Root className="whitespace-nowrap text-sm text-nobel-600">
        {transform ? transform(min) : min}
      </L.Root>
      <S.Root
        className="relative col-span-2 flex h-5 w-full touch-none select-none items-center"
        min={min}
        max={max}
        step={step}
        value={
          isRange ? (localValue as [number, number]) : [localValue as number]
        }
        onValueChange={handlerFactory(setLocalValue)}
        onValueCommit={handlerFactory(onChange)}
      >
        <S.Track className="relative h-[4px] w-full rounded-full border-[1px] border-nobel-500 bg-white">
          <S.Range className="absolute h-full rounded-full bg-white" />
          <div
            className="absolute h-full bg-nobel-500"
            style={{ left: `${lowerPercent}%`, width: `${rangePercent}%` }}
          />
        </S.Track>
        <SliderThumb />
        {isRange && <SliderThumb />}
      </S.Root>
      <L.Root className="whitespace-nowrap text-sm text-nobel-600">
        {transform ? transform(max) : max}
      </L.Root>
    </div>
  );
}

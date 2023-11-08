import React from "react";
import * as S from "@radix-ui/react-slider";
import * as L from "@radix-ui/react-label";

interface Props {
  value?: [number, number];
  min: number;
  max: number;
  step: number;
  onChange: (e: [number, number]) => void;
  transform?: (e: number) => string;
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
}: Props) {
  const [lower, upper] = value ?? [min, max];

  const lowerPercent = Math.round(((lower - min) / (max - min)) * 100);
  const rangePercent = Math.round(((upper - lower) / (max - min)) * 100);

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
        value={[lower, upper]}
        onValueChange={([l, u]) =>
          onChange([Math.min(l!, u!), Math.max(l!, u!)])
        }
      >
        <S.Track className="relative h-[4px] w-full rounded-full border-[1px] border-nobel-500 bg-white">
          <S.Range className="absolute h-full rounded-full bg-white" />
          <div
            className="absolute h-full bg-nobel-500"
            style={{ left: `${lowerPercent}%`, width: `${rangePercent}%` }}
          />
        </S.Track>
        <SliderThumb />
        <SliderThumb />
      </S.Root>
      <L.Root className="whitespace-nowrap text-sm text-nobel-600">
        +{transform ? transform(max) : max}
      </L.Root>
    </div>
  );
}

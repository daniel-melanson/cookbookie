import React from "react";
import * as S from "@radix-ui/react-slider";
import * as L from "@radix-ui/react-label";

interface Props {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (e: number) => void;
  transform?: (e: number) => string;
}

export default function Slider({
  value,
  min,
  max,
  step,
  transform,
  onChange,
}: Props) {
  const [showValue, setShowValue] = React.useState(false);

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
        value={[value]}
        onValueChange={(e) => {
          setShowValue(true);
          onChange(e[0]!);
        }}
        onValueCommit={() => setShowValue(false)}
        onBlur={() => setShowValue(false)}
      >
        <S.Track className="relative h-[4px] w-full rounded-full border-[1px] border-nobel-500 bg-white">
          <S.Range className="absolute h-full rounded-full bg-white" />
        </S.Track>
        <S.Thumb
          className="relative block h-4 w-4 rounded-[10px] bg-white shadow-[0_2px_4px] focus:shadow-[0_0_0_2px] focus:outline-none"
          aria-label="Volume"
        >
          {showValue && (
            <p className="absolute left-1/2 -translate-x-1/2 -translate-y-8 whitespace-nowrap rounded bg-white px-1 text-center font-bold text-nobel-500 shadow-[0_2px_4px]">
              {transform ? transform(value) : value}
            </p>
          )}
        </S.Thumb>
      </S.Root>
      <L.Root className="whitespace-nowrap text-sm text-nobel-600">
        {transform ? transform(max) : max}
      </L.Root>
    </div>
  );
}

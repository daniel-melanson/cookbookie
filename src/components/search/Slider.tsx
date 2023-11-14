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
  kind: "range";
  value: [number, number];
  onChange: (e: [number, number]) => void;
}

interface SingleSlider extends Props {
  kind: "single";
  value: number;
  onChange: (e: number) => void;
}

function SliderThumb({
  value,
  onFocus,
  shown,
  onBlur,
}: {
  value: string;
  shown?: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <S.Thumb
      onFocus={onFocus}
      onBlur={onBlur}
      className="relative block h-4 w-4 rounded-[10px] border-[1px] border-nobel-500 bg-white focus:border-none focus:shadow-[0_0_0_2px] focus:outline-none"
    >
      {shown && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-white px-1 py-0.5 text-sm text-nobel-500">
          {value}
        </span>
      )}
    </S.Thumb>
  );
}

const classify = (a: number, b: number) => [Math.min(a, b), Math.max(a, b)];

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
  const [shownIndex, setShownIndex] = React.useState(-1);

  const [localLow, localHigh] =
    kind === "range"
      ? (localValue as [number, number])
      : ([localValue[0], localValue[0]] as [number, number]);

  const reportChange = () =>
    kind === "range" ? onChange([localLow, localHigh]) : onChange(localLow);

  const [lowerPercent, rangePercent] =
    kind === "range"
      ? [
          Math.round(((localLow - min) / (max - min)) * 100),
          Math.round(((localHigh - localLow) / (max - min)) * 100),
        ]
      : [0, Math.round(((localLow - min) / (max - min)) * 100)];

  function handlerFactory(f: (_: number[]) => void) {
    return kind === "range"
      ? ([a, b]: number[]) => {
          if (a === undefined || b === undefined) return;

          f(classify(a, b));
        }
      : ([v]: number[]) => v !== undefined && f([v]);
  }

  return (
    <div className="flex space-x-3">
      <L.Root className="whitespace-nowrap text-sm text-nobel-600">
        {valueToString(min)}
      </L.Root>
      <S.Root
        className="relative col-span-2 flex h-5 w-full touch-none select-none items-center"
        min={min}
        max={max}
        step={step}
        value={localValue}
        onValueChange={handlerFactory(setLocalValue)}
        onValueCommit={() => reportChange()}
      >
        <S.Track className="relative h-[4px] w-full rounded-full border-[1px] border-nobel-500 bg-white">
          <S.Range className="absolute h-full rounded-full bg-white" />
          <div
            className="absolute h-full bg-nobel-500"
            style={{ left: `${lowerPercent}%`, width: `${rangePercent}%` }}
          />
        </S.Track>
        <SliderThumb
          onFocus={() => setShownIndex(0)}
          onBlur={() => {
            if (shownIndex === 0) {
              setShownIndex(-1);
            }
          }}
          shown={shownIndex === 0}
          value={valueToString(localLow)}
        />
        {kind === "range" && (
          <SliderThumb
            onFocus={() => setShownIndex(1)}
            onBlur={() => {
              if (shownIndex === 1) {
                setShownIndex(-1);
              }
            }}
            shown={shownIndex === 1}
            value={valueToString(localHigh)}
          />
        )}
      </S.Root>
      <L.Root className="whitespace-nowrap text-sm text-nobel-600">
        {valueToString(max)}
      </L.Root>
    </div>
  );
}

export function formatTime(minutes: number, length: "short" | "long") {
  const [hourLabel, minuteLabel] =
    length === "short" ? ["hr", "min"] : [" hour", " minute"];

  function join(value: number, label: string) {
    return value > 1 && length === "long"
      ? `${value}${label}s`
      : `${value}${label}`;
  }

  if (minutes < 60) return join(minutes, minuteLabel);

  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;

  const separator = length === "long" ? " and " : " ";

  return remainingMins > 0
    ? `${join(hours, hourLabel)}${separator}${join(remainingMins, minuteLabel)}`
    : join(hours, hourLabel);
}

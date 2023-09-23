import React from "react";
import Link from "next/link";

interface HoverIconProps {
  href: string;
  line: React.ReactElement;
  fill: React.ReactElement;
}

export default function HoverIcon(props: HoverIconProps) {
  const baseClassNames = "absolute top-1/2 -translate-y-1/2 left-0 block";
  return (
    <Link className="hover-icon relative h-8 w-8" href={props.href}>
      {React.cloneElement(props.line, {
        className: `${baseClassNames} line`,
      })}
      {React.cloneElement(props.fill, {
        className: `${baseClassNames} fill`,
      })}
    </Link>
  );
}

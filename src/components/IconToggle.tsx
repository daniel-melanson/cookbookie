import React from "react";
import classNames from "classnames";

interface Props {
  line: React.ReactElement;
  fill: React.ReactElement;
  className?: string;
}

export default function IconToggle(props: Props) {
  const [toggled, setToggled] = React.useState(false);
  const [mouseLeft, setMouseLeft] = React.useState(true);

  const baseClassNames =
    "absolute top-1/2 h-full text-orange-500 w-full -translate-y-1/2 left-0 block";

  return (
    <button
      className={classNames("icon-link h-8 w-8", props.className)}
      onClick={() => {
        setToggled(!toggled);
        setMouseLeft(false);
      }}
      onMouseLeave={() => setMouseLeft(true)}
    >
      <div className="relative h-full w-full">
        {mouseLeft ? (
          <>
            {React.cloneElement(props.line, {
              className: `${baseClassNames} ${toggled ? "fill" : "line"}`,
            })}
            {React.cloneElement(props.fill, {
              className: `${baseClassNames} ${toggled ? "line" : "fill"}`,
            })}
          </>
        ) : (
          React.cloneElement(toggled ? props.fill : props.line, {
            className: baseClassNames,
          })
        )}
      </div>
    </button>
  );
}

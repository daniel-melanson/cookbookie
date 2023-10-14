interface Props {
  prompt: string;
  action: string;
  onClick: () => void;
}

export default function AuthFormSwitch({ onClick, prompt, action }: Props) {
  return (
    <div className="mt-2 text-xs font-light">
      <p>
        {prompt + " "}
        <span
          className="font-bold hover:cursor-pointer hover:underline"
          onClick={() => onClick()}
        >
          {action}
        </span>
        .
      </p>
    </div>
  );
}

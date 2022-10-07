import "./Button.css";

export default function Button(props: {
  name: string;
  onClick: (e: any) => void;
}) {
  return (
    <div className="buttonOuter" onClick={props.onClick}>
      <div className="buttonInner">{props.name}</div>
    </div>
  );
}


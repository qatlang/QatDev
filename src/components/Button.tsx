import "./Button.css";

export default function Button(props: {
  className?: string;
  content: string | JSX.Element;
  trailing?: string | JSX.Element;
  onClick: (e: any) => void;
}) {
  return (
    <div className={props.className ?? "buttonOuter"} onClick={props.onClick}>
      <div className="buttonInner">
        {props.content}
        {props.trailing}
      </div>
    </div>
  );
}


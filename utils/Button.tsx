import styles from "styles/Button.module.css";

export default function Button(props: {
  className?: string;
  content: string | JSX.Element;
  trailing?: string | JSX.Element;
  onClick: (e: any) => void;
}) {
  return (
    <div
      className={
        styles.buttonOuter +
        (props.className != undefined ? " " + props.className : "")
      }
      onClick={props.onClick}
    >
      <div className={styles.buttonInner}>
        {props.content}
        {props.trailing}
      </div>
    </div>
  );
}


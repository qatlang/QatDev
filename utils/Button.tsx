import styles from "styles/Button.module.css";

export default function Button(props: {
  className?: string;
  onClick: (e: any) => void;
  children: any;
}) {
  return (
    <div
      className={
        styles.buttonOuter +
        (props.className != undefined ? " " + props.className : "")
      }
      onClick={props.onClick}
    >
      <div className={styles.buttonInner}>{props.children}</div>
    </div>
  );
}


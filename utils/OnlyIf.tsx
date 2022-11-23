export default function OnlyIf(props: {
  If: boolean;
  children: any;
}): JSX.Element {
  return props.If ? <>{props.children}</> : <></>;
}

export function valueIf<T>(cond: boolean, value: T): T | undefined {
  return cond ? value : undefined;
}

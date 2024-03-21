import dynamic from "next/dynamic";
import { ReactNode } from "react";
import * as rdd from "react-device-detect";

export default dynamic(() => Promise.resolve(Device), { ssr: false });

interface DeviceProps {
  children: (props: typeof rdd) => ReactNode;
}
function Device(props: DeviceProps) {
  return <div className="device-layout-component">{props.children(rdd)}</div>;
}


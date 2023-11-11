export default function Button(props: {
  className?: string;
  style?: string;
  theme?: "normal" | "special";
  onClick: (e: any) => void;
  children: any;
}) {
  const themes = {
    special:
      "flex flex-row align-middle justify-center text-center items-center cursor-pointer h-[100%] w-fit py-2 md:py-[0.62rem] lg:py-2 xl:py-3 px-4 md:px-5 lg:px-5 xl:px-6 rounded-lg sm:mx-2 mx-1 lg:text-2xl md:text-[1.6rem] sm:text-2xl text-xl font-bold text-black bg-[#fec033] hover:bg-white active:bg-[#bbbbbb] select-none transition-colors",
    normal:
      "flex flex-row align-middle justify-center text-center items-center cursor-pointer h-[100%] w-fit py-2 md:py-[0.62rem] lg:py-2 xl:py-3 px-4 md:px-5 lg:px-5 xl:px-6 rounded-lg sm:mx-2 mx-1 lg:text-2xl md:text-[1.6rem] sm:text-2xl text-xl font-bold text-white bg-[#128f5f] hover:bg-white active:bg-[#bbbbbb] hover:text-black select-none transition-colors",
  };

  return (
    <div
      className={
        (props.className ?? themes[props.theme ?? "normal"]) +
        (props.style ? " " + props.style : "")
      }
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}


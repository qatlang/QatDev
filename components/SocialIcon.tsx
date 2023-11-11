import Image, { StaticImageData } from "next/image";

export function SocialIcon(props: {
  color?: "normal" | "discord";
  icon: StaticImageData;
  link: string;
}) {
  const colorVars = {
    normal:
      "flex flex-col justify-center align-middle cursor-pointer mx-2 px-2 transition-all border-[3px] border-transparent hover:border-[#ffffff55] md:rounded-lg rounded-xl md:h-12 md:w-12 sm:h-14 sm:w-14 h-14 w-14 bg-[#333333]",
    discord:
      "flex flex-col justify-center align-middle cursor-pointer mx-2 px-2 transition-all border-[3px] border-transparent hover:border-[#ffffff55] md:rounded-lg rounded-xl md:h-12 md:w-12 sm:h-14 sm:w-14 h-14 w-14 bg-[#5865f2]",
  };
  return (
    <div className={colorVars[props.color ?? "normal"]}>
      <a href={props.link} rel="noopener noreferrer" target="_blank">
        <Image src={props.icon} alt="github-icon" />
      </a>
    </div>
  );
}


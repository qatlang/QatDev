import localFont from "next/font/local";
import { useEffect, useState } from "react";

const IosevkaFont = localFont({
	src: "../fonts/IosevkaNerdFont-Regular.ttf",
	display: "swap",
});

export default function Playground() {
	const [code, setCode] = useState(
		'pub main -> int [\n   say "Hello, World!".\n   give 0.\n]',
	);
	const [savedCode, setSavedCode] = useState("");
	const [isSaved, setIsSaved] = useState<boolean>(false);
	useEffect(() => {
		if (savedCode === code) {
			setIsSaved(true);
		} else {
			setIsSaved(false);
		}
	}, [code, savedCode]);
	return (
		<div className="flex flex-col flex-grow w-[100%] px-3 pb-3">
			<title>Playground | QAT Programming Language</title>
			<div
				className="w-fit rounded-lg px-3 transition-colors font-bold"
				style={{
					color: isSaved ? "white" : "black",
					backgroundColor: isSaved ? "#3f8b62" : "#ffc822",
				}}
			>
				{isSaved ? "Saved" : "Unsaved"}
			</div>
			<div className="mt-3 flex flex-row flex-grow rounded-lg border-solid border-[#777777] dark:border-[#444444] border-2">
				<div
					className={
						"p-4 border-2 border-solid border-transparent flex flex-col text-xl text-[#666666] dark:text-[#888888] select-none whitespace-pre " +
						IosevkaFont.className
					}
				>
					{code.split("\n").flatMap((it, ind) => (
						<div key={ind}>
							{ind.toString().padStart(3, " ").slice(0, 3)}
						</div>
					))}
				</div>
				<textarea
					className={
						"p-4 rounded-tr-lg rounded-br-lg text-xl flex flex-grow resize-none bg-[#dce7f9] dark:bg-[#00000077]  text-[#000000] dark:text-[#ddddff] caret-black dark:caret-styleGreen border-l-2 border-[#999999] dark:border-[#222222] focus:border-styleGreen dark:focus:border-styleGreen transition-colors outline-none focus:outline-none " +
						IosevkaFont.className
					}
					autoFocus
					defaultValue={code}
					onChange={(val) => {
						setCode(val.target.value);
					}}
				></textarea>
			</div>
		</div>
	);
}

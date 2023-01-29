import { JetBrains_Mono, Poppins, Roboto } from "@next/font/google";

export enum FontList {
	jetbrainsMono = 'JetBrains Mono',
	poppins = 'Poppins'
}

const jetbrainsMonoNormal = JetBrains_Mono({
	preload: true,
	weight: "400",
	subsets: ["latin"],
});

const jetbrainsMonoBold = JetBrains_Mono({
	preload: true,
	weight: "700",
	subsets: ["latin"],
});

const poppinsBold = Poppins({
	preload: true,
	weight: "700",
	subsets: ["latin"]
});

const robotoNormal = Roboto({
	preload: true,
	weight: '400',
	subsets: ['latin']
});

const fonts = {
	jetbrainsMono: {
		normal: jetbrainsMonoNormal.className,
		bold: jetbrainsMonoBold.className,
	},
	poppins: {
		bold: poppinsBold.className,
	},
	roboto: {
		normal: robotoNormal.className,
	}
};

export default fonts;
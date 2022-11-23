import { Fira_Code, Poppins, Roboto } from "@next/font/google";

const firaCodeNormal = Fira_Code({
   preload: true,
   weight: "400",
   subsets: ["latin"],
});

const firaCodeBold = Fira_Code({
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
   firaCode: {
      normal: firaCodeNormal.className,
      bold: firaCodeBold.className,
   },
   poppins: {
      bold: poppinsBold.className,
   },
   roboto: {
      normal: robotoNormal.className,
   }
};

export default fonts;
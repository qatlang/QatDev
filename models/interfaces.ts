export interface ILanguageRelease {
   version: {
      value: string,
      isPrerelease: boolean,
      prerelease: string
   },
   title: string,
   content: string,
   files: {
      platform: string,
      architecture: string,
      path: string,
   }[],
   index: number,
   createdAt: string,
}

export interface ILanguageExample {
   title: string,
   content: string,
}
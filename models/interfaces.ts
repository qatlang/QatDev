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

export interface IProjectStats {
   data: {
      decimal: string;
      digital: string;
      is_up_to_date: boolean;
      percent_calculated: number;
      project: string;
      range: {
         end: string;
         end_date: string;
         end_text: string;
         start: string;
         start_date: string;
         start_text: string;
         timezone: string;
      };
      text: string;
      timeout: number;
      total_seconds: number;
   }
}

export interface ITimeStats {
   compiler: IProjectStats,
   website: IProjectStats,
   server: IProjectStats,
   vscode: IProjectStats,
   docs: IProjectStats,
}
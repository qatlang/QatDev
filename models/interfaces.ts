export interface ILanguageRelease {
   releaseID: string,
   version: {
      value: string,
      isPrerelease: boolean,
      prerelease: string
   },
   title: string,
   content: string,
   files: {
      id: string,
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

export interface IGitlabRepositoryPushEvent {
   object_kind: string,
   event_name: string,
   before: string,
   after: string,
   ref: string,
   checkout_sha: string,
   user_id: number,
   user_name: string,
   user_username: string,
   user_email: string,
   user_avatar: string,
   project_id: number,
   project: {
      id: number,
      name: string,
      description: string,
      web_url: string,
      avatar_url: null,
      git_ssh_url: string,
      git_http_url: string,
      namespace: string,
      visibility_level: number,
      path_with_namespace: string,
      default_branch: string,
      homepage: string,
      url: string,
      ssh_url: string,
      http_url: string
   },
   repository: {
      name: string,
      url: string,
      description: string,
      homepage: string,
      git_http_url: string,
      git_ssh_url: string,
      visibility_level: number
   },
   commits:
   {
      id: string,
      message: string,
      title: string,
      timestamp: string,
      url: string,
      author: {
         name: string,
         email: string
      },
      added: string[],
      modified: string[],
      removed: string[]
   }[],
   total_commits_count: number
}
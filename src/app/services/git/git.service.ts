import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {flatMap, mergeMap, reduce} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const username = 'darendal';
const rootURL = 'https://api.github.com';
const fetchRepos = `${rootURL}/users/${username}/repos`;
const getLanguageStats = `${rootURL}/repos/${username}/`;

const Stats =  new Map([
  ['TypeScript', 462228],
  ['HTML', 60997],
  ['Dart', 4431],
  ['JavaScript', 31817],
  ['CSS', 67271],
  ['Java', 60222],
  ['C#', 386951],
  ['ASP', 221],
  ['Shell', 4314],
  ['Rust', 33635]
]);

export interface Owner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Repo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description?: any;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: Date;
  updated_at: Date;
  pushed_at: Date;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage?: any;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url?: any;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license?: any;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

@Injectable({
  providedIn: 'root'
})
export class GitService {

  gitStats: Map<string, number> = Stats;

  constructor(private http: HttpClient, ) {}

  getStats(): Observable<Map<string, number>> {

    return of(this.gitStats);

    const resp = this.http.get<Repo[]>(fetchRepos).pipe(
      flatMap(r => r),
      mergeMap((repo: Repo) => this.http.get<Map<string, number>>(`${getLanguageStats}${repo.name}/languages`)),
      reduce((acc: Map<string, number>, y: Map<string, number>) => {
        for (const key of Array.from( Object.keys(y)) ) {

          let existing = acc[key];
          let newVal = y[key];

          existing = existing ? existing : 0;
          newVal = newVal ? newVal : 0;

          acc[key] = newVal + existing;
        }
        return acc;
      })
    );
    resp.subscribe((response: Map<string, number>) => this.gitStats = response);
    return resp;
  }

}

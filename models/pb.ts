import PocketBase from "pocketbase";
import { Env } from "./env";

const pb = new PocketBase(Env.pocketbaseURL())

export enum Tables {
	images = "images",
	releases = "releases",
	story = "story",
	commits = "commits",
}

export default pb;
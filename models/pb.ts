import PocketBase from "pocketbase";
import { Env } from "./env";

const pb = new PocketBase(Env.pocketbaseURL())

export default pb;
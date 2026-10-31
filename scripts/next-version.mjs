#!/usr/bin/env node
// Next calver tag: vYYYY.MM.N, where N counts this month's existing tags from 0.
import { execFileSync } from "node:child_process";

const now = new Date();
const prefix = `v${now.getUTCFullYear()}.${String(now.getUTCMonth() + 1).padStart(2, "0")}.`;
const tags = execFileSync("git", ["tag", "--list", `${prefix}*`], { encoding: "utf8" }).split("\n").filter(Boolean);
console.log(`${prefix}${tags.length}`);

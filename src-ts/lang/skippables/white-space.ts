import { Skippable } from "../../model/skippable.js";

export const whiteSpacePattern = new Skippable(/^\s+/, '\x20\t\n');

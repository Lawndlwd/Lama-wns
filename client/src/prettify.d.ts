import type { ShowdownExtension } from "showdown";

declare module "showdown-youtube";
declare function showdownYoutube(): ShowdownExtension[];
export = showdownYoutube;

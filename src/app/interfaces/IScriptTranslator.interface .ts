import { IScript } from "./IScript .interface";


 export interface IScriptTranslator {
    getPacketsFromText(text: string): IScript[];
  }
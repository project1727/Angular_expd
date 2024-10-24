import { eFrequencyUnit, eImgRes, eScriptType } from "../enums/enum";
import { IScript } from "../interfaces/IScript .interface";


export class SysCreator implements IScript {
  
    get scriptType(): eScriptType {
        return eScriptType.Sys;
    }


    freq!: number;
    frequencyUnit!: eFrequencyUnit;
    tCO!: number;
    lowTime!: number;
    highTime!: number;
    tSU!: number;
    tCAS!: number;
    tIMG!: number;
    resImg!: eImgRes;
    openDrainEnable!: boolean;
    universaltIMGEnable!: boolean;

   
}

import { eACKCycle, eI2CMode, eImgRes, eScriptType } from "../enums/enum";
import { IScript } from "../interfaces/IScript .interface";

export class SysExtendedCreator implements IScript {
  
    get scriptType(): eScriptType {
        return eScriptType.SysExtended;
    }

    tSU_STA!: number;
    tSU_STO!: number;
    tSU_DAT!: number;

    I2CMode!: eI2CMode;
    ACKCycle!: eACKCycle;
    IBIAbortCount!: number;

    I3CAddressMode!: eI2CMode;
    Trans_count!: number;
    AckCount!: number;

    tIMEDReset!: number;
    timedResetUnit!: eImgRes;

    tSR!: number;
    tSRUnit!: eImgRes;

    IBI_Stop!: number;
}

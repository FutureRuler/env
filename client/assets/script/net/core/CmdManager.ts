import Request1001 from "../protocol/Request1001";
import Response1001 from "../protocol/Response1001";
import Response from "../protocol/Response";
import Request from "../protocol/Response";
import { CNet } from "./Network"

export interface CmdObject {
    callBack: Function;
}

export interface CmdArr {
    [protocol: number]: CmdObject[];
}

export class CmdManager {
    // 单例
    private static _inst: CmdManager;
    public static get inst() {
        return CmdManager._inst || (CmdManager._inst = new CmdManager());
    }

    private m_events: CmdArr = {};

    executeResponse(response: Response, callBack: Function) {
        let protocol: number = response.getCmdId();
        if (!this.m_events[protocol]) {
            this.m_events[protocol] = [];
        }
        let cmdObject: CmdObject = { callBack };
        this.m_events[protocol].push(cmdObject);
        CNet.send(protocol, response);
    }

    executeRequest(data: string) {
        let splitted = data.split("-");
        let cmdId = splitted[0];
        let message = splitted[1];
        let request: Request = JSON.parse(message);
        let cmdObjects = this.m_events[cmdId];
        for(let i=0;i<cmdObjects.length;i++){
            let cmdObjectCallBack = cmdObjects[i].callBack;
            cmdObjectCallBack.call(cmdObjectCallBack,request);
            cmdObjects.splice(i,1);
            i--;
        }
    }

}
export var cmdManager = CmdManager.inst;
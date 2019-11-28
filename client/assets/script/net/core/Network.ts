import { cmdManager } from "./CmdManager";
import Response from "../protocol/Response";
const { ccclass, property } = cc._decorator;

@ccclass
export class Network {
    // 单例
    private static _inst: Network;
    private static url: string;
    private sentTime = 3;
    private reConnectTimeInterval =2000;
    public static get inst() {
        return Network._inst || (Network._inst = new Network());
    }

    public connect(url: string) {
        Network.url = url;
    }

    public send( response: Response) {
        let msg = "";
        for (let i = 0; i < response.getParameter().length; i++) {
            msg = msg + "&" + response.getParameter()[i];
        }
        console.log("发送消息为：" + Network.url + response.getUrlParameter() + "?"  + msg);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', Network.url + response.getUrlParameter() + "?"  + msg, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                CNet.sentTime = 3;
                console.log("接收消息为" + this.responseText);
                cmdManager.executeRequest(this.responseText);
            }else{
                if(CNet.sentTime>0){
                    CNet.sentTime = CNet.sentTime-1;
                    setTimeout(() => {
                        CNet.send(response);
                    }, CNet.reConnectTimeInterval);
                }
            }
        };
    }


}
export var CNet = Network.inst;
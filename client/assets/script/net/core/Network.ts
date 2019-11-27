import { cmdManager } from "./CmdManager";
import Response from "../protocol/Response";
const { ccclass, property } = cc._decorator;

@ccclass
export class Network {
    // 单例
    private static _inst: Network;
    private static url: string;
    public static get inst() {
        return Network._inst || (Network._inst = new Network());
    }

    public connect(url: string) {
        Network.url = url;
    }

    public send(protocol: number, response: Response) {
        let msg = "";
        for (let i = 0; i < response.getParameter().length; i++) {
            msg = msg + "&" + response.getParameter()[i];
        }
        console.log("发送消息为：" + Network.url + response.getUrlParameter() + "?" + "protocol=" + response.getCmdId() + msg);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', Network.url + response.getUrlParameter() + "?" + "protocol=" + response.getCmdId() + msg, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                console.log("接收消息为" + this.responseText);
                cmdManager.executeRequest(this.responseText);
            }
        };
    }


}
export var CNet = Network.inst;
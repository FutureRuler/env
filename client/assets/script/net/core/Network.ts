import { cmdManager } from "./CmdManager";
import Response from "../protocol/Response";
const { ccclass, property } = cc._decorator;

@ccclass
export class Network {
    // 单例
    private static _inst: Network;
    private static xhr: XMLHttpRequest;
    private static url: string;
    public static get inst() {
        Network.xhr = new XMLHttpRequest();
        return Network._inst || (Network._inst = new Network());
    }

    public connect(url: string) {
        Network.url = url;
    }

    public send(protocol: number, response: Response) {
        let msg = "";
        console.log(response.getCmdId());
        console.log(response.getParameter());
        for (let i = 0; i < response.getParameter().length; i++) {
            msg = msg + "&" + response.getParameter()[i];
        }
        console.log("发送消息为：" + Network.url + "?" + "protocol=" + response.getCmdId() + msg);
        Network.xhr.open('POST', Network.url + "?" + "protocol=" + response.getCmdId() + msg, true);
        Network.xhr.send();
        this.receive();
    }

    private receive() {
        Network.xhr.onreadystatechange = function () {
            if (Network.xhr.readyState == 4 && (Network.xhr.status >= 200 && Network.xhr.status < 400)) {
                console.log("接收消息为" + this.responseText);
                cmdManager.executeRequest(this.responseText);
            }
        };
    }

}
export var CNet = Network.inst;
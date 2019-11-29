import Response from "./protocol/Response";
import Singleton from "../../../utils/Singleton";
import { EventManager } from "../../Event";


const { ccclass, property } = cc._decorator;

@ccclass
export class Manager extends Singleton{
    // 单例
    private static url: string;
    private reConnectTimeInterval =2000;

    public connect(url: string) {
        Manager.url = url;
    }

    public send( response: Response) {
        let msg = "";
        for (let i = 0; i < response.getParameter().length; i++) {
            msg = msg + "&" + response.getParameter()[i];
        }
        console.log("发送消息为：" + Manager.url + response.getUrlParameter() + "?"  + msg);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', Manager.url + response.getUrlParameter() + "?"  + msg, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                console.log("接收消息为" + this.responseText);
                CManager.resquestManager(this.responseText);
            }else if(xhr.readyState == 4&&response.sentTime>0){
                console.log("失败重发"+response.sentTime)
                response.sentTime = response.sentTime-1;
                setTimeout(() => {
                    CManager.send(response);
                }, CManager.reConnectTimeInterval);
            }
        };
    }

    resquestManager(data:string){
        let splitted = data.split("-");
        let cmdId = splitted[0];
        let message = splitted[1];
        let request: Request = JSON.parse(message);
        EventManager.Broadcast(""+cmdId,request);
    }
}
export var CManager = Manager.getInstance();
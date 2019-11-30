import Singleton from "../../../utils/Singleton";
import { EventManager } from "../../Event";
import Request from "./AbstractRequest";

const { ccclass, property } = cc._decorator;

@ccclass
export class Handler extends Singleton{
    // 单例
    private static url: string;
    private reTryTimeInterval =2000;

    public connect(url: string) {
        Handler.url = url;
    }

    public send(sendMsg:string,reTryTimes:number) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', Handler.url+ sendMsg, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                let request: Request = JSON.parse(this.responseText);
                EventManager.Broadcast(request.cmd,request);
            }else if(xhr.readyState == 4&&reTryTimes>0){
                setTimeout(() => {
                    XhrHandler.send(sendMsg,reTryTimes-1);
                }, XhrHandler.reTryTimeInterval);
            }
        };
    }

    
}
export var XhrHandler = Handler.getInstance();
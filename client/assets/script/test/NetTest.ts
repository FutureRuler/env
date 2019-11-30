import Request from "../engine/core/system/network/xmlHttpRequest/AbstractRequest";
import Response from "../engine/core/system/network/xmlHttpRequest/AbstractResponse";
import Request1001 from "../net/protocol/Request1001";
import Response1001 from "../net/protocol/Response1001";
import Request1002 from "../net/protocol/Request1002";
import Response1002 from "../net/protocol/Response1002";
import { EventManager } from "../engine/core/system/Event";
import { XhrHandler } from "../engine/core/system/network/xmlHttpRequest/Handler";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NetTest extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';



    start () {
        XhrHandler.connect("https://www.newayue.com/evn");
        // XhrHandler.connect("http://localhost:8080/evn");
        this.exeResponse1001();
        this.exeResponse1002();
    }

    exeResponse1001(){
        console.log("网络测试1")
        let response1001: Response1001 = new Response1001();
        response1001.userId=("ssss");
        response1001.name=("sss");
        EventManager.Once(response1001.cmd,this.exeRequest1001);
        response1001.send();
    }

    exeRequest1001(request: Request) {
        let request1001: Request1001 = <Request1001>request;
        console.log(request1001.playerId);
    }

    exeResponse1002(){
        console.log("网络测试2")
        let response1002: Response1002 = new Response1002();
        response1002.userId=("aaaa");
        response1002.name=("aaaa");
        EventManager.Once(response1002.cmd,this.exeRequest1002);
        response1002.send();
    }

    exeRequest1002(request: Request) {
        let request1002: Request1002 = <Request1002>request;
        console.log(request1002.playerId);
    }
}

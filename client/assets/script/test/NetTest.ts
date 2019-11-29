import { CManager } from "../engine/core/system/network/xmlHttpRequest/Manager"
import Request from "../engine/core/system/network/xmlHttpRequest/protocol/Request";
import Response from "../engine/core/system/network/xmlHttpRequest/protocol/Response";
import Request1001 from "../engine/core/system/network/xmlHttpRequest/protocol/Request1001";
import Response1001 from "../engine/core/system/network/xmlHttpRequest/protocol/Response1001";
import Request1002 from "../engine/core/system/network/xmlHttpRequest/protocol/Request1002";
import Response1002 from "../engine/core/system/network/xmlHttpRequest/protocol/Response1002";
import { EventManager } from "../engine/core/system/Event";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';



    start () {
        CManager.connect("https://www.newayue.com/evn");
        // CNet.connect("http://localhost:8080/evn");
        this.exeResponse1001();
        this.exeResponse1002();
    }

    exeResponse1001(){
        console.log("网络测试1")
        let response1001: Response1001 = new Response1001();
        response1001.userId=("ssss");
        response1001.name=("sss");
        EventManager.Once(response1001.getCmdId(),this.exeRequest1001);
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
        EventManager.Once(response1002.getCmdId(),this.exeRequest1002);
        response1002.send();
    }

    exeRequest1002(request: Request) {
        let request1002: Request1002 = <Request1002>request;
        console.log(request1002.playerId);
    }
}

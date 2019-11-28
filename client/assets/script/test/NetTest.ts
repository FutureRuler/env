import { CNet } from "../net/core/Network"
import { cmdManager } from "../net/core/CmdManager";
import Request from "../net/protocol/Request";
import Response from "../net/protocol/Response";
import Request1001 from "../net/protocol/Request1001";
import Response1001 from "../net/protocol/Response1001";
import Request1002 from "../net/protocol/Request1002";
import Response1002 from "../net/protocol/Response1002";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';



    start () {
        // CNet.connect("https://www.newayue.com/evn/cmd/cmdManager");
        CNet.connect("http://localhost:8080/evn");
        this.exeRequest1001();
        this.exeRequest1002();
    }

    exeRequest1001(){
        console.log("网络测试")
        let response1001: Response1001 = new Response1001();
        response1001.userId=("ssss");
        response1001.name=("sss");
        cmdManager.executeResponse(response1001,this.exeResponse1001);
    }

    exeResponse1001(request: Request) {
        let request1001: Request1001 = <Request1001>request;
        console.log(request1001.playerId);
    }

    exeRequest1002(){
        console.log("网络测试")
        let response1002: Response1002 = new Response1002();
        response1002.userId=("aaaa");
        response1002.name=("aaaa");
        cmdManager.executeResponse(response1002,this.exeResponse1002);
    }

    exeResponse1002(request: Request) {
        let request1002: Request1002 = <Request1002>request;
        console.log(request1002.playerId);
    }
}

import { CNet } from "../net/core/Network"
import { cmdManager } from "../net/core/CmdManager";
import Response from "../net/protocol/Response";
import Response1001 from "../net/protocol/Response1001";
import Request from "../net/protocol/Request";
import Request1001 from "../net/protocol/Request1001";
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';



    start () {
        // CNet.connect("https://www.newayue.com/evn/cmd/cmdManager");
        CNet.connect("http://localhost:8080/evn/cmd/cmdManager");
        this.exeRequest1001();
    }

    exeRequest1001(){
        console.log("网络测试")
        let response1001: Response1001 = new Response1001();
        response1001.userId=("ssss");
        response1001.name=("sss");
        console.log(response1001)
        cmdManager.executeResponse(response1001,this.exeResponse1001);
    }

    exeResponse1001(request: Request) {
        let request1001: Request1001 = <Request1001>request;
        console.log(request1001.playerId);
    }
}

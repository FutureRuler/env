import XHR from "../../../core/network/xhr/XHR";
import XHRPack from "../../../core/network/xhr/XHRPack";
import XHRPackFactory from "../../../core/network/xhr/XHRPackFactory";

/*
 * @Author: fasthro
 * @Date: 2019-11-30 23:40:24
 * @Description: XmlHttpRequest Example
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class XHRExample extends cc.Component {
    start() {
        // 初始化
        XHR.getInstance().Initialize("https://www.newayue.com/evn", 2, 2);
        // 注册事件
        XHR.OnceEvent("1001", this.OnReceive)
        // 创建包
        let pack = XHRPackFactory.Create("1001", "player", XHRPack);
        // 添加参数
        pack.AddField("userId", "sss");
        pack.AddField("name", "sss");
        // 发送
        pack.Send();
    }

    private OnReceive(data): void {
        console.log("onreceive: " + data.cmd)
    }
}
import UIManager from "./manager/UIManager";
import MainController from "./ui/controller/MainController";

/*
 * @Author: fasthro
 * @Date: 2019-11-28 23:48:27
 * @Description: 游戏入口
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class MainGame extends cc.Component {

    start() {
        let manager = new UIManager();
        manager.ShowUI(MainController).Initialize();
    }

    update(dt) {

    }
}

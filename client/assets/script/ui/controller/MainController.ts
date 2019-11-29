import UIControllerBase from "../../engine/core/ui/UIControllerBase";

/*
 * @Author: fasthro
 * @Date: 2019-11-30 00:06:49
 * @Description: 主界面控制
 */
export default class MainController extends UIControllerBase {
    protected OnInitialize(): void {
        console.log("dddddddddd")
    }
    protected OnShow(): void {
        throw new Error("Method not implemented.");
    }
    protected OnHide(): void {
        throw new Error("Method not implemented.");
    }
    protected OnUpdate(dt: any): void {
        throw new Error("Method not implemented.");
    }
}
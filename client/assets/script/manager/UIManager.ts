import ManagerBase from "./ManagerBase";
import UIControllerBase from "../engine/core/ui/UIControllerBase";
import UIViewBase from "../engine/core/ui/UIViewBase";

/*
 * @Author: fasthro
 * @Date: 2019-11-28 23:39:23
 * @Description: UIManager(UI管理)
 */

export interface IControllerDictionary {
    [key: string]: UIControllerBase;
};

export interface IViewDictionary {
    [key: string]: UIViewBase;
}

export default class UIManager extends ManagerBase {

    private m_controllerDic: IControllerDictionary = {};
    private m_viewDic: IViewDictionary = {};

    public ShowUI<T extends UIControllerBase>(ct: new () => T): T {
        // controller
        let ts = ct.toString();
        let key = ts.substring(ts.indexOf(" "), ts.indexOf('('));
        let controller = null;
        if ((controller = this.m_controllerDic[key]) == null) {
            controller = new ct();
            this.m_controllerDic[key] = controller;
        }

        // 
        return controller
    }

    static GetControllerName(ts: string): string {
        return
    }
}
import UIViewBase from "./UIViewBase";

/*
 * @Author: fasthro
 * @Date: 2019-11-29 23:09:50
 * @Description: UI控制器基类
 */
export default abstract class UIControllerBase {

    public active: boolean;

    protected view: UIViewBase;

    public Initialize(): void {
        this.OnInitialize();
    }

    protected abstract OnInitialize(): void;

    public Show(): void {
        this.OnShow();
    }

    protected abstract OnShow(): void;

    public Hide(): void {
        this.OnHide();
    }

    protected abstract OnHide(): void;

    public Update(dt: any): void {
        this.OnUpdate(dt);
    }

    protected abstract OnUpdate(dt: any): void;

    public Dispose(): void {

    }
}
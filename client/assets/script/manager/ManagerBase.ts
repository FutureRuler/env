/*
 * @Author: fasthro
 * @Date: 2019-11-28 23:38:59
 * @Description: 管理基类
 */
export default abstract class ManagerBase {
    public Initialize(): void {
        this.OnInitialize();
    }

    protected OnInitialize(): void { }
}
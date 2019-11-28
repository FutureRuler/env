
/*
 * @Author: fasthro
 * @Date: 2019-11-28 23:24:43
 * @Description: 场景基类
 */

export default abstract class SceneBase {

    public Initialize(): void {
        this.OnInitialize();
    }

    protected OnInitialize(): void { }

    public EnterScene(): void {
        this.OnEnterScene();
    }
    
    protected OnEnterScene(): void { }

    public ExitScene(): void {
        this.OnExitScene();
    }

    protected OnExitScene(): void { }
}
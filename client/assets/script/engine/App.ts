import Singleton from './core/utils/Singleton';
import Event from './core/system/Event';
/*
 * @Author: fasthro
 * @Date: 2019-11-30 23:06:49
 * @Description: Engine App Run Start
 */
export default class App extends Singleton {
    // 事件系统
    public get Event() {
        return Event.getInstance();
    }


}
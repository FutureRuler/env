/*
 * @Author: fasthro
 * @Date: 2019-11-28 22:56:45
 * @Description: 单例基类
 */

export default abstract class Singleton {
    static getInstance<T extends {}>(this: new () => T): T {
        if (!(<any>this).instance) {
            (<any>this).instance = new this();
        }
        return (<any>this).instance;
    }
}

import XHRPack from "./XHRPack";

/*
 * @Author: fasthro
 * @Date: 2019-11-30 23:52:23
 * @Description: XmlHttpRequest Pack Factory
 */
export default class XHRPackFactory {
    /**
     * 创建Pack
     * @param cmd 
     * @param pack 
     */
    public static Create<T extends XHRPack>(cmd: string, path: string, pack: new () => T): T {
        let p = new pack()
        p.CreateWriter(cmd, path);
        return p;
    }
}
import Singleton from '../../utils/Singleton';
import App from '../../../App';
import XHRClient from './XHRClient';
import XHRPack from './XHRPack';
import XHRPackFactory from './XHRPackFactory';
/*
 * @Author: fasthro
 * @Date: 2019-11-30 23:16:15
 * @Description: XmlHttpRequet
 */
export default class XHR extends Singleton {
    // 事件名称前缀
    private static eventPrefix: string = "xhr_";

    // client
    private m_xhrClient: XHRClient = new XHRClient();
    // 重试次数
    private m_retryTimes: number;

    public Initialize(root: string, retryTimes: number = 2, retryTimeInterval: number = 2): void {
        XHRPack.RETRY_TIMES = retryTimes;
        this.m_xhrClient.Initialize(retryTimeInterval);
        this.m_xhrClient.SetRoot(root);
    }

    private _sendEmpty(cmd: string, path: string): void {
        let pack: XHRPack = XHRPackFactory.Create(cmd, path, XHRPack);
        this.m_xhrClient.Send(pack);
    }

    private _send(pack: XHRPack): void {
        this.m_xhrClient.Send(pack);
    }

    public static SendEmpty(cmd: string, path: string): void {
        XHR.getInstance()._sendEmpty(cmd, path);
    }

    public static Send(pack: XHRPack): void {
        XHR.getInstance()._send(pack);
    }

    /**
     * Once Event
     * @param cmd 
     * @param handler 
     * @param target 
     */
    public static OnceEvent(cmd: string, handler: Function, target: Object = null): void {
        App.getInstance().Event.Once(this.eventPrefix + cmd, handler, target);
    }

    /**
     * 添加事件
     * @param cmd 
     * @param handler 
     * @param target 
     */
    public static AddEvent(cmd: string, handler: Function, target: Object = null): void {
        App.getInstance().Event.Add(this.eventPrefix + cmd, handler, target);
    }

    /**
     * 移除事件
     * @param cmd 
     * @param target 
     */
    public static RemoveEvent(cmd: string, target: Object): void {
        App.getInstance().Event.Remove(this.eventPrefix + cmd, target);
    }

    /**
     * 广播事件
     * @param cmd 
     * @param data 
     * @param target 
     */
    public static Broadcast(cmd: string, data?: any, target: Object = null): void {
        App.getInstance().Event.Broadcast(this.eventPrefix + cmd, data, target);
    }
}
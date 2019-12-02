import XHRPack from "./XHRPack";
import XHR from './XHR';

/*
 * @Author: fasthro
 * @Date: 2019-11-30 22:41:08
 * @Description: XmlHttpRequest Client
 */
export default class XHRClient {

    // 服务器根地址
    private static root: string;

    // 重试时间间隔
    public static retryTimeInterval: number = 2;

    public Initialize(retryTimeInterval: number): void {
        XHRClient.retryTimeInterval = retryTimeInterval;
    }

    /**
     * 服务器根地址
     * @param root 
     */
    public SetRoot(root: string): void {
        XHRClient.root = root
    }

    /**
     * 发送
     * @param pack 
     */
    public Send(pack: XHRPack): void {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', XHRClient.root + "/" + pack.path + pack.data, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                let data = JSON.parse(this.responseText);
                XHR.Broadcast(data.cmd, data);
            } else if (xhr.readyState == 4 && pack.retryTimes > 0) {
                setTimeout(() => {
                    pack.Retry();
                }, XHRClient.retryTimeInterval);
            }
        };
    }
}
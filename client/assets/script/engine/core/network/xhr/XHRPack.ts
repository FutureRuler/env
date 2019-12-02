import XHR from './XHR';
/*
 * @Author: fasthro
 * @Date: 2019-11-30 22:50:58
 * @Description: XmlHttpRequest Pack
 */
export interface XHRField {
    key: string;
    value: any;
};

export default class XHRPack {
    // 重试次数
    public static RETRY_TIMES: number = 2;

    // 命令
    private _cmd: string;
    public get cmd() {
        return this._cmd;
    }

    // 路径
    private _path: string;
    public get path() {
        return this._path + "/" + this._cmd;
    }

    // 数据
    private _data: string;
    public get data() {
        if (this.m_isWrite) {
            this._data = "?";
            for (const field of this.m_fields) {
                this._data += "&" + field.key + "=" + field.value;
            }
        }
        return this._data;
    }

    // 重试次数
    private _retryTimes: number;
    public get retryTimes() {
        return this._retryTimes;
    }

    // 是否为写入者
    private m_isWrite: boolean;

    // 字段列表
    private m_fields: Array<XHRField> = [];

    /**
     * 创建写入者
     * @param cmd 
     */
    public CreateWriter(cmd: string, path: string) {
        this._cmd = cmd;
        this._path = path;
        this.m_isWrite = true;
        this._retryTimes = XHRPack.RETRY_TIMES;
    }

    /**
     * 创建读取者
     * @param cmd 
     * @param content 
     */
    public CreateReader(cmd: string, content: string) {
        this._cmd = cmd;
        this.m_isWrite = false;
    }

    /**
     * 发送
     */
    public Send(): void {
        XHR.Send(this);
    }

    /**
     * 重试
     */
    public Retry(): void {
        this._retryTimes--;
        if (this._retryTimes > -1) this.Send();
    }

    /**
     * 添加字段
     * @param key 
     * @param value 
     */
    public AddField(key: string, value: any): void {
        let field: XHRField = { key: key, value: value };
        this.m_fields.push(field);
    }
}
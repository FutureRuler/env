import Singleton from "../utils/Singleton";

/*
 * @Author: fasthro
 * @Date: 2019-11-27 00:03:19
 * @Description: 全局事件系统
 */

export interface EventListener {
    eventName: string,
    handler: Function,
    once: boolean,
    target: Object,
    data?: Object
};

export interface EventDictionary {
    [key: string]: Array<EventListener>
};

export default class Event extends Singleton{

    private m_eventDic: EventDictionary;

    public Once(eventName: string, handler: Function, target: Object = null) {
        this._add(eventName, handler, true, target);
    }

    public Add(eventName: string, handler: Function, target: Object = null): EventListener {
        return this._add(eventName, handler, false, target);
    }

    private _add(eventName: string, handler: Function, once: boolean = false, target: Object = null): EventListener {
        let e: EventListener = { eventName: eventName, handler: handler, once: once, target: target };
        if (!this.m_eventDic[eventName]) this.m_eventDic[eventName] = [];
        this.m_eventDic[eventName].push(e);
        return e;
    }

    public Remove(eventName: string | EventListener, target: Object) {
        // eventName 为空，target 不为空，移除target上的所以事件
        if (eventName == null) {
            if (target != null) this._removeTarget(target);
            return;
        }

        let events = [];
        if (typeof eventName === 'string') events = this.m_eventDic[eventName];
        else events = [eventName]

        if (events == null) return;

        for (const e of events) {
            if (target != null) {
                if (e.target == target) events.splice(events.indexOf(e), 1);
                else events.splice(events.indexOf(e), 1);
            }
        }
    }

    private _removeTarget(target: Object) {
        for (const eventName in this.m_eventDic) {
            if (this.m_eventDic.hasOwnProperty(eventName)) {
                const events = this.m_eventDic[eventName];
                for (const e of events) {
                    if (e.target == target) {
                        events.splice(events.indexOf(e), 1);
                    }
                }
            }
        }
    }

    /**
     * @description: 广播事件
     * @param eventName 事件名称｜事件监听对象
     * @param data 数据
     * @param target 目标对象
     * @return: 
     */
    public Broadcast(eventName: string, data?: any, target: Object = null) {
        let events = this.m_eventDic[eventName];
        if (events == null) return;
        let removes = [];
        for (const event of events) {
            if (event != null && event.eventName == eventName) {
                if (target == null) {
                    event.data = data;
                    if (event.handler != null) event.handler(event, data);
                    if (event.once) removes.push(event);
                }
                else {
                    if (target == event.target) {
                        event.data = data;
                        if (event.handler != null) event.handler(event, data);
                        if (event.once) removes.push(event);
                    }
                }
            }
        }

        for (const event of removes) {
            events.splice(removes.indexOf(event), 1);
        }
    }
}

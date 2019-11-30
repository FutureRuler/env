import request from "../../engine/core/system/network/xmlHttpRequest/AbstractRequest";

export default class Request1001 extends request {
    cmd: string="1001";
    
    public playerId: number;
}


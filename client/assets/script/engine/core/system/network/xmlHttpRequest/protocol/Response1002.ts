import response from "./Response";

export default class Response1002 extends response {
    public userId: string;
    public name: string;

    getCmdId(): string {
        return "1002";
    }

    getParameter(): string[] {
        let parameter: string[] = [];
        parameter[0] = "userId=" + this.userId;
        parameter[1] = "name=" + this.name;
        return parameter;
    }

    getUrlParameter(): string {
        return "/player/1002";
    }
}
import { XhrHandler } from "./Handler";

export default abstract class  AbstractResponse  {
    abstract cmd:string;

    abstract getParameter():string[];

    abstract getUrlParameter():string;

    send(){
        let msg = this.getUrlParameter() + "?";
        for (let i = 0; i < this.getParameter().length; i++) {
            msg = msg + "&" + this.getParameter()[i];
        }
        XhrHandler.send(msg,3)
    }
}

import { CManager } from "../Manager";

export default abstract class  Response  {
    abstract getCmdId():string;

    abstract getParameter():string[];

    abstract getUrlParameter():string;

    sentTime:number =3;

    send(){
        CManager.send(this);
    }
}

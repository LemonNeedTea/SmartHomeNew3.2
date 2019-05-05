
export class Variable{
    private static FnData:any={};
    public static GetFnData(id:string,key?:string):any{

        if(this.FnData[id]!=null){
            if(key){
                return this.FnData[id][key];
            }else{
                return this.FnData[id];
            }
        }else{
            if(key){
                return '';
            }else{
                return {};
            }
        }
    }
    public static SetFnData(id:string,data:any):void{
        this.FnData[id]=data;
    }
    public static ClearAll():void{
        this.FnData={};
    }
    public static socketObject:any;
    public static controlDevice:any;
    public static isAuto:boolean;
    public static deviceNum:number;

}
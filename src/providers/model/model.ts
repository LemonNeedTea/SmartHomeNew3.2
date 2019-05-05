export class WellPumpParams {
    public code: number = 2;
    public timerOpen: number;
    public startHour: any;
    public startMinute: any;
    public runtime: number;
    public minLevel: number;
    public maxLevel: number;
    public repeatOpen: number;
}
export class EastnorthpoolPumpParams {
    public code: number = 10;
    public loop: Array<any>;
    public timerOpen: number;
    public starDate: Array<any>;
    public runtime: number;
}
export class NorthCourtPumpParams {
    public code: number = 7;
    public loop: Array<any>;
    public timerOpen: number;
    public starDate: Array<any>;
    public runtime: number;
    public timerOpen1: boolean;
    public runtime1: number;

}
export class EastnortcCourtValveParams {
    public code: number = 8;
    public loop: Array<any>;
    public timerOpen: number;
    public starDate: Array<any>;
    public runtime: number;
}
export class CurtainModeParams {
    public code: number = 6;
    public timerOpen: number;
    public loop: Array<number>;
    public starDate: Array<any>;
    public stopDate: Array<any>;
    public starDate1: Array<any>;
    public stopDate1: Array<any>;
}
export class LightModeParams {
    public code: number = 5;
    public timerOpen: number;
    public starDate: Array<any>;
    public stopDate: Array<any>;
    public stopDate1: Array<any>;
}
export class SeasonModeParams {
    public code: number = 4;
    public loop: Array<number>;
}
export class LighJWModeParams {
    public code: number = 9;
    public timerOpen: number;
    public runtime: number;
    public runtime1: number;
}

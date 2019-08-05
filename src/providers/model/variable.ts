
export class Variable {
    private static FnData: object = {};
    private static AirData: object = {};
    public static GetFnData(id: string, key?: string): any {

        if (this.FnData[id] != null) {
            if (key) {
                return this.FnData[id][key];
            } else {
                return this.FnData[id];
            }
        } else {
            if (key) {
                return '';
            } else {
                return {};
            }
        }
    }
    public static GetAirData(id: string): any {

        if (this.AirData[id] != null) {
            return this.AirData[id];
        } else {
            return {};
        }
    }
    public static SetFnData(id: string, data: any): void {
        this.FnData[id] = data;
    }
    public static SetAirData(id: string, data: any): void {
        this.AirData[id] = data;
    }
    public static ClearAll(): void {
        this.FnData = {};
    }
    public static socketObject: any;
    public static controlDevice: any;
    public static isAuto: boolean;
    public static modeID: number;
    public static deviceNum: number = 0;
    public static loadingNum: number = 0;
    public static loadingObj: any;

}
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

/**
 * Generated class for the MyLoopComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-loop',
  templateUrl: 'my-loop.html'
})
export class MyLoopComponent implements OnInit {

  dataList: any;
  loop: Array<number>;
  /**
   * 自定义model变量
   */
  /**
   * 返回父组件变化后的值
   */
  @Input() type: string = 'week';
  @Input() name: string = '重复';
  @Input() isTrans: any = 1;

  @Input()
  set myModel(v: Array<any>) {
    if (this.isTrans == '1') {
      let temp = new Array<number>();
      if (v) {
        for (let i = 0; i < v.length; i++) {
          if (Number(v[i]) == 1) {
            temp.push(i);
          }
        }
      }
      this.loop = temp;
    } else {
      this.loop = v;
    }


  }
  @Output()
  myModelChange: EventEmitter<any> = new EventEmitter();

  get myModel() {
    return this.loop;
  };

  constructor() {

  }
  getWeekDataList() {
    return [
      { key: 0, value: '周日' },
      { key: 1, value: '周一' },
      { key: 2, value: '周二' },
      { key: 3, value: '周三' },
      { key: 4, value: '周四' },
      { key: 5, value: '周五' },
      { key: 6, value: '周六' },
    ];
  }
  getMonthDataList() {
    let result = [];
    for (let i = 1; i <= 12; i++) {
      result.push({
        key: i,
        value: (i) + "月"
      });
    }
    return result;

  }
  ngOnInit() {
    if (this.type == 'week') {
      this.dataList = this.getWeekDataList();
    } else if (this.type == 'month') {
      this.dataList = this.getMonthDataList();
    }
  }
  getReturnData() {
    let num = 0;
    if (this.type == 'week') {
      num = 7;
    } else if (this.type == 'month') {
      num = 12;
    }
    let result = [];

    for (let i = 1; i <= num; i++) {
      result.push(0);
    }
    return result;
  }
  change() {
    if (this.isTrans == '1') {
      let result = this.getReturnData();
      for (const key in this.loop) {
        if (this.loop.hasOwnProperty(key)) {
          const element = this.loop[key];
          result[element] = 1;
        }
      };
      this.myModelChange.emit(result);
    } else {
      this.myModelChange.emit(this.loop);
    }

  }

}

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ToolsProvider } from '../../providers/tools/tools'

/**
 * Generated class for the MyRuntimeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-time',
  templateUrl: 'my-time.html'
})
export class MyTimeComponent implements OnInit {
  model: any;
  constructor(private tools: ToolsProvider) {

  }
  /**
   * 自定义model变量
   */
  /**
   * 返回父组件变化后的值
   */
  @Input() name: string;
  @Input()
  set myModel(v: any) {
    if (v) {
      this.model = this.tools.getTime(v[0], v[1]);
    } else {
      this.model = "00:00";
    }
  }
  @Output()
  myModelChange: EventEmitter<any> = new EventEmitter();

  get myModel() {
    return this.model;
  };
  ngOnInit() {

  }
  change() {
    let splitArr = this.model.split(':');
    let hour = splitArr[0] ? splitArr[0] : 0;
    let minute = splitArr[1] ? splitArr[1] : 0;
    this.myModelChange.emit([hour, minute]);
  }

}

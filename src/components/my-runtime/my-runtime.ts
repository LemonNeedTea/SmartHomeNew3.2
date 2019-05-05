import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ToolsProvider } from '../../providers/tools/tools'

/**
 * Generated class for the MyRuntimeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-runtime',
  templateUrl: 'my-runtime.html'
})
export class MyRuntimeComponent implements OnInit {
  model: any;
  constructor(private tools: ToolsProvider) {

  }
  /**
   * 自定义model变量
   */
  /**
   * 返回父组件变化后的值
   */
  @Input() name: string = "运行时长";
  @Input()
  set myModel(v) {
    this.model = this.tools.getTimeStrByMin(v);;
  }
  @Output()
  myModelChange: EventEmitter<any> = new EventEmitter();

  get myModel() {
    return this.model;
  };
  ngOnInit() {

  }
  change() {
    this.myModelChange.emit(this.tools.getMinuteByTime(this.model));
  }

}

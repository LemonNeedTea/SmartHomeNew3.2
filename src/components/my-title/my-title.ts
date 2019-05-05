import { Component, Input } from '@angular/core';

/**
 * Generated class for the MyTitleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-title',
  templateUrl: 'my-title.html'
})
export class MyTitleComponent {

  text: string;
  @Input() name: string;
  constructor() {
  }

}

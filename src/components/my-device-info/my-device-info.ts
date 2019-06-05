import { Component ,Input} from '@angular/core';

/**
 * Generated class for the MyDeviceInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-device-info',
  templateUrl: 'my-device-info.html'
})
export class MyDeviceInfoComponent {

  @Input() data: any;

  constructor() {

  }

}

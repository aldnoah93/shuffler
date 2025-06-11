import { Component } from '@angular/core';
import { MenuItem } from 'src/models/layout/menuItem';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title: string = 'Shuffler app';

  menuItems: Array<MenuItem> = [{description: 'Test', link: '/test', icon:"home"}];
}

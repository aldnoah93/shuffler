import { Component } from '@angular/core';
import { MenuItem } from 'src/models/layout/menuItem';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToolbarComponent, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Shuffler app';

  menuItems: Array<MenuItem> = [{description: 'Test', link: '/test', icon:"home"}];
}

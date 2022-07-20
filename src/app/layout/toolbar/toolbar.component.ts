import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/models/layout/menuItem';
import { ToggleService } from '../services/toggle.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent{

  @Input()
  title: string = "My app";

  @Input()
  menuItems: Array<MenuItem> = [];

  constructor(private toggleService: ToggleService) { }

  toggle(): void {
    this.toggleService.toggle();
  }

}

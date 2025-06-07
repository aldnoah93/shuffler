import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'src/models/layout/menuItem';
import { ToggleService } from '../services/toggle.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatButtonModule
  ],
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

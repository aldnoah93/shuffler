import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from "@angular/material/button";
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ToggleService } from './services/toggle.service';

const ngMAterialModules = [MatToolbarModule, MatIconModule, MatButtonModule,
  MatSidenavModule, MatListModule]

@NgModule({
  declarations: [
    ToolbarComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    ...ngMAterialModules,
    RouterModule
  ],
  exports: [
    ToolbarComponent,
    SidenavComponent
  ],
  providers: [
    ToggleService
  ]
})
export class LayoutModule { }

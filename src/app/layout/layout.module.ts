import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { ToggleService } from './services/toggle.service';
import { UnsubscribeHelper } from 'src/utils/unsucribe/unsubscribe';

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
    ToggleService,
    { provide: UnsubscribeHelper, useFactory: () => new UnsubscribeHelper() }
  ]
})
export class LayoutModule { }

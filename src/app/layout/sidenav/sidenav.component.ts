import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MenuItem } from 'src/models/layout/menuItem';
import { UnsubscribeHelper } from 'src/utils/unsucribe/unsubscribe';
import { ToggleService } from '../services/toggle.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav')
  sidenav?: MatSidenav;

  @Input()
  menuItems: Array<MenuItem> = [];

  //sub$: UnsubscribeHelper = new UnsubscribeHelper();

  constructor(private toggleService: ToggleService, private sub$: UnsubscribeHelper) { }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  ngOnInit(): void {
    this.sub$.subscription = this.toggleService.toggle$.subscribe(() => this.toggle());
  }

  toggle(): void {
    this.sidenav?.toggle();
  }

}

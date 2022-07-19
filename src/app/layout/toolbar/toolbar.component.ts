import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'src/models/layout/menuItem';
import { UnsubscribeHelper } from 'src/utils/unsucribe/unsubscribe';
import { ToggleService } from '../services/toggle.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input()
  title: string = "My app";

  @Input()
  menuItems: Array<MenuItem> = [];

  sub$: UnsubscribeHelper = new UnsubscribeHelper();

  constructor(private toggleService: ToggleService) { }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  ngOnInit(): void {
  }

  toggle(): void {
    this.toggleService.toggle$.next();
  }

}

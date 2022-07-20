import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  readonly toggle$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  toggle(): void {
    this.toggle$.next(!this.toggle$.value);
  }
  
}

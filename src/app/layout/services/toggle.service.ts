import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  toggle$: Subject<void> = new Subject<void>();

  constructor() { }

  toggle(): void {
    this.toggle$.next();
  }
  
}

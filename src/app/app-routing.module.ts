import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShuffleComponent } from './shuffle/shuffle.component';

const routes: Routes = [
  { path: '', component: ShuffleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShuffleComponent } from './shuffle/shuffle.component';
import { ShuffleInputFormComponent } from './shuffle-input-form/shuffle-input-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ShuffleListComponent } from './shuffle-list/shuffle-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { ShuffleListItemsFromLocalStorageService } from './shuffleServices/shuffle-list-items-from-local-storage.service';
import { LayoutModule } from './layout/layout.module';



const ngModules = [MatInputModule, MatButtonModule, MatFormFieldModule,
  ReactiveFormsModule, MatIconModule, MatCardModule, MatSnackBarModule,
  MatListModule];

@NgModule({
  declarations: [],
  imports: [
    ...ngModules,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppComponent,
    ShuffleComponent,
    ShuffleInputFormComponent,
    ShuffleListComponent
  ],
  providers: [ShuffleListItemsFromLocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

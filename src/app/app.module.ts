import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShuffleComponent } from './shuffle/shuffle.component';
import { ShuffleInputFormComponent } from './shuffle-input-form/shuffle-input-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { ShuffleListComponent } from './shuffle-list/shuffle-list.component';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { ShuffleListItemsFromLocalStorageService } from './shuffleServices/shuffle-list-items-from-local-storage.service';
import { LayoutModule } from './layout/layout.module';



const ngModules = [MatInputModule, MatButtonModule, MatFormFieldModule,
  ReactiveFormsModule, MatIconModule, MatCardModule, MatSnackBarModule,
  MatListModule];

@NgModule({
  declarations: [
    AppComponent,
    ShuffleComponent,
    ShuffleInputFormComponent,
    ShuffleListComponent,
  ],
  imports: [
    ...ngModules,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule
  ],
  providers: [ShuffleListItemsFromLocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

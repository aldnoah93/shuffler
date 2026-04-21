import { ClipboardModule } from '@angular/cdk/clipboard';
import { TextFieldModule } from '@angular/cdk/text-field';
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
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { EditItemDialogComponent } from './dialogs/edit-item-dialog/edit-item-dialog.component';
import { ShuffleHeaderComponent } from './shuffle-header/shuffle-header.component';
import { ShuffleListItemsFromLocalStorageService } from './shuffleServices/shuffle-list-items-from-local-storage.service';
import { ShuffleEffects } from './store/shuffle/shuffle.effects';
import { shuffleFeatureKey, shuffleReducer } from './store/shuffle/shuffle.reducer';
 
const materialModules = [MatInputModule, MatButtonModule, MatFormFieldModule,
  MatIconModule, MatCardModule, MatDialogModule, MatSnackBarModule,
  MatListModule, MatMenuModule, MatTabsModule, MatToolbarModule];

const appModules = [BrowserModule, AppRoutingModule, BrowserAnimationsModule,
  ReactiveFormsModule, ClipboardModule, TextFieldModule];

@NgModule({
  declarations: [
    AppComponent,
    ShuffleComponent,
    ShuffleInputFormComponent,
    ShuffleHeaderComponent,
    ShuffleListComponent,
    ConfirmDialogComponent,
    EditItemDialogComponent,
  ],
  imports: [
    ...materialModules,
    ...appModules,
    StoreModule.forRoot({ [shuffleFeatureKey]: shuffleReducer }),
    EffectsModule.forRoot([ShuffleEffects]),
  ],
  providers: [ShuffleListItemsFromLocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

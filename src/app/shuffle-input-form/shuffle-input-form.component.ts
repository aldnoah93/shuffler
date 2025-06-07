import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-shuffle-input-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './shuffle-input-form.component.html',
  styleUrls: ['./shuffle-input-form.component.scss']
})
export class ShuffleInputFormComponent implements OnInit {

  shuffleInputForm: FormGroup;
  @Output()
  newItemEvent = new EventEmitter<string>();

  constructor() {
    this.shuffleInputForm = new FormGroup({
      description: new FormControl<string | null>(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  submitForm(): void {
    if (this.shuffleInputForm.valid) {
      this.newItemEvent.emit(this.shuffleInputForm.value.description);
      this.shuffleInputForm.reset();
    }
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
    selector: 'app-shuffle-input-form',
    templateUrl: './shuffle-input-form.component.html',
    styleUrls: ['./shuffle-input-form.component.scss'],
    standalone: false
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

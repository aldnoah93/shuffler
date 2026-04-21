import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-shuffle-input-form',
    templateUrl: './shuffle-input-form.component.html',
    styleUrls: ['./shuffle-input-form.component.scss'],
    standalone: false
})
export class ShuffleInputFormComponent {
  @ViewChild('descriptionInput')
  descriptionInput?: ElementRef<HTMLTextAreaElement>;

  shuffleInputForm = new FormGroup({
    description: new FormControl('', {
      nonNullable: true,
      validators: [ShuffleInputFormComponent.trimmedRequiredValidator],
    })
  });

  @Output()
  addItemsEvent = new EventEmitter<string[]>();

  get descriptionControl(): FormControl<string> {
    return this.shuffleInputForm.controls.description;
  }

  get pendingCount(): number {
    return this.parseDescriptions(this.descriptionControl.value).length;
  }

  get pendingCountLabel(): string {
    return `${this.pendingCount} ${this.pendingCount === 1 ? 'item' : 'items'} ready`;
  }

  submitForm(): void {
    const descriptions = this.parseDescriptions(this.descriptionControl.value);

    if (!descriptions.length) {
      this.descriptionControl.markAsTouched();
      this.descriptionControl.setErrors({ required: true });
      return;
    }

    this.addItemsEvent.emit(descriptions);
    this.shuffleInputForm.reset({ description: '' });
    queueMicrotask(() => this.descriptionInput?.nativeElement.focus());
  }

  private parseDescriptions(value: string): string[] {
    return value
      .split(/\r?\n/)
      .map(description => description.trim())
      .filter(Boolean);
  }

  private static trimmedRequiredValidator(control: AbstractControl<string>): ValidationErrors | null {
    return control.value.trim().length > 0 ? null : { required: true };
  }
}

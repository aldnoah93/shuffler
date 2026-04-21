import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface EditItemDialogData {
  description: string;
}

@Component({
  selector: 'app-edit-item-dialog',
  templateUrl: './edit-item-dialog.component.html',
  styleUrls: ['./edit-item-dialog.component.scss'],
  standalone: false,
})
export class EditItemDialogComponent {
  form = new FormGroup({
    description: new FormControl('', {
      nonNullable: true,
      validators: [EditItemDialogComponent.trimmedRequiredValidator],
    }),
  });

  constructor(
    private readonly dialogRef: MatDialogRef<EditItemDialogComponent, string>,
    @Inject(MAT_DIALOG_DATA) public readonly data: EditItemDialogData,
  ) {
    this.form.setValue({ description: data.description });
  }

  get descriptionControl(): FormControl<string> {
    return this.form.controls.description;
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.invalid) {
      this.descriptionControl.markAsTouched();
      return;
    }

    this.dialogRef.close(this.descriptionControl.value.trim());
  }

  private static trimmedRequiredValidator(control: AbstractControl<string>): ValidationErrors | null {
    return control.value.trim().length > 0 ? null : { required: true };
  }
}

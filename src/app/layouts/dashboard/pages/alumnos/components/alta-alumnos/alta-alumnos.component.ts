import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../../../../../../core/services/alerts.service';

@Component({
  selector: 'app-alta-alumnos',
  templateUrl: './alta-alumnos.component.html',
  styleUrl: './alta-alumnos.component.scss'
})
export class AltaAlumnosComponent {
  studentForm: FormGroup;

  @Output()
  userSubmitted = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<AltaAlumnosComponent>, private fb: FormBuilder, private alertService: AlertService ) {
    this.studentForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      lastName: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      phone: this.fb.control('', Validators.required),
      password: this.fb.control('', [Validators.required, Validators.minLength(8)])
    })
  }
  onSubmit():void {
    if(this.studentForm.invalid) {
      this.studentForm.markAllAsTouched()
    } else {
        this.userSubmitted.emit(this.studentForm.value);
        this.studentForm.reset();
        this.dialogRef.close()
        this.alertService.showSucces('¡Felicitaciones!', 'Usuarios creado con éxito')
    }
  }
  closeModal(): void {
    this.dialogRef.close()
  }
  hide = true;
}

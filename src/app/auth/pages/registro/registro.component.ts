import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidacionesService } from '../../../shared/validators/validaciones.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre   : ['',[Validators.required, Validators.pattern( this.validacionesService.nombreApellidoPattern )] ],
    email    : ['',[Validators.required, Validators.pattern( this.validacionesService.emailPattern )], [this.emailValidator] ],
    username : ['',[Validators.required, this.validacionesService.noPuedeSerRepetido ] ],
    password : ['',[Validators.required, Validators.minLength(6) ] ],
    password2: ['',[Validators.required] ],
  }, {
    validators: [this.validacionesService.camposIguales('password','password2')]
  })

  get emailErrorMsg (): string {

    const errors = this.miFormulario.get('email')?.errors;

    if ( errors?.['required'] ) {
      return 'el E-mail es Obligatorio'
    } else if ( errors?.['pattern'] ) {
      return 'el E-mail no tiene formato correo'
    } else if ( errors?.['emailTomado'] ) {
      return 'ya existe un registro con ese E-mail'
    }
    return '';
  }


  constructor( private fb: FormBuilder,
               private validacionesService: ValidacionesService,
               private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre  : 'Jose Marcano',
      email   : 'test2@test.com',
      username: 'jose33ha',
      password: '123456',
      password2: '123456'
    })
  }

  campoNoValido ( campo: string ) {
    return this.miFormulario.get(campo)?.invalid
              && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario () {

    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
    
  }

}

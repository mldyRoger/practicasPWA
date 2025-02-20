import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import { UserModalComponent } from 'src/app/componentes/user-modal/user-modal.component';
import { ModalController } from '@ionic/angular';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage implements OnInit {
//Array que guarda los inputs tipo objeto, se define la validacion de cada input
  registerForm: FormGroup = this.formBuilder.group({
    mail: ['',[Validators.required, Validators.email, this.noWhitespace()]],
    fullName: ['',[Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
    username: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), this.noWhitespace()]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[^\s]*$'), this.noWhitespace()]],
    confirmPassword: ['',[Validators.required]],
    birthDate: ['',[Validators.required]]
  }, { validators: this.passwordMatch }); //Se valida que las contrasenas coincidan

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private authService: AuthService,
    private router: Router,
  ){ }

  ngOnInit() {
  }
//Funcion para comparar contrasenas de acuerdo a lo que ingresa el usuario en el primer input de password
//Debe coincidir con el confirmPassword para que no envie errores
  passwordMatch(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    } 
  }

 //Funcion para enviar datos, cuando los datos son correctos, la funcion es llamada desde la vista
  //Solo se ejecuta si el boton esta activo 
    onSubmit(): void {
      if (this.registerForm.invalid) {
        return;
      }else{
        //Se realiza un objeto de datos que se van a enviar para registro con rol de common-user
        const dataToSend = {
          email: this.registerForm.get('mail')?.value,
          username: this.registerForm.get('username')?.value,
          password: this.registerForm.get('password')?.value,
          rol: 'zvr5vVJCi93pjjzfF53l',
          accion: 'add',
          userId: ''
        };
         //Se consume el servicio de registro
        this.authService.register(dataToSend)
      .subscribe( {
        next: (response: any) => {
           //Una vez que la peticion se realiza, nos devuelve un response del servidor y se 
          //imprime como alerta al usuario. Despues se navega a la login (hola)
          alert(response.message);
          this.router.navigate(['/hola']);
        },
        error: error => {
          alert('Error al registrar el usuario, por favor intente de nuevo.');
        }
      });
        //let username = this.registerForm.get('username')?.value;
        //const password = this.registerForm.get('password')?.value;
        //username = username.toLowerCase();
       // this.abrirModal(username, password);
      }
    }
//Abrir modal (Por el momento no es funcional, se uso en la practica 1)
    async abrirModal(username:string, password:string) {
      const modal = await this.modalController.create({
        component: UserModalComponent,
        componentProps: { username: username, password: password } 
      });
      
      return await modal.present();
    }

    //Obtener mensaje de error para mostrar en cada campo
    getErrorMessage(controlName: string) {
      const control = this.registerForm.get(controlName);
      if (control?.hasError('required')) {
        return 'Este campo es obligatorio.';
      }
      if (control?.hasError('email')) {
        return 'Por favor ingrese un correo electrónico válido.';
      }
      if (control?.hasError('pattern')) {
        return 'El formato del campo es incorrecto.';
      }
      if (control?.hasError('minlength')) {
        return 'La contraseña debe tener al menos 6 carácteres.';
      }
      if (control?.hasError('mismatch')) {
        return 'Las contraseñas no coinciden';
      }
      if (control?.hasError('whitespace')) {
        return 'Este campo no puede contener espacios';
      }
      return '';
    }

   //Convertir nombre completo en Mayusculas
    onFullNameCapital(event:any) {
      const value = event.target.value;
      this.registerForm.get('fullName')?.setValue(value.toUpperCase());
    }

    //Convertir nombre completo en Minisculas
    onUserNameLoweCase(event:any) {
      const value = event.target.value;
      this.registerForm.get('username')?.setValue(value.toLowerCase());
    }
   //Validar que no tenga espacios
    noWhitespace(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        if (control.value && control.value.includes(' ')) {
          return { 'whitespace': true }; 
        }
        return null; 
      };
    }
}

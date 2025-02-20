import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import { UserModalComponent } from 'src/app/componentes/user-modal/user-modal.component';
import { ModalController } from '@ionic/angular';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-admin-users-add',
  templateUrl: './admin-users-add.page.html',
  styleUrls: ['./admin-users-add.page.scss'],
  standalone: false,
})
export class AdminUsersAddPage implements OnInit {
//Array que guarda los inputs tipo objeto, se define la validacion de cada input
  registerForm: FormGroup = this.formBuilder.group({
    mail: ['',[Validators.required, Validators.email, this.noWhitespace()]],
    username: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), this.noWhitespace()]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[^\s]*$'), this.noWhitespace()]],
    confirmPassword: ['',[Validators.required]],
    rol: ['',[Validators.required]]
  }, { validators: this.passwordMatch }); //Se valida que las contrasenas coincidan

  idUser!: string;
  email!: string;
  rol!:string;
  accion!:string;
  username!:string;
  
  constructor(
    private formBuilder: FormBuilder,
        private modalController: ModalController,
        private authService: AuthService,
        private router: Router,
        private navCtrl: NavController,
  ) { }

  ngOnInit() {
    //Cargar los datos que se enviaron mediante navigation state, en el caso de editar se reciben valores
    //pero en el caso de nuevo usuario estos vienen vacios con el valor de accion = add (nuevo)
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.idUser = navigation.extras.state['id'];
      this.email = navigation.extras.state['email'];
      this.rol = navigation.extras.state['rol'];
      this.username = navigation.extras.state['username'];
      this.accion = navigation.extras.state['accion'];
    }
    //Se hace una llamada a la funcion para cambiar los parametros de validacion
    this.updateValidators(); 
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

//Funcion para cambiar los parametros de validacion, debido a que el formulario funciona para Agregar
//y Editar. La contrasena es opcional cuando se modifican los datos, es decir que se pueden actualizar 
//el resto de datos. Cuando es un nuevo registro sera obligatorio la contrasena
  updateValidators(): void {
    if (this.accion === 'update') {
      // Si la acción es update, password y confirmPassword no serán requeridos
      this.registerForm.get('password')?.clearValidators();
      this.registerForm.get('confirmPassword')?.clearValidators();
      this.registerForm.get('password')?.updateValueAndValidity();
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    } else {
      // Si la acción es add, los validadores se anaden de nuevo
      this.registerForm.get('password')?.setValidators([Validators.required, Validators.minLength(6), Validators.pattern('^[^\s]*$'), this.noWhitespace()]);
      this.registerForm.get('confirmPassword')?.setValidators([Validators.required]);
      this.registerForm.get('password')?.updateValueAndValidity();
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    }
  }

  //Funcion para enviar datos, cuando los datos son correctos, la funcion es llamada desde la vista
  //Solo se ejecuta si el boton esta activo
    onSubmit(): void {
      if (this.registerForm.invalid) {
        return;
      }else{
        //Se realiza un objeto de datos ue se van a enviar de acuerdo a la accin requerida
        const dataToSend = {
          email: this.registerForm.get('mail')?.value,
          username: this.registerForm.get('username')?.value,
          password: this.registerForm.get('password')?.value,
          rol: this.registerForm.get('rol')?.value,
          accion: this.accion === 'update' ? 'update' : 'add',
          userId: this.accion === 'update' ? this.idUser : ''
        };
        //Se consume el servicio de registro que combina con el de update
        this.authService.register(dataToSend)
      .subscribe( {
        next: (response: any) => {
          //Una vez que la peticion se realiza, nos devuelve un response del servidor y se 
          //imprime como alerta al usuario. Despues se navega a la lista de usuarios
          alert(response.message);
          this.router.navigate(['/admin-users']);
        },
        error: error => {
          alert('Error al registrar el usuario, por favor intente de nuevo.');
        }
      });
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

//Obtener mensaje de error para mostrar en cada campo de acuerdo a las especificaciones de cada input
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


    //Convertir username en Minisculas
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
//Regresar a pagina anterior
    return() {
      this.navCtrl.back();
    }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { UserModalComponent } from 'src/app/componentes/user-modal/user-modal.component';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router'; 
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-hola',
  templateUrl: './hola.page.html',
  styleUrls: ['./hola.page.scss'],
  standalone: false,
})
export class HolaPage implements OnInit {
//author: Rogelio Gudiño de León
 //Practica 1
  estaMostrandoInfo: boolean = false;
  //Practica 2
  loading!: HTMLIonLoadingElement;
  registerForm: FormGroup = this.formBuilder.group({
    username: ['',[Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[^\s]*$')]]
  });
  //Practica 2
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private router: Router,
    private authService: AuthService,
  ) {
    if (this.authService.currentUserValue) {
      this.goToHomePage();
    }
  }
  ngOnInit() {

    };
//Practica 1
  mostrarInfo() {
    console.log("Hola");
  this.estaMostrandoInfo = true;
  setTimeout(() => {
    this.ocultarInfo();
  }, 2500);
  }
//Practica 1
  ocultarInfo(){
    this.estaMostrandoInfo = false;
  }
//Funcion asincrona para para enviar datos, en este se vallida si el formulario es valido de acuerdo 
//a las valiudaciones que se hacen, si es valido se toman los datos del formulario como username y password.
async  onSubmit() {
  //Mostrar el loading al enviar formulario
  await this.presentLoading();
    if (this.registerForm.invalid) { //Si es invalido retornar
      return;
    }else{
      //Pero si es valido tomar los datos del formulario
      //let username = this.registerForm.get('username')?.value;
      //const password = this.registerForm.get('password')?.value;
      //username = username.toLowerCase();
      this.authService.login(this.registerForm.controls['username'].value, this.registerForm.controls['password'].value)
      .subscribe({
        next: async () => {
          //Esperar 3 segundos
         setTimeout(async () => {
          //Al terminar los 3 segundos ocultar el moading y navegar a home
         await this.dismissLoading();
         await this.goToHomePage();
        }, 3000);
        },
        error: async error => {
          // Handle login errors
          setTimeout(async () => {
            //Al terminar los 3 segundos ocultar el moading
           await this.dismissLoading();
          }, 3000);
          alert('Error al iniciar sesión, por favor intente de nuevo.');
        }
      });
           
    }
    
  }
//Practica 2
  async abrirModal(username:string, password:string) {
    setTimeout(async () => {
      await this.goToHomePage();
    }, 3000);
    /*const modal = await this.modalController.create({
      component: UserModalComponent,
      componentProps: { username: username, password: password } 
    });
    
    
    return await modal.present();*/
    
  }

//La siguente funcion es una asincroina para mostrar el loading trayendo el css de la variable global
//Se usa el loading Controller para manejar este  tipo de spiner en gif
  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: null,
      cssClass: 'loading-1',
    });
    //mostra el loading
    await this.loading.present();
  }

  //La siguiente funcion asincrona se diapara cuando carga la pagina, esto con la finalidad de
  //mostra el spinner al momento de entrar al login 
  async ionViewWillEnter() {
    await this.presentLoading(); //Mostrar el loading
    setTimeout(async () => {
      await this.dismissLoading(); //Ocultar el loading despues de 3 segundos
    }, 3000);

  }
//La siguiente funcion se manda a llamar en varias funciones para ocultar el loadinf
//Es una funcion asincrona que espera hasta que se realice la funcion
  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss(); //ocultar el loadinf
    }
  }

  //La siguiente funcion usa el route para navegar a otra pagina a home 
  //Se manda a llamar /home para mavegar a esa vista
  goToHomePage() {
    this.router.navigate(['/home']); //se navega a home
  }

  goToRegisterPage() {
    this.router.navigate(['/registro']);
  }
}

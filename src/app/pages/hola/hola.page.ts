import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { UserModalComponent } from 'src/app/componentes/user-modal/user-modal.component';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router'; 

@Component({
  selector: 'app-hola',
  templateUrl: './hola.page.html',
  styleUrls: ['./hola.page.scss'],
  standalone: false,
})
export class HolaPage implements OnInit {
 //Practica 1
  estaMostrandoInfo: boolean = false;
  //Practica 2
  loading!: HTMLIonLoadingElement;
  registerForm: FormGroup = this.formBuilder.group({
    username: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[^\s]*$')]]
  });
  //Practica 2
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private router: Router,
  ) {}
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
//Practica 2
async  onSubmit() {
  await this.presentLoading();
    if (this.registerForm.invalid) {
      return;
    }else{
      
      let username = this.registerForm.get('username')?.value;
      const password = this.registerForm.get('password')?.value;
      username = username.toLowerCase();
      //this.abrirModal(username, password);     
    }
    setTimeout(async () => {
      await this.dismissLoading();
      await this.goToHomePage();
    }, 3000);
    
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


  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: null,
      cssClass: 'loading-1',
      // message: 'Cargando aplicación...',
    });
    await this.loading.present();
  }

  async ionViewWillEnter() {
    await this.presentLoading();
    setTimeout(async () => {
      await this.dismissLoading();
    }, 3000);

  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }

  goToHomePage() {
    this.router.navigate(['/home']); 
  }
}

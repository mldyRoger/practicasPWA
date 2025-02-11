import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { UserModalComponent } from 'src/app/componentes/user-modal/user-modal.component';
import { ModalController } from '@ionic/angular';

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
  registerForm: FormGroup = this.formBuilder.group({
    username: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^[^\s]*$')]]
  });
  //Practica 2
  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
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
  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }else{
      let username = this.registerForm.get('username')?.value;
      const password = this.registerForm.get('password')?.value;
      username = username.toLowerCase();
      this.abrirModal(username, password);
    }
  }
//Practica 2
  async abrirModal(username:string, password:string) {
    const modal = await this.modalController.create({
      component: UserModalComponent,
      componentProps: { username: username, password: password } 
    });
    
    return await modal.present();
  }

}

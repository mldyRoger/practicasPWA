import { Component, OnInit, Input,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class UserModalComponent  implements OnInit {
  @Input() username: string = '';
  @Input() password: string = '';
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }
}

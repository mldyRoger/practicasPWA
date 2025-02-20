import { Component, OnInit } from '@angular/core';
import { TabService } from '../../services/tab.service';
import { Router, NavigationEnd } from '@angular/router'; 
import { AuthService } from "../../services/auth.service";
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
//author: Rogelio Gudiño de León
  rol: string = ''; 
  permissions: any[] = [];
  constructor(public tabService: TabService,
    private router: Router,
    private authService: AuthService
  ) { 
    //Se cargan los datos del usuario
    this.loadDataUser()
  }

  ngOnInit() {
    //Se cargan los datos del usuario
    this.loadDataUser()
  }
  //Se cargan los datos del usuarios logueado, del token se extrae los datos para almacenar en variables 
  //como el rol y los permisos
  loadDataUser(){
    if (this.authService.currentUserValue) { //Se consume un servicio para obtener datos de la memoria
      const token = this.authService.currentUserValue.token;
      const decoded: any = jwtDecode(token);
      this.permissions = decoded.permissions; 
      this.rol = decoded.rol;
    }
  }
  //Funcion para ir a la pagina de home en el tabs
  //Se maneja mediante un servicio para asignar el tab actual 
  goToHomePage() {
    this.tabService.selectedTab = 'home';
    this.router.navigate(['/home']);
  }

  //Funcion para ir a la pagina de Admin Page
  //Asi como la funcion anterior se maneja el uso de Tab para navegar
  goToAdminPage() {
    this.tabService.selectedTab = 'admin';
    this.router.navigate(['/admin-users']);
  }

  //Funcion para ir a la pagina de Profile Page
  //Asi como la funcion anterior se maneja el uso de Tab para navegar
  goToMyProfilePage() {
    this.tabService.selectedTab = 'profile';
    this.router.navigate(['/my-profile']);
  }
}

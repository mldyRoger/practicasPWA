import { Component, OnInit } from '@angular/core';
import { TabService } from '../../services/tab.service';
import { Router, NavigationEnd } from '@angular/router';
import { UsersService } from "../../services/users.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.scss'],
  standalone: false,
})
export class AdminUsersPage implements OnInit {
  //author: Rogelio Gudiño de León
  users: any[] = [];
  private routerSubscription!: Subscription;

  constructor(public tabService: TabService,
    private router: Router,
    private usersService: UsersService) { 
    this.loadUsers()
  }

  ngOnInit() {
    this.subscribeToRouterEvents();
  }
  //Subscripcion a eventos de router, al momento de cambiar de vista con router los datos deben acualizarse
  //Es por ello que se debe subscribirse y ejecutar funciones
  private subscribeToRouterEvents() {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadUsers() //Cargamos la funcion de usuarios para obtener el array

      }
    });
  }

  //Funcion para consumir un servicio y obtener un array de usuarios registrados en la base de datos
  loadUsers() {
    this.usersService.getUsers().subscribe((data) => {
      //Se almacenan los datos el array de users
      this.users = data.users; 
    })
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
  //Funcion para ir a la pagina de Add User
  //Asi como la funcion anterior se maneja el uso de Tab para navegar
  goToAdminAddUserPage() {
    this.tabService.selectedTab = 'add-user';
    this.router.navigate(['/admin-users-add']);
  }

  //Funcion para navega a otra vista, se envia como state varios parametros que se toman de la lista de 
  //usuarios, la vista a la que se dirige funciona para agregar y editar por lo que tambien se indica 
  //el tipo de accion
  updateUser(id:string, email:string, rol:string, username:string){
    this.router.navigate(['/admin-users-add'], {
      state: {
        accion: 'update',
        id: id,
        email: email,
        rol: rol,
        username: username
      }
    });
  }
}

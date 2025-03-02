import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//author: Rogelio Gudiño de León

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(
    private httpClient: HttpClient
  ) { 
    //Se cargan los datos del usuario, esto de que si existe se le asigna un valor
    //en caso de que no, un objeto vacio
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  //Servicio de registro y update, mediante post se envia al servidor de node.js que se conecta
  //a la base de datos
  register(registerForm: any){
    return this.httpClient.post('http://localhost:3000/api/auth/registerUpdate', registerForm);
  }
//Servicio de login, mediante post se envia al servidor de node.js que se conecta
  //a la base de datos
  login(email: string, password: string) {
    return this.httpClient.post<any>(`http://localhost:3000/api/auth/login`, { email, password }) //Crear end point para login
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }
//Servicio obtener datos del usuario almacenado en memoria
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
//Servicio cerrar sesion, y remover el currentUser en el almacenamiento
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

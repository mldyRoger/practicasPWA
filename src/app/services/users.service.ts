import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
 //author: Rogelio Gudiño de León 
  private API_URL = 'http://localhost:3000/api/user/'; 
  constructor(private http: HttpClient) { }

//Servicio de getUsers, mediante get se trae los datos del servidor de node.js que se conecta
  //a la base de datos
  getUsers(): Observable<any>{
    return this.http.get(`${this.API_URL}/getUsers/`);
  }
}

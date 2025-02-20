import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//Se le asigna el valor por default de tabs
export class TabService {
  //author: Rogelio Gudiño de León
  selectedTab: string = 'home';
}

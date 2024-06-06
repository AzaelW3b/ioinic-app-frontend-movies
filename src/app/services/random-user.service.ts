import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandomUserService {
  constructor(
    private http: HttpClient
  ) { }

  getRandomUser(): Observable<any> {
    return this.http.get(environment.baseUrl);
  }

  createUser(user: any):Observable<any> {
    return this.http.post(environment.back+'/Usuarios/crear', user);
  }

  iniciarSesion(user: any):Observable<any> {
    return this.http.post(environment.back+'/Usuarios/login', user)
  }
}


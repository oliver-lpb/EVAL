import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServidorService {
  private urlBase = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  //obtiene a los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(`${this.urlBase}/usuarios`);
  }

  //agrega a nuevo usuario
  postUsuarios(dataUsuario:any):Observable<any>{
    return this.http.post(`${this.urlBase}/usuarios`, dataUsuario)
  }

}

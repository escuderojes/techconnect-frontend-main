import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl= 'http://localhost:8000/api';

  constructor(private http:HttpClient) { }

  //Obtener a los estudiantes
  obtenerEstudiantes(estudiantes:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/admin/estudiantes`,estudiantes);
  }
  //Editar a los estudiantes

  //Eliminar a los estudiantes

  //Obtener a los reclutadores
  obtenerReclutadores(reclutadores:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/admin/reclutadores`,reclutadores);
  }
  //Editar a los reclutadores

  //Eliminar a los reclutadores

}

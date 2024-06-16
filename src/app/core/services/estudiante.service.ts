import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl= 'http://localhost:8000/api';

  constructor(private http:HttpClient) { }

  //Insertar Datos Estudiante
  insertarEstudiante(estudiante:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/estudiante`,estudiante);
  }
  //Actualizar Datos Etudiante
  actualizarEstudiante(id:string,estudiante:any): Observable<any>{
    return this.http.put(`${this.apiUrl}/estudiante/${id}`,estudiante);
  }
  //Obtener Ofertas
  obtenerEstudiantes(): Observable<any>{
    return this.http.get(`${this.apiUrl}/ofertas`);
  }
  //Filtrar ofertas por habilidades
  filtrarEstudiantesporHabilidades(habilidades:any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/filtrarEstudiantesporHabilidades`,habilidades);
  }
  //Asociar Habilidades con los estudiantes
  asociarHabilidadesEstudiante(habilidades:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/estudiante/habilidades`, habilidades);
  }

  //Postular a una oferta
  postularOferta(ofertaId:string): Observable<any>{
    return this.http.post(`${this.apiUrl}/postular/${ofertaId}`,{});
  }


}

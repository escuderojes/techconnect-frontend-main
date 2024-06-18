import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  //Obtener datos de estudiante logueado
  getEstudiante(): Observable<any>{
    return this.http.get(`${this.apiUrl}/estudiante`);
  }
  //Obtener datos estudiante específico
  obtenerEstudiante(id:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/estudiante/${id}`);
  }
  //Obtener Ofertas
  obtenerOfertas(page:number=1): Observable<any>{
    return this.http.get(`${this.apiUrl}/ofertas?page=${page}`);
  }
  //Obtener Habilidades
  obtenerHabilidades(): Observable<any>{
    return this.http.get(`${this.apiUrl}/habilidades`);
  }
  //Filtrar ofertas por habilidades
  filtrarOfertasporHabilidades(habilidades:any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/estudiante/ofertas/filtrar`,{habilidades:habilidades});
  }
  //Asociar Habilidades con los estudiantes
  asociarHabilidadesEstudiante(habilidades:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/estudiante/habilidades`, habilidades);
  }

  //Postular a una oferta
  postularOferta(ofertaId:string): Observable<any>{
    return this.http.post(`${this.apiUrl}/postular/${ofertaId}`,{});
  }

  //Obtener las habilidades
  getSkills(): Observable<any>{
    const token = localStorage.getItem('auth_token');
   const role = localStorage.getItem('role');

   let headers = new HttpHeaders({
     'Authorization': 'Bearer ' + token
   });

   if (role) {
     headers = headers.append('Role', role);
   }
   return this.http.get(`${this.apiUrl}/habilidadesEstu`, { headers });
  }

}

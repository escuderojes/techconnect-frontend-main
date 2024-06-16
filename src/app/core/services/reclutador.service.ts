import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclutadorService {
  private apiUrl= 'http://localhost:8000/api';

  constructor(private http:HttpClient) { }

  //Insertar Datos reclutador
  insertarReclutador(reclutador: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/reclutador`, reclutador);
  }
  //Actualizar Datos del Reclutador
  actualizarReclutador(id: string,reclutador: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/reclutador/${id}`, reclutador);
  }
  //Obtener datos reclutador específico
  getReclutador(id: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/reclutador/${id}`);
  }
  //Método para filtrar estudiantes por habilidades
  filtrarEstudiantesPorHabilidades(habilidades: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reclutador/estudiantes/filtrar`, habilidades);
  }
  //Método para insertar una nueva oferta
  insertarOferta(oferta: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reclutador/ofertas`, oferta);
  }
  //Método para Ver postulaciones en mi oferta ingresada
  verPostulaciones(ofertaId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reclutador/postulaciones/${ofertaId}`);
  }

  //Método para obtener los datos de los estudiantes con paginación
  obtenerEstudiantesPaginados(page: number = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/reclutador/estudiantes?page=${page}`);
  }

}

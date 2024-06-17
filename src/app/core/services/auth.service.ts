import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;
  private apiUrl = 'http://localhost:8000/api';
  private token: string | null=null;

  constructor(private http:HttpClient) { 
    this.isBrowser = typeof window !== 'undefined'
  }

  //REGISTRO DE ESTUDIANTES
  registroEstudiante(data:any) : Observable<any>{
    return this.http.post(`${this.apiUrl}/registro/estudiante`,data);
  }
  //REGISTRO DE RECLUTADORES
  registroReclutador(data:any) : Observable<any>{
    return this.http.post(`${this.apiUrl}/registro/reclutador`,data);
  }
  //LOGIN
  login(email:string, password:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + this.getToken()
    })
    return this.http.post(`${this.apiUrl}/login`,{email,password}, {headers:headers});
  }
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);// Store the access token in the service
  }
  // Obtener el token almacenado (ajusta según tu método de almacenamiento de tokens)
  getToken(): string | null {
    if(this.isBrowser){
      return localStorage.getItem('auth_token');
    }
    return null
   
  }

  setRole(role:string): void{
    localStorage.setItem('role',role);
  }
  getRole(role:string): string | null {
    if(this.isBrowser){
      return localStorage.getItem('role');
    }
    return null
  }
  //ENVIAR ENLACE RESTABLECIMIENTO  DE CONTRASEÑA
  forgotPassword(email: string) : Observable<any>{
    return this.http.post(`${this.apiUrl}/forgot-password`,{email});
  }
  //ENVIAR NUEVO ENLACE DE VERIFICACION DE CORREO
  resendVerification(): Observable<any>{
    const headers= new HttpHeaders().set('Authorization',`Bearer ${this.getToken()}`);
    return this.http.post(`${this.apiUrl}/email/verification-notification`,{},{headers});
  }

  //VERIFICAR CORREO ELECTRÓNICO
  verifyEmail(id: string, hash:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/email/verify/${id}/${hash}`);
  }
  //OBTENER ESTADO DE VERIFICACIÓN
  getVerificationStatus(): Observable<any>{
    const headers= new HttpHeaders().set('Authorization',`Bearer ${this.getToken()}`);
    return this.http.get(`${this.apiUrl}/email/verify`,{headers});
  }

  //CERRAR SESION
  logout(): Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.getToken()}`);
    return this.http.get(`${this.apiUrl}/logout`,{headers});
  }
  // Método para eliminar el token del localStorage
  removeToken(): void {
      console.log('Borrando token');
      localStorage.removeItem('auth_token');
  }
  //Método para eliminar el role del localStoreage
  removeRole(): void{
    console.log('Borrando rol');
    localStorage.removeItem('role');
  }
  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('auth_token');
    } else {
      console.warn('localStorage is not available.');
      return false;
    }
    }

  }

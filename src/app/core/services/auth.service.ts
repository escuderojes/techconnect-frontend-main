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
  registroEstudiante(name:string,email:string, password:string) : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + this.getToken()
    })
    return this.http.post(`${this.apiUrl}/registro/estudiante`,{name,email,password},{headers:headers});
  }
  //REGISTRO DE RECLUTADORES
  registroReclutador(name:string,email:string, password:string) : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + this.getToken()
    })
    return this.http.post(`${this.apiUrl}/registro/reclutador`,{name,email,password},{headers:headers});
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
  getEmailVerified():boolean{
    return JSON.parse(localStorage.getItem('email_verified')|| 'false');
  }

  setEmailVerified(emailVerified: boolean): void {
    localStorage.setItem('email_verified', JSON.stringify(emailVerified));
  }

  //ENVIAR ENLACE RESTABLECIMIENTO  DE CONTRASEÑA
  forgotPassword(emailData: {email: string}) : Observable<any>{
    return this.http.post(`${this.apiUrl}/forgot-password`,emailData);
  }
  resetPassword(resetData: {password:string,password_confirmation:string,token:string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, resetData);
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
  removeEmailVerified():void{
    console.log('Borrando Email Verified')
    localStorage.removeItem('email_verified');
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


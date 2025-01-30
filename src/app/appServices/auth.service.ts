import { Injectable } from '@angular/core';
import { config } from '../config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${config.BASE_URL}`; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/signup`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, user);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
  logout() {
    localStorage.removeItem('token');
  }

  
}

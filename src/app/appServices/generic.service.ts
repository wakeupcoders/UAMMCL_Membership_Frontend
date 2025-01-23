import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private apiUrl = 'https://uammcl-membership-backend.onrender.com'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  submitOrdinaryMembershipForm(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + '/api/OM', data, { headers });
  }


  EditOrdinaryMembershipForm(data: any, id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.apiUrl + '/api/OM/' + id, data, { headers });
  }

  DeleteOrdinaryMembershipForm(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(this.apiUrl + '/api/OM/' + id, { headers });
  }

  FindOrdinaryMembershipForm(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl + '/api/OM/' + id, { headers });
  }

  getAllMemberships(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/OM');
  }



}

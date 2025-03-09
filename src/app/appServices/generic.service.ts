import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private apiUrl = `${config.BASE_URL}`; // Replace with your API endpoint

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

  uploadOrdinaryAttachments(formData: FormData, memberId: string): Observable<any> {
    return this.http.post(this.apiUrl + '/api/uploads/uploadFile', formData).pipe(
      switchMap((response: any) => {
        console.log('File uploaded successfully', response);
        return this.http.put(this.apiUrl + '/api/OM/updateAttachments/' + memberId, { "filename": response["filePath"] });
      })
    );
  }

  deleteOrdinaryAttachment(selectedMemberID: string, body: any): Observable<any> {
    const url = `${this.apiUrl}/api/OM/removeAttachment/${selectedMemberID}`;
    console.log(body);
    return this.http.request('DELETE', url, { body }).pipe(
      switchMap((response) => {
        console.log('Attachment deleted successfully:', response);
        // Assuming you want to perform another DELETE request
        return this.http.request('DELETE', `${this.apiUrl}/api/uploads/deleteFile`, { body: { "filename": body.attachmentName } });
      })
    );
  }


  FindNominalMembershipForm(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.apiUrl + '/api/NM/' + id, { headers });
  }

}

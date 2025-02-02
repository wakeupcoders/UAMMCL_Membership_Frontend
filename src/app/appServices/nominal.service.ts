import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { config } from '../config';


@Injectable({
  providedIn: 'root'
})
export class NominalService {

    private apiUrl = `${config.BASE_URL}`; // Replace with your API endpoint
  
    constructor(private http: HttpClient) { }
  
    submitNominalMembershipForm(data: any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(this.apiUrl + '/api/NM', data, { headers });
    }
  
  
    EditNominalMembershipForm(data: any, id: any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.put(this.apiUrl + '/api/NM/' + id, data, { headers });
    }
  
    DeleteNominalMembershipForm(id: any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.delete(this.apiUrl + '/api/NM/' + id, { headers });
    }
  
    FindNominalMembershipForm(id: any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.get(this.apiUrl + '/api/NM/' + id, { headers });
    }
  
    getAllMemberships(): Observable<any> {
      return this.http.get(this.apiUrl + '/api/NM');
    }
  
  
    uploadNominalAttachments(formData: FormData, memberId: string): Observable<any> {
      return this.http.post(this.apiUrl + '/api/uploads/uploadFile', formData).pipe(
        switchMap((response: any) => {
          console.log('File uploaded successfully', response);
          return this.http.put(this.apiUrl + '/api/NM/updateNominalAttachments/' + memberId, { "filename": response["filePath"] });
        })
      );
    }
  
    deleteNominalAttachment(selectedMemberID: string, body: any): Observable<any> {
      const url = `${this.apiUrl}/api/NM/removeNominalAttachment/${selectedMemberID}`;
      console.log(body);
      return this.http.request('DELETE', url, { body }).pipe(
        switchMap((response) => {
          console.log('Attachment deleted successfully:', response);
          // Assuming you want to perform another DELETE request
          return this.http.request('DELETE', `${this.apiUrl}/api/uploads/deleteFile`, { body: { "filename": body.attachmentName } });
        })
      );
    }
  
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { config } from 'src/app/config';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-eoirequests',
  templateUrl: './eoirequests.component.html',
  styleUrls: ['./eoirequests.component.css']
})
export class EOIRequestsComponent implements OnInit {

  isLoading;
  isTableView = true;
  p;


  EOIs;

  selectedItem: any = null;

viewFields = [
  { key: 'entityType', label: 'Entity Type' },
  { key: 'applicantName', label: 'Applicant Name' },
  { key: 'gender', label: 'Gender' },
  { key: 'fname', label: 'Father’s Name' },
  { key: 'address', label: 'Address' },
  { key: 'state', label: 'State' },
  { key: 'tehsil', label: 'Tehsil' },
  { key: 'district', label: 'District' },
  { key: 'pincode', label: 'Pincode' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'email', label: 'Email' },
  { key: 'comments', label: 'Comments' },
  { key: 'createdAt', label: 'Submitted On' },
];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getEOIs();
  }

 onViewRequest(item: any) {
  this.selectedItem = item;
}

 deletePopup(id: string) {
  Swal.fire({
    title: 'Are you sure?',
    text: "Do you really want to delete this Expression of Interest?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.httpClient.delete(config.BASE_URL + '/api/EOI/' + id).subscribe({
        next: () => {
          this.getEOIs();
          Swal.fire(
            'Deleted!',
            'Expression of Interest Deleted Successfully !!',
            'success'
          );
        },
        error: (err) => {
          Swal.fire(
            'Error!',
            'Failed to delete. Please try again.',
            'error'
          );
          console.error(err);
        }
      });
    }
  });
}


  getEOIs() {
    this.httpClient.get(config.BASE_URL + '/api/EOI').subscribe(res => {
      this.EOIs = res;
    })
  }

}

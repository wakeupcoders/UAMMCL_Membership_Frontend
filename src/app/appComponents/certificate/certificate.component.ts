import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/appServices/generic.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  certificateId: string | null = null;
  certficateDetails;

  constructor(private route: ActivatedRoute, private _generic: GenericService) { }

  ngOnInit(): void {
    // Fetch the ID from the route parameter
    this.route.paramMap.subscribe((params) => {
      this.certificateId = params.get('id');
      this._generic.FindOrdinaryMembershipForm(this.certificateId).subscribe(res => {
        this.certficateDetails = res;
        console.log(this.certficateDetails);
      })
    });




  }



}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/appServices/generic.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-nominalcertificate',
  templateUrl: './nominalcertificate.component.html',
  styleUrls: ['./nominalcertificate.component.css']
})
export class NominalcertificateComponent implements OnInit {

  nominalCertificateId: string | null = null;
  certficateDetails;

  constructor(private route: ActivatedRoute, private _generic: GenericService) { }

  ngOnInit(): void {
    // Fetch the ID from the route parameter
    this.route.paramMap.subscribe((params) => {
      this.nominalCertificateId = params.get('id');
      this._generic.FindNominalMembershipForm(this.nominalCertificateId).subscribe(res => {
        this.certficateDetails = res;
        console.log(this.certficateDetails);
      })
    });




  }


   printCertificate() {
    const certificateContent = document.getElementById('content').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = certificateContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Optional: reloads page to restore events/styles
  }


  downloadPDF() {
    const content = document.getElementById('content') as HTMLElement;

    html2canvas(content, {
      scale: 2, // High-resolution scaling
      useCORS: true, // Enable cross-origin image loading
    }).then((canvas) => {
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png');
    
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('Certificate.pdf');
    });
    

    // html2canvas(content, { scale: 2 }).then((canvas) => {
    
    //   const imgWidth = 210; // A4 width in mm
    //   const pageHeight = 297; // A4 height in mm
    //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //   const imgData = canvas.toDataURL('image/png');

    //   const pdf = new jsPDF('p', 'mm', 'a4');
    //   pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    //   pdf.save('Certificate.pdf');
    // });
  }

}

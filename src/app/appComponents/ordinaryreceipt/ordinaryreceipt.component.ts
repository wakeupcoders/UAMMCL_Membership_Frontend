import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/appServices/generic.service';

@Component({
  selector: 'app-ordinaryreceipt',
  templateUrl: './ordinaryreceipt.component.html',
  styleUrls: ['./ordinaryreceipt.component.css']
})
export class OrdinaryreceiptComponent implements OnInit {

  ordinaryFormId: string | null = null;
  receiptDetails;
  isLoading = false;

  constructor(private route: ActivatedRoute, private _generic: GenericService) { }

  ngOnInit(): void {
    this.isLoading = true;
    // Fetch the ID from the route parameter
    this.route.paramMap.subscribe((params) => {
      this.ordinaryFormId = params.get('id');
      this._generic.FindOrdinaryMembershipForm(this.ordinaryFormId).subscribe(res => {
        this.receiptDetails = res;
        console.log(this.receiptDetails);
        this.isLoading = false;
      })
    });




  }


  printReceipt(divId: string): void {
    const printContents = document.getElementById(divId)?.innerHTML;
    const originalContents = document.body.innerHTML;

    if (printContents) {
      // Temporarily set the body content to the content of the target div
      document.body.innerHTML = printContents;

      // Trigger the print dialog
      window.print();

      // Restore the original content of the page
      document.body.innerHTML = originalContents;

      // Reload the page to restore any lost states
      window.location.reload();
    }
  }
}

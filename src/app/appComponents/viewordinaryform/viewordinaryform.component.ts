import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/appServices/generic.service';


@Component({
  selector: 'app-viewordinaryform',
  templateUrl: './viewordinaryform.component.html',
  styleUrls: ['./viewordinaryform.component.css']
})
export class ViewordinaryformComponent implements OnInit {

  ordinaryFormId: string | null = null;
  ordinaryFormDetail;
  isLoading = false;

  constructor(private route: ActivatedRoute, private _generic: GenericService) { }

  ngOnInit(): void {
    this.isLoading = true;
    // Fetch the ID from the route parameter
    this.route.paramMap.subscribe((params) => {
      this.ordinaryFormId = params.get('id');
      this._generic.FindOrdinaryMembershipForm(this.ordinaryFormId).subscribe(res => {
        this.ordinaryFormDetail = res;
        console.log(this.ordinaryFormDetail);
        this.isLoading = false;
      })
    });




  }

  printDiv(): void {
    const printContents = document.getElementById("printableForm")?.innerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Reload to restore bindings
    }
  }

}

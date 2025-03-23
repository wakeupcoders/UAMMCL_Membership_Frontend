import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenericService } from 'src/app/appServices/generic.service';

@Component({
  selector: 'app-viewnominalform',
  templateUrl: './viewnominalform.component.html',
  styleUrls: ['./viewnominalform.component.css']
})
export class ViewnominalformComponent implements OnInit {

    nominalFormId: string | null = null;
    nominalFormDetail;
    isLoading = false;
  
    constructor(private route: ActivatedRoute, private _generic: GenericService) { }
  
    ngOnInit(): void {
      this.isLoading = true;
      // Fetch the ID from the route parameter
      this.route.paramMap.subscribe((params) => {
        this.nominalFormId = params.get('id');
        this._generic.FindNominalMembershipForm(this.nominalFormId).subscribe(res => {
          this.nominalFormDetail = res;
          console.log(this.nominalFormDetail);
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

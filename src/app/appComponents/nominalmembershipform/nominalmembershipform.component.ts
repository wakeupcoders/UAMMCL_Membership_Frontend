import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nominalmembershipform',
  templateUrl: './nominalmembershipform.component.html',
  styleUrls: ['./nominalmembershipform.component.css']
})
export class NominalmembershipformComponent implements OnInit {

  registrationForm: FormGroup;
  isTableView = true;
  isLoading = false;
  nominalMembers;
  selectedMemberID;
  selectedMember;
  editMode = false;
  p: number = 1;

  constructor(private fb: FormBuilder, private http:HttpClient) {
    this.registrationForm = this.fb.group({
      registrationInformation: this.fb.group({
        nameOfApplicant: ['John Doe 3'],
        dateOfIncorporation: ['2025-01-15'],
        registeredAddress: this.fb.group({
          state: ['California'],
          city: ['Los Angeles'],
          district: ['Central'],
          tehsil: ['Downtown'],
          pinCode: ['90001'],
          zone: ['West']
        })
      }),
      idInformation: this.fb.group({
        pan: ['ABCDE1234F'],
        itan: ['ITAN12345'],
        gstNumber: ['22ABCDE1234F1Z5'],
        aadhar: ['1234-5678-9012'],
        idNumber: ['ID67890']
      }),
      contactInformation: this.fb.group({
        mobileNo: ['1234567890'],
        emailId: ['johndoe@example.com'],
        panNo: ['ABCDE1234F'],
        registeredWithOtherExchange: [false],
        nomineeName: ['Jane Doe'],
        licenseNo: ['LIC123456']
      }),
      gstInformation: this.fb.group({
        gstAvailable: [true],
        gstRegistrationNo: ['22ABCDE1234F1Z5'],
        gstStateCode: ['CA'],
        gstAddress: this.fb.group({
          state: ['California'],
          city: ['Los Angeles'],
          district: ['Central'],
          tehsil: ['Downtown'],
          pinCode: ['90001']
        })
      })
    });
  }

  ngOnInit(): void {
    this.isTableView=true;
    this.onDisplay();
  }


  showForm(status: boolean) {
    this.isTableView = status;
    this.registrationForm.reset();
  }

  onDisplay() {
    this.isLoading = true;
    this.http.get('https://uammcl-membership-backend.onrender.com/api/NM').subscribe(res => {
      this.nominalMembers = res;
      this.isLoading = false;

    })
  }


  onSubmit() {

    this.http.post('https://uammcl-membership-backend.onrender.com/api/NM', this.registrationForm.value).subscribe(res=>{
      console.log(res);
    });

    console.log('Form Submitted:', this.registrationForm.value);
  }

}

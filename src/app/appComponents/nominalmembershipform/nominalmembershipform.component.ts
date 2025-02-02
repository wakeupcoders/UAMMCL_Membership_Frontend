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

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      registrationInformation: this.fb.group({  // 👈 nameOfApplicant is inside this
        nameOfApplicant: [''],
        dateOfIncorporation: [''],
        registeredAddress: this.fb.group({
          state: [''],
          city: [''],
          district: [''],
          tehsil: [''],
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
    this.isTableView = true;
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

  onEditMember(member: any) {

    this.showForm(false);
    this.selectedMemberID = member._id;
    this.selectedMember = member;
    this.editMode = true;

    console.log(member);
    console.log(member["idInformation"]?.pan);

    this.registrationForm.patchValue({
      registrationInformation: {
        nameOfApplicant: member.registrationInformation.nameOfApplicant,
        dateOfIncorporation: member.registrationInformation.dateOfIncorporation,
        registeredAddress: {
          state: member["registrationInformation"].registeredAddress?.state,
          city: member["registrationInformation"].registeredAddress?.city,
          district: member["registrationInformation"].registeredAddress?.district,
          tehsil: member["registrationInformation"].registeredAddress?.tehsil,
          pinCode: member["registrationInformation"].registeredAddress?.pinCode,
          zone: member["registrationInformation"].registeredAddress?.zone
        },
      },
      idInformation: {
        pan: member["idInformation"]?.pan,
        itan: member["idInformation"]?.itan,
        gstNumber: member["idInformation"]?.gstNumber,
        aadhar: member["idInformation"]?.aadhar,
        idNumber: member["idInformation"]?.idNumber
      },

      contactInformation: {
        mobileNo: member.contactInformation?.mobileNo,
        emailId: member.contactInformation?.emailId,
        panNo: member.contactInformation?.panNo,
        registeredWithOtherExchange: member.contactInformation?.registeredWithOtherExchange,
        nomineeName: member.contactInformation?.nomineeName,
        licenseNo: member.contactInformation?.licenseNo
      },
        gstInformation: {
        gstAvailable: member.gstInformation?.gstAvailable,
        gstRegistrationNo: member.gstInformation?.gstRegistrationNo,
        gstStateCode: member.gstInformation?.gstStateCode,
        gstAddress: {
          state: member.gstInformation?.gstAddress?.state,
          city: member.gstInformation?.gstAddress?.city,
          district: member.gstInformation?.gstAddress?.district,
          tehsil: member.gstInformation?.gstAddress?.tehsil,
          pinCode: member.gstInformation?.gstAddress?.pinCode
        }
      }


    });

    console.log(this.registrationForm.value);

    // Populate the form with the member's data
    // this.registrationForm.patchValue({
    //   registrationInformation: {
    //     nameOfApplicant: member.registrationInformation.nameOfApplicant,
    //     dateOfIncorporation: member.registrationInformation.dateOfIncorporation
    //   //   registeredAddress: {
    //   //     state: member.registeredAddress?.state,
    //   //     city: member.registeredAddress?.city,
    //   //     district: member.registeredAddress?.district,
    //   //     tehsil: member.registeredAddress?.tehsil,
    //   //     pinCode: member.registeredAddress?.pinCode,
    //   //     zone: member.registeredAddress?.zone
    //   //   }
    //   // },
    //   // idInformation: {
    //   //   pan: member.idInformation?.pan,
    //   //   itan: member.idInformation?.itan,
    //   //   gstNumber: member.idInformation?.gstNumber,
    //   //   aadhar: member.idInformation?.aadhar,
    //   //   idNumber: member.idInformation?.idNumber
    //   // },
    //   // contactInformation: {
    //   //   mobileNo: member.contactInformation?.mobileNo,
    //   //   emailId: member.contactInformation?.emailId,
    //   //   panNo: member.contactInformation?.panNo,
    //   //   registeredWithOtherExchange: member.contactInformation?.registeredWithOtherExchange,
    //   //   nomineeName: member.contactInformation?.nomineeName,
    //   //   licenseNo: member.contactInformation?.licenseNo
    //   // },
    //   // gstInformation: {
    //   //   gstAvailable: member.gstInformation?.gstAvailable,
    //   //   gstRegistrationNo: member.gstInformation?.gstRegistrationNo,
    //   //   gstStateCode: member.gstInformation?.gstStateCode,
    //   //   gstAddress: {
    //   //     state: member.gstInformation?.gstAddress?.state,
    //   //     city: member.gstInformation?.gstAddress?.city,
    //   //     district: member.gstInformation?.gstAddress?.district,
    //   //     tehsil: member.gstInformation?.gstAddress?.tehsil,
    //   //     pinCode: member.gstInformation?.gstAddress?.pinCode
    //   //   }
    //   // }
    //   }
    // });


    // Additional logic if needed
    // this.showForm(true);
  }


  onSubmit() {

    this.http.post('https://uammcl-membership-backend.onrender.com/api/NM', this.registrationForm.value).subscribe(res => {
      console.log(res);
    });

    console.log('Form Submitted:', this.registrationForm.value);
  }

}

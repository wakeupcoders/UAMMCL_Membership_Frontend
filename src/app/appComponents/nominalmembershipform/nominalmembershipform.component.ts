import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { NominalService } from 'src/app/appServices/nominal.service';
import { GenericService } from 'src/app/appServices/generic.service';
import { config } from 'src/app/config';


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

  uploadMessage = '';

  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private nominalService: NominalService) {
    this.registrationForm = this.fb.group({
      registrationInformation: this.fb.group({  // 👈 nameOfApplicant is inside this
        nameOfApplicant: [''],
        dateOfIncorporation: [''],
        registeredAddress: this.fb.group({
          state: [''],
          city: [''],
          district: [''],
          tehsil: [''],
          pinCode: [''],
          zone: ['']
        })
      }),
      idInformation: this.fb.group({
        pan: [''],
        itan: [''],
        gstNumber: [''],
        aadhar: [''],
        idNumber: ['']
      }),
      contactInformation: this.fb.group({
        mobileNo: [''],
        emailId: [''],
        panNo: [''],
        registeredWithOtherExchange: [false],
        nomineeName: [''],
        licenseNo: ['']
      }),
      gstInformation: this.fb.group({
        gstAvailable: [],
        gstRegistrationNo: [''],
        gstStateCode: [''],
        gstAddress: this.fb.group({
          state: [''],
          city: [''],
          district: [''],
          tehsil: [''],
          pinCode: ['']
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
    this.nominalService.getAllMemberships().subscribe(res => {
      this.nominalMembers = res;
      this.isLoading = false;
    })
  }

  onEditMember(member: any) {
    this.showForm(false);
    this.selectedMemberID = member._id;
    this.selectedMember = member;
    this.editMode = true;
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
  }

  deletePopup(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your delete function here
        this.onDelete(id);
      }
    });
  }

  onDelete(id) {
    this.isLoading = true;
    this.nominalService.DeleteNominalMembershipForm(id).subscribe(res => {
      this.onDisplay();
      this.isLoading = false;

    })
  }

  onSubmit() {
    this.isLoading = true;
    if (this.editMode) {
      if (this.registrationForm.valid) {
        this.isLoading = true;
        this.nominalService.EditNominalMembershipForm(this.registrationForm.value, this.selectedMemberID).subscribe({
          next: (response) => {
            this.onDisplay();
            this.isTableView = true;
            this.isLoading = false;
            console.log('Form submitted successfully', response);
          },
          error: (error) => {
            console.error('Error submitting form', error);
          },
        });
      } else {
        console.log('Form is invalid');
      }
    }
    else {
      //Add New Record
      this.nominalService.submitNominalMembershipForm(this.registrationForm.value).subscribe(res => {
        this.nominalMembers = res;
        this.isLoading = false;
        this.onDisplay();
        this.showForm(true);
      })
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      alert('Please select a file first!');
      return;
    }

    this.uploadMessage = "Uploading ... Please Wait !!"
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.nominalService.uploadNominalAttachments(formData, this.selectedMemberID).subscribe(res => {
      this.uploadMessage = "File Uploaded Successfully";
      this.selectedMember.attachments = JSON.parse(JSON.stringify(res.attachments));

      setTimeout(() => {
        this.uploadMessage = "";
      }, 3000);

    })
  }

  onView(attachment) {
    const baseUrl = config.BASE_URL + '/uploads/';
    const url = `${baseUrl}/${encodeURIComponent(attachment)}`; // Add the input value as a query parameter

    // Redirect to the constructed URL
    window.open(url, '_blank');

  }

  onDeleteAttachment(attachmentname: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your delete function here
        const fileName = attachmentname;
        this.uploadMessage = "Deleting ... Please Wait !!"
        this.nominalService.deleteNominalAttachment(this.selectedMemberID, { attachmentName: attachmentname }).subscribe({
          next: (response) => {

            this.selectedMember.attachments = this.selectedMember.attachments.filter(item => item !== fileName);
            this.uploadMessage = "File Deleted Successfully...";
            setTimeout(() => {
              this.uploadMessage = "";
            }, 3000);
            console.log('Second attachment deleted successfully:', response);
          },
          error: (error) => {
            console.error('Error deleting attachment:', error);
          }
        });
      }
    });



  }
}

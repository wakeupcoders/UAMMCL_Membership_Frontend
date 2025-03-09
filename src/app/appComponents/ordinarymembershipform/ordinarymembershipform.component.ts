import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/appServices/generic.service';
import { config } from 'src/app/config';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ordinarymembershipform',
  templateUrl: './ordinarymembershipform.component.html',
  styleUrls: ['./ordinarymembershipform.component.css']
})
export class OrdinarymembershipformComponent implements OnInit {

  memberForm: FormGroup;
  isTableView = true;
  isLoading = false;
  ordinaryMembers;
  selectedMemberID;
  selectedMember;
  editMode = false;
  p: number = 1;
  uploadMessage = '';

  selectedFile: File | null = null;

   private apiUrl = `${config.BASE_URL}`; // Replace with your API endpoint
  


  constructor(private fb: FormBuilder, private genericService: GenericService, private router: Router, private http: HttpClient) {
    this.memberForm = this.fb.group({
      nameOfApplicant: ['', [Validators.required]],
      membership_id: ['', [Validators.required]],
      state: ['', [Validators.required]],
      residentOf: ['', [Validators.required]],
      shares: ['', [Validators.required, Validators.min(1)]],
      fullName: ['', [Validators.required]],
      motherName: ['', [Validators.required]],
      wifeName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18)]],
      dateOfBirth: ['', Validators.required],
      educationalQualification: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      permanentAddress: ['', Validators.required],
      permanentPinCode: ['', [Validators.required, Validators.required]],
      presentAddress: ['', Validators.required],
      presentPinCode: ['', [Validators.required, Validators.required]],
      telephoneNumber: ['', [Validators.required, Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      aadharCard: ['', [Validators.required, Validators.required]],
      panCard: ['', [Validators.required, Validators.required]],
      nomination: this.fb.group({
        name: ['', Validators.required],
        relation: ['', Validators.required],
        occupation: ['', Validators.required],
        address: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(1)]],
      }),
      certificateDetails: this.fb.group({
        register_number: ['', Validators.required],
        certificate_number: ['', Validators.required],
        Holding_Iden_number: ['', Validators.required],
        share_start_number: ['', [Validators.required, Validators.required]],
        share_end_number: ['', [Validators.required, Validators.required]],
        // value_of_share: ['100', [Validators.required, Validators.min(1)]],
      }),
      receiptNumber: ['', [Validators.required, Validators.min(1)]],
      paymentMode: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {

    this.isTableView = true;
    this.onDisplay();

  }

  onSubmit(): void {

    if (this.editMode) {
      if (this.memberForm.valid) {
        this.isLoading = true;
        this.genericService.EditOrdinaryMembershipForm(this.memberForm.value, this.selectedMemberID).subscribe({
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
      if (this.memberForm.valid) {
        this.isLoading = true;
        this.genericService.submitOrdinaryMembershipForm(this.memberForm.value).subscribe({
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

  }

  onDisplay() {
    this.isLoading = true;
    this.genericService.getAllMemberships().subscribe(res => {
      this.ordinaryMembers = res;
      this.isLoading = false;

    })
  }

  onEditMember(member: any) {

    this.showForm(false);
    this.selectedMemberID = member._id;
    this.selectedMember = member;
    this.editMode = true;

    // Populate the form with the member's data
    this.memberForm.patchValue({
      nameOfApplicant: member.nameOfApplicant,
      membership_id: member.membership_id,
      state: member.state,
      residentOf: member.residentOf,
      shares: member.shares,
      fullName: member.fullName,
      motherName: member.motherName,
      wifeName: member.wifeName,
      age: member.age,
      dateOfBirth: member.dateOfBirth,
      educationalQualification: member.educationalQualification,
      maritalStatus: member.maritalStatus,
      permanentAddress: member.permanentAddress,
      permanentPinCode: member.permanentPinCode,
      presentAddress: member.presentAddress,
      presentPinCode: member.presentPinCode,
      telephoneNumber: member.telephoneNumber,
      email: member.email,
      aadharCard: member.aadharCard,
      panCard: member.panCard,
      nomination: {
        name: member.nomination?.name,
        relation: member.nomination?.relation,
        occupation: member.nomination?.occupation,
        address: member.nomination?.address,
        age: member.nomination?.age,
      },
      certificateDetails: {
        register_number: member.certificateDetails?.register_number,
        certificate_number: member.certificateDetails?.certificate_number,
        Holding_Iden_number: member.certificateDetails?.Holding_Iden_number,
        share_start_number: member.certificateDetails?.share_start_number,
        share_end_number: member.certificateDetails?.share_end_number,
        value_of_share: member.certificateDetails?.value_of_share,
      },
      receiptNumber: member.receiptNumber,
      paymentMode:member.paymentMode
    });

    // Additional logic if needed
    // this.showForm(true);
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
    this.genericService.DeleteOrdinaryMembershipForm(id).subscribe(res => {
      this.onDisplay();
      this.isLoading = false;

    })
  }

  onGenerateCertificate(id: string) {
    this.router.navigate(['/certificate', id]);
  }


  showForm(status: boolean) {
    this.isTableView = status;
    this.memberForm.reset();
  }

  redirectToReport(inputValue: string): void {
    if (!inputValue.trim()) {
      alert('Please enter a value before exporting.');
      return;
    }

    const baseUrl = `${this.apiUrl}/api/reports/downloadOM`;
    const url = `${baseUrl}/${encodeURIComponent(inputValue)}`; // Add the input value as a query parameter

    // Redirect to the constructed URL
    window.open(url, '_blank');
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

    this.genericService.uploadOrdinaryAttachments(formData, this.selectedMemberID).subscribe(res => {
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
        this.genericService.deleteOrdinaryAttachment(this.selectedMemberID, { attachmentName: attachmentname }).subscribe({
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

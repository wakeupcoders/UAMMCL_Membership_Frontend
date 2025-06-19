import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { config } from '../config';

@Component({
  selector: 'app-expression-of-interest',
  templateUrl: './expression-of-interest.component.html',
  styleUrls: ['./expression-of-interest.component.css']
})
export class ExpressionOfInterestComponent implements OnInit {

  isLoading = false;
  formSubmitted = false;
  eoiForm: FormGroup;
  entityTypes = ['Individual', 'Cooperative Society / Organization'];
  genders = ['Male', 'Female', 'Other'];
  isDeclarationChecked = false;
  indianStates: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  constructor(private fb: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.eoiForm = this.fb.group({
      entityType: ['', Validators.required],
      applicantName: ['', Validators.required],
      gender: ['', Validators.required],
      fname: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      tehsil: [''],
      district: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.email]],
      comments: ['']
    });
  }

  onSubmit() {
    if (this.eoiForm.valid) {
      this.isLoading = true;
      this.httpClient.post(config.BASE_URL + '/api/EOI', this.eoiForm.value).subscribe(res => {
        this.isLoading = false;
        this.formSubmitted = true;
      })
      console.log('Form Submitted', this.eoiForm.value);
    } else {
      console.log('Looks Like, Form is Invalid.');
    }
  }

  onReset() {
    this.eoiForm.reset();
  }

  isFirmSelected(): boolean {
  return this.eoiForm.get('entityType')?.value === 'Cooperative Society / Organization';
}

onDeclarationChange(event: Event): void {
  const checkbox = event.target as HTMLInputElement;
  this.isDeclarationChecked = checkbox.checked;
}



}

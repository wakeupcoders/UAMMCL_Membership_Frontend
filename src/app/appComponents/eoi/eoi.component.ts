import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-eoi',
  templateUrl: './eoi.component.html',
  styleUrls: ['./eoi.component.css']
})
export class EOIComponent implements OnInit {

  isLoading = false;
  eoiForm: FormGroup;
  entityTypes = ['Individual', 'Firm'];
  genders = ['Male', 'Female', 'Other'];
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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.eoiForm = this.fb.group({
      entityType: ['', Validators.required],
      applicantName: ['', Validators.required],
      gender: ['', Validators.required],
      fname: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      tehsil: ['', Validators.required],
      district: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      comments: ['']
    });
  }

  onSubmit() {
    if (this.eoiForm.valid) {
      console.log('Form Submitted', this.eoiForm.value);
    } else {
      console.log('Form Invalid');
    }
  }

  onReset() {
    this.eoiForm.reset();
  }


}

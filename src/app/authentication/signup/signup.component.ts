import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/appServices/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  isLoading = false; // Loader state

  ngOnInit(): void {
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true; // Start loading
      this.authService.signup(this.signupForm.value).subscribe(
        response => {
          this.isLoading = false; // Stop loading
          alert('Signup successful!');
          this.router.navigate(['/login']);
        },
        error => {
          this.isLoading = false; // Stop loading on error
          alert('Signup failed! Please try again.');
        }
      );
    }
  }

  // Helper function to check validation status
  isInvalid(field: string) {
    return this.signupForm.controls[field].invalid && 
           (this.signupForm.controls[field].dirty || this.signupForm.controls[field].touched);
  }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/appServices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading = false;


  ngOnInit(): void {
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isLoading = true; // Start loading

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(

        response => { 
          this.authService.setToken(response.token);
          // this.router.navigate(['/ordinary']);
          window.location.href = '/ordinary';
          this.isLoading = false; },
        error => { alert("Login Failed"); this.isLoading = false; }
      );
    }
  }

  isInvalid(field: string) {
    return this.loginForm.controls[field].invalid && (this.loginForm.controls[field].dirty || this.loginForm.controls[field].touched);
  }

}

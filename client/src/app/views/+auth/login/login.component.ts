import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/core/services/auth.service';
import { AuthHttpClientService } from '../services/auth-httpclient.service';
import { HttpErrorResponse } from '@angular/common/http';

interface ErrorApi {
  statusCode: number;
  error: string;
  message: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private authHttpclientService: AuthHttpClientService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {

    this.loading = true;

    if (this.loginForm.valid) {
      this.loginForm.disable();

      this.authHttpclientService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (data: any) => {
          this.authService.login(data.token);
          this.router.navigate(['']);
        },
        (response: HttpErrorResponse) => {
          this.loginForm.enable();
          this.loading = false;

          if (typeof response.error.message === 'string') {
            this.snackBar.open(response.error.message, 'Xx', {duration: 3000});
          } else {
            for (const key in response.error.message[0].constraints) {
              if (response.error.message[0].constraints.hasOwnProperty(key)) {
                const element: string = response.error.message[0].constraints[key];
                this.snackBar.open(`Error: ${element}`, 'X', {duration: 3000});
                break;
              }
            }

          }
        }
      );

    } else {
      this.loading = false;
      console.log('Form not valid');
    }

  }

}

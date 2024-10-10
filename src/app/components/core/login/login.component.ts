import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpLoginService } from '@httpServices';
import { LoginService, StorageService } from '@services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  form: FormGroup;

  textResponse: string | null = null;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService, private httpLogin: HttpLoginService, private storageService: StorageService) {
    this.form = this.formBuilder.group({
      username: this.formBuilder.control("", Validators.required),
      password: this.formBuilder.control("", [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]),
    })
  }

  ngOnInit(): void {
    this.loginService.logout();
    this.loginService.loginStatus$.subscribe({
      next: (value: boolean) => {
        if (value) {
          this.router.navigate(['/projects']);
        }
      }
    })
  }

  onSubmit() {
    this.textResponse = null;
    this.httpLogin.post(this.form.getRawValue()).subscribe({
      next: (response: any) => {
        if (response.token) {
          this.storageService.save("token", response.token);
          this.storageService.save("user", response.user);
          this.loginService.setUserData(response.user);
          this.loginService.setLoginStatus(true);
        } else {
          this.textResponse = response.message;
        }
      }, error: (error) => {
        console.error(error);
        this.snackBar.open(JSON.stringify(error), "OK", {
          duration: 3000
        });
      }
    });
  }
}

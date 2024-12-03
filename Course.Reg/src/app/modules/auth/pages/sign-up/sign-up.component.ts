import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink, AngularSvgIconModule, ButtonComponent, ReactiveFormsModule, NgClass, NgIf],
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  passwordTextType!: boolean;

  constructor(private readonly _formBuilder: FormBuilder, private readonly _router: Router) {}

  onClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    console.log(password,confirmPassword)

    // Return error if passwords don't match
    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    }

    // Return null if no error
    return null;
  }


  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }


  onSubmit() {
    this.submitted = true;
    const { email, password, confirmPassword } = this.form.value;
    console.log('hello', email, password);

    // Stop if the form is invalid
    if (this.form.invalid) {
      return;
    }

    // Prepare the data to send
    const requestBody = {
      username: email,
      password: password,
      confirmPassword: password,
    };

    // Make the POST request
    fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type
      },
      body: JSON.stringify(requestBody), // Convert requestBody to JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        console.log('Registration successful:', data);

        // Navigate to the home page loginor another route
        this._router.navigate(['/auth/sign-in']);
      })
      .catch((error) => {
        console.error('Error during registration:', error);

        this._router.navigate(['/errors/404']);
      });
  }
}

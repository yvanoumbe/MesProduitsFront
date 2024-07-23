import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  public user = new User();
  confirmPassword?: string;
  myForm!: FormGroup;
  err: any;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], // minLength ( le mot de passe doit contenir au moins 6 caractères)
      confirmPassword: ['', [Validators.required]]
    });
  }

  // méthode pour s'enregistrer 
  onRegister() {
    console.log(this.user);
    this.loading = true;
    this.authService.registerUser(this.user).subscribe({
      next: (res) => {
        this.authService.setRegistredUser(this.user);
        // alert("veillez confirmer votre email");
        this.loading = false;
        this.toastr.success('veillez confirmer votre email', 'Confirmation');
        this.router.navigate(["/verifEmail"]);

      },
      // pour afficher le message retourner par le back (BAD.REQUEST) en français lorsque l'email existe déja 
      error: (err: any) => {
        if (err.status = 400) {
          this.err = err.error.message;
        }
      }
      // pour afficher le message d'erreur en anglais et avec errorCode lorsque l'email existe déja 
      /*   error: (err: any) => {
          if (err.error.errorCode == "USER_EMAIL_ALREADY_EXISTS") {
            this.err = "Email already used";
          }
        } */
    }
    )


  }
}

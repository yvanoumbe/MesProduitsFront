import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrl: './verif-email.component.css'
})
export class VerifEmailComponent implements OnInit {
  code: string = "";
  user: User = new User();
  err = "";

  constructor(private route: ActivatedRoute, private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.user = this.authService.regitredUser;
  }

  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        alert('Login successful');
        this.authService.login(this.user).subscribe({
          next: (data) => {
            let jwToken = data.headers.get('Authorization')!;
            this.authService.saveToken(jwToken);
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            console.log(err);
          }
        });
      },
      // ici on teste le message sur err.status pour afficher le message suivant le backend (il retourne INVALID_TOKEN et  EXPIRED_TOKEN déclarer depuis la classe GlobalExceptionHandler du backend)
      /*  error: (err: any) => {
         if (err.status = 400) {
           this.err = err.error.message;
         }
         console.log(err.errorCode);
       } */

      // méthode si on veut personnalisé le message envoyé a l'utilisateur avec le erroCode variable déclarer dans le ErrorDetails coté backend
      error: (err: any) => {
        if (err.error.errorCode == "INVALID_TOKEN")
          this.err = "Votre code n'est pas valide !";

        if (err.error.errorCode == "EXPIRED_TOKEN")
          this.err = "Votre code a expiré !";

        console.log(err.errorCode);
      }
    });
  }

}

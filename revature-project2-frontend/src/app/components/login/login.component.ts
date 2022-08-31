import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = "";
  readonly validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  constructor(private autService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.email.length === 0 || this.password.length === 0) {
      this.errorMessage = "A Field Is Empty";
      return
    } else if(!this.email.match(this.validRegex)){
      this.errorMessage = "Invalid Email Format"
    }
    else {
      this.autService.login(this.email, this.password).subscribe({
        next: (response) => {
          let token = response.headers.get('rolodex-token');
          sessionStorage.setItem('token', token);
          this.route.navigate(['home'])
        },
        error: (error) => {
          this.errorMessage ="Invalid Username/Password";
        }
      })
    }
  }

}

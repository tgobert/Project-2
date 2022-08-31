import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fname: string = '';
  lname: string = '';
  email: string = '';
  age: number = 0;
  dlnum: string = '';
  password: string = '';
  cpassword: string = '';
  errorMessage: string = '';
  validEmail: boolean = true;
  readonly validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  readonly letters = /^[A-Za-z]+$/;
  readonly alphanum = /^([a-zA-Z0-9 _-]+)$/;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  register() {
    if (!this.fname.trim() || !this.lname.trim() || !this.password.trim() || !this.email.trim() || !this.dlnum.trim()) {
      this.errorMessage = "A Field Is Empty";
      return
    } else if (this.password !== this.cpassword) {
      this.errorMessage = "Passwords Do Not Match";
      return
    } else if (this.age < 18) {
      this.errorMessage = "Must Be 18 Or Older To Register";
      return
    } else if (!this.email.match(this.validRegex)) {
      this.errorMessage = "Invalid Email Format"
      return
    }else if(!this.fname.match(this.letters) || !this.lname.match(this.letters) ){
      this.errorMessage = "Name Can Only Contain Letters"
    }else if(!this.dlnum.match(this.alphanum)){
      this.errorMessage = "Invalid Driver License Format"
      return
    }
    else {
      this.authService.register(this.fname, this.lname, this.email, this.age, this.dlnum, this.password).subscribe({
        next: (response) => {
          let token = response.headers.get('rolodex-token');
          sessionStorage.setItem('token', token);
          this.route.navigate(['home'])
        },
        error: (error) => {
          this.errorMessage = "Invalid User Input"
        }
      })
    }
  }

}

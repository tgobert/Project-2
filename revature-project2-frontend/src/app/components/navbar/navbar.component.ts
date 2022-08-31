import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
loggedIn: boolean = false;
  constructor(private route:Router) { }

  ngOnInit(): void {
this.loggedin()
  }

  loggedin(){
    let token = sessionStorage.getItem('token');
    if(token){
      this.loggedIn = true
    }else{
      this.loggedIn;
    }
  }

  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('vehicle');
    this.route.navigate(['/'])
  }
}

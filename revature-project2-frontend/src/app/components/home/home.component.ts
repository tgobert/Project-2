import { AppComponent } from './../../app.component';
import { ClientMessage } from './../../models/client-message';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Car } from 'src/app/models/car';
import { Router, RouterLink } from '@angular/router';
import { RentalComponent } from '../rental/rental.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  title = 'Home Page'
  sedan1: Car = new Car('A', 'A', 0, 'A', 0, 'A')
  sedan2: Car = new Car('A', 'A', 0, 'A', 0, 'A')
  suv1: Car = new Car('A', 'A', 0, 'A',  0, 'A')
  suv2: Car = new Car('A', 'A', 0, 'A',  0, 'A')
  truck1: Car = new Car('A', 'A', 0, 'A', 0, 'A')
  truck2: Car = new Car('A', 'A', 0, 'A', 0, 'A')
  van1: Car = new Car('A', 'A', 0, 'A', 0, 'A')
  van2: Car = new Car('A', 'A', 0, 'A', 0, 'A')
  clientMessage: ClientMessage = new ClientMessage('');
  


  constructor(private apiService: ApiService, public appComponent: AppComponent, private router: Router) { }

  getSuvs() {
    this.apiService.getSuvList()
    .subscribe({
      next: (data) => {
        this.suv1.car_make = data[0].make;
        this.suv1.car_model = data[0].model;
        this.suv1.car_year = data[0].year;
        this.suv1.car_class = data[0].class;
        this.suv1.combination_mpg = data[0].combination_mpg;
        this.suv1.car_trans= data[0].transmission;
        this.suv2.car_make = data[1].make;
        this.suv2.car_model = data[1].model;
        this.suv2.car_year = data[1].year;
        this.suv2.car_class = data[1].class;
        this.suv2.combination_mpg = data[1].combination_mpg;
        this.suv2.car_trans= data[1].transmission;
      },
      error: () => this.clientMessage.message = `Could not find vehicle.`,
      complete: () => console.log('complete')
    })
  }

  getTrucks() {
    this.apiService.getTruckList()
    .subscribe({
      next: (data) => {
        this.truck1.car_make = data[0].make;
        this.truck1.car_model = data[0].model;
        this.truck1.car_year = data[0].year;
        this.truck1.car_class = data[0].class;
        this.truck1.combination_mpg = data[0].combination_mpg;
        this.truck1.car_trans= data[0].transmission;
        this.truck2.car_make = data[1].make;
        this.truck2.car_model = data[1].model;
        this.truck2.car_year = data[1].year;
        this.truck2.car_class = data[1].class;
        this.truck2.combination_mpg = data[1].combination_mpg;
        this.truck2.car_trans= data[1].transmission;
      },
      error: () => this.clientMessage.message = `Could not find vehicle.`,
      complete: () => console.log('complete')
    })
  }

  getVans() {
    this.apiService.getVanList()
    .subscribe({
      next: (data) => {
        this.van1.car_make = data[0].make;
        this.van1.car_model = data[0].model;
        this.van1.car_year = data[0].year;
        this.van1.car_class = data[0].class;
        this.van1.combination_mpg = data[0].combination_mpg;
        this.van1.car_trans= data[0].transmission;
        this.van2.car_make = data[1].make;
        this.van2.car_model = data[1].model;
        this.van2.car_year = data[1].year;
        this.van2.car_class = data[1].class;
        this.van2.combination_mpg = data[1].combination_mpg;
        this.van2.car_trans= data[1].transmission;
      },
      error: () => this.clientMessage.message = `Could not find vehicle.`,
      complete: () => console.log('complete')
    })
  }

  getSedans() {
    this.apiService.getSedanList()
    .subscribe({
      next: (data) => {
        this.sedan1.car_make = data[0].make;
        this.sedan1.car_model = data[0].model;
        this.sedan1.car_year = data[0].year;
        this.sedan1.car_class = data[0].class;
        this.sedan1.combination_mpg = data[0].combination_mpg;
        this.sedan1.car_trans = data[0].transmission;
        this.sedan2.car_make = data[1].make;
        this.sedan2.car_model = data[1].model;
        this.sedan2.car_year = data[1].year;
        this.sedan2.car_class = data[1].class;
        this.sedan2.combination_mpg = data[1].combination_mpg;
        this.sedan2.car_trans= data[1].transmission;
      },
      error: () => this.clientMessage.message = `Could not find vehicle.`,
      complete: () => console.log('complete')
    })
  }

  sedanOne() {
    sessionStorage.setItem('vehicle', 's1');
    this.router.navigate(['/rental']);
  }

  sedanTwo() {
    sessionStorage.setItem('vehicle', 's2');
    this.router.navigate(['/rental']);
  }

  suvOne() {
    sessionStorage.setItem('vehicle', 'su1');
    this.router.navigate(['/rental']);
  }

  suvTwo() {
    sessionStorage.setItem('vehicle', 'su2');
    this.router.navigate(['/rental']);
  }

  truckOne() {
    sessionStorage.setItem('vehicle', 't1');
    this.router.navigate(['/rental']);
  }

  truckTwo() {
    sessionStorage.setItem('vehicle', 't2');
    this.router.navigate(['/rental']);
  }

  vanOne() {
    sessionStorage.setItem('vehicle', 'v1');
    this.router.navigate(['/rental']);
  }

  vanTwo() {
    sessionStorage.setItem('vehicle', 'v2');
    this.router.navigate(['/rental']);
  }

  clearCar() {
    sessionStorage.removeItem('vehicle');
  }

  ngOnInit(): void {
    this.clearCar();
    this.getSedans();
    this.getSuvs();
    this.getTrucks();
    this.getVans();
  }

}

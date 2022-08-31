import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientMessage } from './../../models/client-message';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/services/api.service';
import { Car } from 'src/app/models/car';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  selectedCar: Car = new Car('A', 'A', 0, 'A', 0, 'A');
  clientMessage: ClientMessage = new ClientMessage('');
  rentDate: string = '';
  rentDateU;
  returnDate: string = '';
  returnDateU;
  rentalInfo: {} = {};
  days: number;
  carImg: string = '';
  price: number = 0;
  dollarPrice: string;
  calc: number = 0;
  billing: number;
  ins: boolean = false;
  errorMessage: string = '';
  success: string = '';
  cCN;
  bA;
  cDate;
  cDateU;

  constructor(private apiService: ApiService, public appComponent: AppComponent, private router: Router) { }

  async sendInfo() {
    if (!this.rentDateU) {
      this.errorMessage = "You must input a rental date.";
      return
    }else if(this.rentDateU < this.cDateU) {
      this.errorMessage = "You cannot select a past date.";
      return
    }else if (!this.returnDateU) {
      this.errorMessage = "You must input a return date.";
      return
    }else if (!this.cCN || !this.bA) {
      this.errorMessage = "You must input Credit Card and Billing Address.";
      return
    }
    else {
    }
    this.success = "Your car rental order has been placed!";
    await this.delay(2000);
    this.rentalInfo = {
      "rent_date": this.rentDateU,
      "return_date": this.returnDateU,
      "rent_price": this.price,
      "car_make": this.selectedCar.car_make,
      "car_model": this.selectedCar.car_model,
      "car_year": this.selectedCar.car_year,
      "car_class": this.selectedCar.car_class,
      // this.rentalInfo.push({"mpg" : this.selectedCar.combination_mpg})
      "car_trans": this.selectedCar.car_trans
    }

    this.apiService.sendRental(this.rentalInfo)
      .subscribe({
        next: (data) => {
          this.router.navigate(['profile']);
        },
        error: () => this.clientMessage.message = `Could not find vehicle.`,
        complete: () => console.log('complete')
      })
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getCurrentDate() {
    this.cDate = new Date();
    this.cDateU = (this.cDate.getTime()/1000) - 86400;
  }
  
  priceChange() {
    if(this.days) {
      let car = sessionStorage.getItem('vehicle')
      if(car === 's1' || car === 's2') {
        this.calc = this.days * 30;
        this.price = this.calc;
        if(this.price == 0) {
          this.price += 30;
        }
        if(this.ins) {
          this.price += 40;
        }
      } else if(car === 'v1' || car === 'v2') {
        this.calc = this.days * 40;
        this.price = this.calc;
        if(this.ins) {
          this.price += 40;
        }
      } else if(car === 'su1' || car === 'su2') {
        this.calc = this.days * 45;
        this.price = this.calc;
        if(this.ins) {
          this.price += 40;
        }
      } else {
        this.calc = this.days * 50;
        this.price = this.calc;
        if(this.ins) {
          this.price += 40;
        }
      }
      if(this.price < 0) {
        this.price = 0;

      }
    this.dollarPrice = "$" + this.price + ".00"
    }
  }

  calculatePrice() {
    this.days = ((this.returnDateU - this.rentDateU) / 86400) + 1
    this.priceChange()
  }

  setRentDate() {
    let currentDate = new Date(this.rentDate);
    this.rentDateU = Math.floor(currentDate.getTime() / 1000 + 86400);
    if (this.returnDateU)
      console.log(this.rentDateU)
      this.calculatePrice()
  }

  setReturnDate() {
    let currentDate = new Date(this.returnDate);
    this.returnDateU = Math.floor(currentDate.getTime() / 1000 + 86400);
    if (this.rentDateU)
      console.log(this.returnDateU)
      this.calculatePrice()
  }

  setInsurance() {
    this.ins = !this.ins;
    if (this.ins == true) {
      this.price += 40;
    } else {
      this.price -= 40;
    }

    this.priceChange();

  }

  sessVar() {
    let car = sessionStorage.getItem('vehicle')
    if (car === 'v2') {
      this.carImg = '../../../assets/volkswagen-vanagon-m.jpg'
      this.apiService.getVanList()

      .subscribe({
        next: (data) => {
          this.selectedCar.car_make = data[1].make;
          this.selectedCar.car_model = data[1].model;
          this.selectedCar.car_year = data[1].year;
          this.selectedCar.car_class = data[1].class;
          this.selectedCar.combination_mpg = data[1].combination_mpg;
          this.selectedCar.car_trans = data[1].transmission;
          console.log(data);
        },
        error: () => this.clientMessage.message = `Could not find vehicle.`,
        complete: () => console.log('complete')
      })
    } else if(car === 's1') {
      this.carImg = '../../../assets/volkswagen-passat-a.jpg'
      this.apiService.getSedanList()
      .subscribe({
        next: (data) => {
          this.selectedCar.car_make = data[0].make;
          this.selectedCar.car_model = data[0].model;
          this.selectedCar.car_year = data[0].year;
          this.selectedCar.car_class = data[0].class;
          this.selectedCar.combination_mpg = data[0].combination_mpg;
          this.selectedCar.car_trans = data[0].transmission;
          console.log(data);
        },
        error: () => this.clientMessage.message = `Could not find vehicle.`,
        complete: () => console.log('complete')
      })
    } else if(car === 's2') {
      this.carImg = '../../../assets/volkswagen-passat-m.jpg'
      this.apiService.getSedanList()
      .subscribe({
        next: (data) => {
          this.selectedCar.car_make = data[1].make;
          this.selectedCar.car_model = data[1].model;
          this.selectedCar.car_year = data[1].year;
          this.selectedCar.car_class = data[1].class;
          this.selectedCar.combination_mpg = data[1].combination_mpg;
          this.selectedCar.car_trans = data[1].transmission;
          console.log(data);
        },
        error: () => this.clientMessage.message = `Could not find vehicle.`,
        complete: () => console.log('complete')
      })
    } else if(car === 'su1') {
      this.carImg = '../../../assets/mazda-navajo-a.jpg'
      this.apiService.getSuvList()
      .subscribe({
        next: (data) => {
          this.selectedCar.car_make = data[0].make;
          this.selectedCar.car_model = data[0].model;
          this.selectedCar.car_year = data[0].year;
          this.selectedCar.car_class = data[0].class;
          this.selectedCar.combination_mpg = data[0].combination_mpg;
          this.selectedCar.car_trans = data[0].transmission;
          console.log(data);
        },
        error: () => this.clientMessage.message = `Could not find vehicle.`,
        complete: () => console.log('complete')
      })
    } else if(car === 'su2') {
      this.carImg = '../../../assets/mazda-navajo-m.jpg'
      this.apiService.getSuvList()
      .subscribe({
        next: (data) => {
          this.selectedCar.car_make = data[1].make;
          this.selectedCar.car_model = data[1].model;
          this.selectedCar.car_year = data[1].year;
          this.selectedCar.car_class = data[1].class;
          this.selectedCar.combination_mpg = data[1].combination_mpg;
          this.selectedCar.car_trans = data[1].transmission;
          console.log(data);
        },
        error: () => this.clientMessage.message = `Could not find vehicle.`,
        complete: () => console.log('complete')
      })
    } else if(car === 't1') {
      this.carImg = '../../../assets/ford-f150-a.jpg'
      this.apiService.getTruckList()
      .subscribe({
        next: (data) => {
          this.selectedCar.car_make = data[0].make;
          this.selectedCar.car_model = data[0].model;
          this.selectedCar.car_year = data[0].year;
          this.selectedCar.car_class = data[0].class;
          this.selectedCar.combination_mpg = data[0].combination_mpg;
          this.selectedCar.car_trans = data[0].transmission;
          console.log(data);
        },
        error: () => this.clientMessage.message = `Could not find vehicle.`,
        complete: () => console.log('complete')
      })
    } else if(car === 't2') {
      this.carImg = '../../../assets/ford-f150-m.jpg'
      this.apiService.getTruckList()
      .subscribe({
        next: (data) => {
          this.selectedCar.car_make = data[1].make;
          this.selectedCar.car_model = data[1].model;
          this.selectedCar.car_year = data[1].year;
          this.selectedCar.car_class = data[1].class;
          this.selectedCar.combination_mpg = data[1].combination_mpg;
          this.selectedCar.car_trans = data[1].transmission;
          console.log(data);
        },
        error: () => this.clientMessage.message = `Could not find vehicle.`,
        complete: () => console.log('complete')
      })
    } else if(car === 'v1') {
      this.carImg = '../../../assets/volkswagen-vanagon-a.jpg'
      this.apiService.getVanList()
      .subscribe({
        next: (data) => {
          this.selectedCar.car_make = data[0].make;
          this.selectedCar.car_model = data[0].model;
          this.selectedCar.car_year = data[0].year;
          this.selectedCar.car_class = data[0].class;
          this.selectedCar.combination_mpg = data[0].combination_mpg;
          this.selectedCar.car_trans = data[0].transmission;
          console.log(data);
        },
        error: () => this.clientMessage.message = `Could not find vehicle.`,
        complete: () => console.log('complete')
      })
    }    
  }

  ngOnInit(): void {
    this.sessVar()
    this.getCurrentDate()
  }

}

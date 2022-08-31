import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    Aos.init();
  }

  carImage = 'assets/car.jpg';
  carsImage = 'assets/cars.jpg';
  fDriver = 'assets/fDriver.jpg';
  fCar = 'assets/familyCar.jpg';
}

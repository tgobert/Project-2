export class Car {
    car_make: string;
    car_model: string;
    car_year: number;
    car_class: string;
    combination_mpg: number;
    car_trans: string;

    constructor(make: string, model: string, v_year: number, v_class: string, combination_mpg: number,
 trans: string) {
        this.car_make = make
        if(this.car_model === 'f150 pickup 2wd') {
          this.car_model = 'F150'
        } else {
          this.car_model = model
        }
        this.car_model = model
        this.car_year = v_year
        this.car_class = v_class
        this.combination_mpg = combination_mpg
        this.car_trans = trans
      }
}
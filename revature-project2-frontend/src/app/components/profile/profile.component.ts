import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
pastRentalInfo: any[] =[];
currentRentalInfo: any[] =[];
futureRentalInfo: any[] =[];
showField: boolean = false;
tDate: number= new Date().getTime()/1000;
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.getRentals()
  }

  setShowField(){
    this.showField = !this.showField
  }

  getRentals(){
    const todaysDate = new Date()
    let unixDate = Math.floor(todaysDate.getTime()/1000)
    this.apiService.getRentals().subscribe({
      next:(response)=>{
        response.forEach(rental =>{
          if(rental.return_date < unixDate){
            this.pastRentalInfo.push(rental);
          }else if((rental.return_date >= unixDate) &&(rental.rent_date <= unixDate)){
            this.currentRentalInfo.push(rental);
          }else{
            this.futureRentalInfo.push(rental);
          }
        })
      }
    })
  }
}

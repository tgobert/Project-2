import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  firstName: string = "";
  lastName: string = "";
  emailId: string = "";
  driverLicense: string = "";
  profileID: string = "";
  age: number = -1;

  newPasswordOne: string = "";
  newPasswordTwo: string = "";

  errorMessage: string = "";
  errorDispaly: boolean = false;
  errorAlertCSSClass: string = "";

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getProfileInfo();
  }

  // API Requests
  getProfileInfo() {
    this.apiService.getProfileInfo().subscribe({
      next: (response) => {
        this.firstName = this.capitalizeFirstLetter(response.f_name);
        this.lastName = this.capitalizeFirstLetter(response.l_name);
        this.emailId = response.email.toLowerCase();
        this.driverLicense = response.dr_lic_number;
        this.profileID = response.user_id;
        this.age = response.age;
      }
    })
  }

  // Help Methods
  capitalizeFirstLetter(userInput: String) {
    return userInput.charAt(0).toUpperCase() + userInput.slice(1);
  }

  showErrorMessage(inputText: string, isSuccess: boolean) {
    if (isSuccess) {
      this.errorAlertCSSClass = "alert alert-success";
    } else {
      this.errorAlertCSSClass = "alert alert-danger";
    }
    this.newPasswordOne = "";
    this.newPasswordTwo = "";
    this.errorMessage = inputText;
    this.errorDispaly = true;
  }

  // Events + API Requests
  updatePassword() {
    this.errorDispaly = false;
    if ((this.newPasswordOne.length == 0) || (this.newPasswordTwo.length == 0)) {
      this.showErrorMessage("Error: one of two fields is empty", false);
      return null;
    } else if (this.newPasswordOne !== this.newPasswordTwo) {
      this.showErrorMessage("Error: fields do not match", false);
      return null;
    } else {
      console.log(this.newPasswordOne, this.newPasswordTwo);
      let newPassword = {
        "username": this.emailId,
        "password": this.newPasswordOne
      }
      this.apiService.updateUserPassword(newPassword).subscribe({
        next: (response) => {
          if (response.pass == this.newPasswordOne) {
            this.showErrorMessage("Success: password is updated", true);
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }

}

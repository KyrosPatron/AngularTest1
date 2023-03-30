import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from './services/userservice.service';
import { User, UserFromJson } from './types/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestAngular';
  usrArr: User[] = [];
  error: string | null = null;
  isOk: boolean = false;

  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required)
  });

  newUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  constructor(private userService: UserserviceService) { }

  getUsrArray() {
    this.userService.getUsers().subscribe({
      next: (data: UserFromJson) => {
        this.usrArr = data.users;
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = "An error occurred"
        if (error.error instanceof ErrorEvent) {
          // Client-side errors
          errorMessage = `Client Error: ${error.error.message}`;
        } else {
          // Server-side errors
          errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        alert("C'è stato un errore con il server, riprova più tardi.");
        console.error(errorMessage, { error });
      }
    });
  }

  onSubmit() {
    this.newUser.firstName = this.userForm.value.firstName as string;
    this.newUser.lastName = this.userForm.value.lastName as string;
    this.newUser.email = this.userForm.value.email as string;
    this.newUser.phone = this.userForm.value.phone as string;
    this.userForm.reset();
    this.userService.postUser(this.newUser).subscribe({
      next: (data: User) => {
        this.isOk = true;
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = "An error occurred"
        if (error.error instanceof ErrorEvent) {
          // Client-side errors
          errorMessage = `Client Error: ${error.error.message}`;
        } else {
          // Server-side errors
          errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.isOk = false;
        alert("C'è stato un errore con il server, riprova più tardi.");
        console.error(errorMessage, { error });
      }
    });
  }

  emptyUsrArray() {
    this.usrArr = [];
  }

}

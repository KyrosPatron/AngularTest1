import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserFromJson } from '../types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  baseUrl: string = 'https://dummyjson.com';
  constructor(private http: HttpClient) { }
  //GET request
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url);
  }

  //POST request
  post<T>(url: string, body: User): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, body);
  }

  //Take all users from the server
  getUsers(): Observable<UserFromJson> {
    return this.get<UserFromJson>('/users');
  }

  //Send a new user to add at the server
  postUser(user: User): Observable<User> {
    return this.post<User>('/users/add', user);
  }
}

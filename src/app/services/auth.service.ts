import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl="https://whispering-savannah-91378.herokuapp.com"
  private authUser:any=null;
  private authenticated:boolean=false;
  constructor(private http:HttpClient) { }
  isAuthenticated(){

    return this.authenticated;
  }
  setAuthentication(value:boolean){
this.authenticated=value;
  }
  loginUser(credentials){
    return this.http.post(`${this.baseUrl}/auth/signin`,credentials)
  }
  signupUser(userData){
    return this.http.post(`${this.baseUrl}/auth/signup`,userData)
  }
  setUser(user){
    this.authUser=user
  }
  getUser(){
    return this.authUser;
  }
}

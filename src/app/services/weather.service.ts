import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {apiKey} from "../env/env"
@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  constructor(private http:HttpClient) { }
  getWeatherByCityName(city:string){
    let jsonData;
   let reqUri= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    
    return this.http.get(reqUri)
  }
  getWeatherByLatitude(lat:number,lon:number){
    let reqUri = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    return this.http.get(reqUri)
  }
}

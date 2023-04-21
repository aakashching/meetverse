import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {apiKey,socketUrl} from "../env/env"
@Injectable({
  providedIn: 'root'
})
export class WeatherService {


  constructor(private http:HttpClient) { }
  getWeatherByCityName(city:string){
    let jsonData;
   let reqUri= `${socketUrl}?q=${city}`
    
    return this.http.get(reqUri)
  }
  getWeatherByLatitude(lat:number,lon:number){
    let reqUri = `${socketUrl}?lat=${lat}&lon=${lon}`
    return this.http.get(reqUri)
  }
}

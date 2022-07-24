import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey="9374ee2a360f6bf91a5adb0cdac1d22a";
  constructor(private http:HttpClient) { }
  getWeatherByCityName(city:string){
    let jsonData;
   let reqUri= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`
    
    return this.http.get(reqUri)
  }
  getWeatherByLatitude(lat:number,lon:number){
    let reqUri = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
    return this.http.get(reqUri)
  }
}

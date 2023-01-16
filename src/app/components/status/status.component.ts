import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
  change(){
    setTimeout(() =>{
      let doc = document.querySelector(".logo-container")
      doc.innerHTML=` <h3
      routerLink="/"
      style="display: flex; align-items: center; cursor: pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        class="logo"
        style="--color: rgb(136, 238, 221); --accent: rgb(136, 170, 221)"
        viewBox="0 0 192.756 192.756"
      >
        <g fill-rule="evenodd" clip-rule="evenodd">
          <path fill="#fff" fill-opacity="0" d="M0 0h192.756v192.756H0V0z" />
          <path
            d="M28.585 96.381c0-37.441 30.352-67.793 67.794-67.793 37.441 0 67.793 30.352 67.793 67.793s-30.352 67.794-67.793 67.794c-37.442 0-67.794-30.353-67.794-67.794zm-12.328-.003c0-44.25 35.871-80.12 80.121-80.12 44.249 0 80.12 35.871 80.12 80.12 0 44.25-35.871 80.121-80.12 80.121-44.25 0-80.121-35.871-80.121-80.121zm110.936-8.214a6.164 6.164 0 0 0-12.326 0v10.271c0 10.211-8.277 18.489-18.488 18.489S77.89 108.646 77.89 98.435l-.001-10.271a6.163 6.163 0 1 0-12.326 0l.001 26.706H53.238V88.164c0-10.212 8.278-18.489 18.489-18.489s18.49 8.277 18.49 18.489v10.271a6.162 6.162 0 1 0 12.325 0V88.164c0-10.212 8.279-18.489 18.49-18.489s18.488 8.277 18.488 18.489v26.706h-12.326V88.164h-.001z"
          />
        </g>
      </svg>
      eetverse
    </h3>`},1000)
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

 @Input() xPhotoUrl: string;
 @Input() oPhotoUrl: string;
 @Input() winner: string;
 photo: string;
 value: string;
 touched: boolean = false;

  constructor() { }

  ngOnInit() {
    this.value = '_';
    this.clicked(this.value);
    this.touched = false;
  }

  clicked(value){
    if(!this.touched && !this.winner){
      switch (value) {
        case '_': {
          this.photo =  "../../../assets/img/" + value + ".png";
          this.value = value;
          break;
        }
        case 'X': {
          this.photo =  this.xPhotoUrl;
          this.value = value;
          break;
        }
        case 'O': {
          this.photo =  this.oPhotoUrl;
          this.value = value;
          break;
        }

        default:
          break;
      }
      this.touched=true;
    }

}

hello() {
  console.log("dwaadw");

}

}

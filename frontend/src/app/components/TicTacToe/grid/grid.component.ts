import { Component, OnInit } from '@angular/core';
import { MarvelApiService } from 'src/app/services/marvel-api.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  characters: any;
  show = true;
  turn: string = 'X';
  imgUrlForX: string;
  imgUrlForO: string;
  nOsquares = Array(9).fill(null); //folosit doar la iterare
  records = Array<string>(9).fill(null); //stocheaza istoria punctelor marcate
  winner:string = null;
  constructor(private marvelApi: MarvelApiService) { }

ngOnInit() {
  this.marvelApi.getAllCharacters().subscribe(x => {
    this.characters = x
    console.log(x);
    this.imgUrlForX = x.data.results[0].thumbnail.path + "." + x.data.results[0].thumbnail.extension;
    this.imgUrlForO = x.data.results[x.data.results.length-1].thumbnail.path + "." + x.data.results[x.data.results.length-1].thumbnail.extension;
  })
 }

makeMove(index: number){
  if(!this.records[index]){
    this.records.splice(index, 1, this.turn);
    this.turn === 'O' ? this.turn = 'X' : this.turn = 'O';

    switch (this.calculateWinner()) {
      case null:
        this.winner = null;
        break;
      case 'O':
        this.winner = this.characters.data.results[0].name;
        break;
      case 'X':
        this.winner = this.characters.data.results[this.characters.data.results.length-1].name;
        break;
      default:
        break;
    }
  }
}

resetGame(){
  setTimeout(() => {
    this.show = false;
    setTimeout(() => this.show = true, 30)
  }, 30);
  this.records = new Array<string>(9).fill(null);
  this.turn = 'X';
  this.winner = null;
}

calculateWinner(){
  if(this.winner)
  return this.winner;

  const lines = [[0,1,2],[3,4,5],
  [6,7,8], [0,3,6],[1,4,7],
  [2,5,8],[0,4,8],[2,4,6]];

  for(let i = 0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    if(
      this.records[a] &&
      this.records[a] === this.records[b] &&
      this.records[a] === this.records[c]
    ) {
      console.log("We have a winner!!!",this.records[a] )
      return this.records[a] //=== 'X' ? this.characters.data.results[0].name :  this.records[a] === 'O' ? this.characters.data.results[this.characters.data.results.length-1].name : null ;
    }
  }
  return null;
}

}

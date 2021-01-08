import { Component, OnInit } from '@angular/core';
import { MarvelApiService } from 'src/app/services/marvel-api.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  characters: any[];
  show = true;
  turn: string = 'X';
  imgUrlForX: string;
  imgUrlForO: string;
  xInArray: any;
  oInArray: any;
  nOsquares = Array(9).fill(null); //used only for interation
  records = Array<string>(9).fill(null); //keeps a record on the ponts that have been marked
  winner: string = null;
  winnerDetails: string=null;
  comics: number[] = [];

  constructor(private marvelApi: MarvelApiService) { }

ngOnInit() {
  this.initialiseGame();
 }

makeMove(index: number) {
  if(!this.records[index]){
    this.records.splice(index, 1, this.turn);
    this.turn === 'O' ? this.turn = 'X' : this.turn = 'O';

    switch (this.calculateWinner()) {
      case null:
        this.winner = null;
        break;
      case 'X':{
        this.winnerDetails = this.xInArray.description
        this.winner = this.xInArray.name;
      }
        break;
      case 'O':{
        this.winnerDetails = this.oInArray.description
        this.winner = this.oInArray.name;
      }
        break;
      default:
        break;
    }
  }
}

resetGame() {
  setTimeout(() => {
    this.show = false;
    setTimeout(() => this.show = true, 30)
  }, 30);
  this.records = new Array<string>(9).fill(null);
  this.turn = 'X';
  this.winner = null;
}

calculateWinner() {
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
      return this.records[a]
    }
  }
  return null;
}

initialiseGame() {
//Add random comics ids to the comics array
  //Select 10 random numbers between 100 and 700(most exciting comics) to use them as url params for the marvel API
  this.comics = this.marvelApi.randomIntsFromInterval(100,700,10);
  console.log(this.comics)

  //Call Marvel Api
  this.marvelApi.getCharactersFromComics(this.marvelApi.arrayToIdsWithSeparator(this.comics, '%2C')).subscribe(x => {
    //Store characters in array
    this.characters = x.data.results;

    //User characters besed on random indexes using Api data
    this.xInArray = this.characters[this.marvelApi.randomIntsFromInterval(0,this.characters.length-1,1)[0]];

    //Make sure we don't use the same character twice(as unlikely as it may be)
    let charactersExceptX = this.characters.filter(character => character !== this.xInArray);
    this.oInArray = charactersExceptX[this.marvelApi.randomIntsFromInterval(0,charactersExceptX.length-1,1)[0]];

    //Set image urls for the 2 players
    this.imgUrlForX = this.xInArray.thumbnail.path + "." + this.xInArray.thumbnail.extension;
    this.imgUrlForO = this.oInArray.thumbnail.path + "." + this.oInArray.thumbnail.extension;

    //Reset the game
    this.resetGame();
  })
}



}

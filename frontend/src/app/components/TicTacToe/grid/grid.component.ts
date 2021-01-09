import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MarvelApiService } from 'src/app/services/marvel-api.service';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  isOpen = false; //Overlay
  @ViewChildren("ig") squareComponentReferences: QueryList<SquareComponent>;
  playerMode: GameMode;
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
  color1: string = "";
  color2: string = "";
  startGame: boolean = false;

  constructor(private marvelApi: MarvelApiService) { }

ngOnInit() {
  this.initialiseGame();
 }

 ngAfterViewInit(): void { //Needed for 2 players to get a reference of all squares
  this.squareComponentReferences.forEach(element => {
    element.hello();
  });
}

makePlayerMove(index: number) {
  if(!this.winner){
    this.makeMove(index);
    if(this.playerMode == GameMode.twoPlayersEasy){
      this.makeEasyAiMove();
    }
    else if(this.playerMode == GameMode.twoPlayersMedium) {
      this.makeMediumAiMove();
    }
  }


}

makeMove(index: number) {
  if(!this.records[index]) {
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
      case 'D':{
        this.winner="Just a draw"
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
  return !this.checkIfThereAreEmptyPositions() ? 'D' : null;
}


initialiseGame() {
this.startGame = false;
 this.initialiseXandO();

//Add random comics ids to the comics array
  //Select 10 random numbers between 100 and 700(most exciting comics) to use them as url params for the marvel API
  this.comics = this.marvelApi.randomIntsFromInterval(100,700,10);

  //Call Marvel Api
  this.marvelApi.getCharactersFromComics(this.marvelApi.arrayToIdsWithSeparator(this.comics, '%2C')).subscribe(x => {

    //Store characters in array
    this.characters = x.data.results;

    //User characters besed on random indexes using Api data

    let imgNotAvailableUrl = "/image_not_available";

    let notProperThumbnailForxInArray = true;
    while(notProperThumbnailForxInArray){
      this.xInArray = this.characters[this.marvelApi.randomIntsFromInterval(0,this.characters.length-1,1)[0]];
      if(!this.xInArray.thumbnail.path.includes(imgNotAvailableUrl))
        notProperThumbnailForxInArray = false;
    }

    //Make sure we don't use the same character twice(as unlikely as it may be)
    let charactersExceptX = this.characters.filter(character => character !== this.xInArray);
    let notProperThumbnailForoInArray = true;
    while(notProperThumbnailForoInArray){
      this.oInArray = charactersExceptX[this.marvelApi.randomIntsFromInterval(0,charactersExceptX.length-1,1)[0]];
      if(!this.oInArray.thumbnail.path.includes(imgNotAvailableUrl))
        notProperThumbnailForoInArray = false;
    }

    //Set image urls for the 2 players
    this.imgUrlForX = this.xInArray.thumbnail.path + "." + this.xInArray.thumbnail.extension;
    this.imgUrlForO = this.oInArray.thumbnail.path + "." + this.oInArray.thumbnail.extension;

    //Generate 2 random colors for combatants
    this.color1 = this.generateRandomColor();
    this.color2 = this.generateRandomColor();

    //Reset the game
    this.resetGame();
  })
}
  generateRandomColor() {
    var color = Math.floor(Math.random() * 16777216).toString(16);
    return '#000000'.slice(0, -color.length) + color;
  }

  initialiseXandO() {
    this.xInArray = null;
    this.oInArray = null;
    this.imgUrlForX = null;
    this.imgUrlForO = null;
  }

  makeEasyAiMove() {
    for (let index = 0; index < this.squareComponentReferences.length; index++) {
      if(!this.records[index]){
        this.squareComponentReferences.toArray()[index].clicked(this.turn)
        this.makeMove(index);
        break;
      }
    }
  }

  makeMediumAiMove() {
   while(true && this.checkIfThereAreEmptyPositions()) {
    let randomIndex = this.marvelApi.randomIntsFromInterval(0, this.squareComponentReferences.length -1, 1)[0];
    if(!this.records[randomIndex]){
      this.squareComponentReferences.toArray()[randomIndex].clicked(this.turn)
      this.makeMove(randomIndex);
      break;
    }
   }
  }

  log(message) {
    console.log(message)
  }

  checkIfThereAreEmptyPositions() {
    var result: boolean = false;
    this.records.forEach(position => {
      if(position == null)
        result = true;
    });
    return result;
  }

}

export enum GameMode {
  onePlayer = 1,
  twoPlayersEasy = 2,
  twoPlayersMedium = 3,
  twoPlayersHard = 4,
}




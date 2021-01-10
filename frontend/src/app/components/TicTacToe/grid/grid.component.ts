import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MarvelApiService } from 'src/app/services/marvel-api.service';
import { SquareComponent } from '../square/square.component';
import * as _ from 'lodash';

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
  aiMovesFirst: boolean = false;

  constructor(private marvelApi: MarvelApiService) { }

ngOnInit() {
  this.initialiseGame();
 }

 ngAfterViewInit(): void { //Needed for 2 players to get a reference of all squares
  this.squareComponentReferences.forEach(element => {
    // element.hello();
  });
}

makePlayerMove(index: number) {
  if(!this.winner && this.show){
    this.makeMove(index);
    if(this.playerMode == GameMode.twoPlayersEasy){
      this.makeEasyAiMove();
    }
    else if(this.playerMode == GameMode.twoPlayersMedium) {
      this.makeMediumAiMove();
    }
    else if(this.playerMode == GameMode.twoPlayersExpert) {
      this.makeExpertAiMove();
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
    setTimeout(() => {
      this.show = true;
      this.records = new Array<string>(9).fill(null);
      this.turn = this.aiMovesFirst ? 'O' : 'X';
      this.winner = null;
      setTimeout(() => {
        if(this.aiMovesFirst)
      this.FirstAiMove()
      }, 40);
    }, 30)
  }, 30);

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
      if(!this.records[index] && this.squareComponentReferences.toArray()[index]){
        this.squareComponentReferences.toArray()[index].clicked(this.turn)
        this.makeMove(index);
        break;
      }
    }
  }

  makeMediumAiMove() {
   while(true && this.checkIfThereAreEmptyPositions()) {
    let randomIndex = this.marvelApi.randomIntsFromInterval(0, this.squareComponentReferences.length -1, 1)[0];
    if(!this.records[randomIndex] && this.squareComponentReferences.toArray()[randomIndex]){
      this.squareComponentReferences.toArray()[randomIndex].clicked(this.turn)
      this.makeMove(randomIndex);
      break;
    }
   }
  }

  makeExpertAiMove() {
    if(this.checkIfThereAreEmptyPositions()){
      let jaggedArr = this.oneDimensionalArrayToJaggedTicTacToe(_.cloneDeep(this.records))
      console.log('jaggedArr',jaggedArr)
      let bestMove = this.findBestMove(jaggedArr);
      let index = this.findIndexBasedOnRowAndCol(bestMove.row, bestMove.col);
      console.log('bestMove',bestMove,'index',index);
      if(this.squareComponentReferences.toArray()[index]){
        this.squareComponentReferences.toArray()[index].clicked(this.turn)
        this.makeMove(index);
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

  FirstAiMove() {
    if(!this.winner && this.aiMovesFirst && this.playerMode)
      switch (this.playerMode) {
        case GameMode.twoPlayersEasy:
          this.makeEasyAiMove()
          break;
        case GameMode.twoPlayersMedium:
          this.makeMediumAiMove()
          break;
        case GameMode.twoPlayersExpert:
          this.makeExpertAiMove()
          break;
        default:
          break;
      }

  }
  //#region minMaxAlgoritm

  //Make our one dimensional Array with 9 elements into a jagged array(3x3)
  oneDimensionalArrayToJaggedTicTacToe(arr: any[9]){
    let jaggedArr: any[][] = [];
    jaggedArr[0] = [arr[0],arr[1],arr[2]];
    jaggedArr[1] = [arr[3],arr[4],arr[5]];
    jaggedArr[2] = [arr[6],arr[7],arr[8]];
    return jaggedArr;
  }

  areMovesLeft(arr: any[3][3])
{
    for (let i = 0; i < 3; i++)
        for (let j = 0; j<3; j++)
            if (arr[i][j]==null)
                return true;
    return false;
}

  evaluate(arr: any[3][3], playerSymbol="X", aiSymbol="O")
{
    // Checking for Rows for X or O victory.
    for (let row = 0; row < 3; row++)
    {
        if (arr[row][0]==arr[row][1] &&
          arr[row][1]==arr[row][2])
        {
            if (arr[row][0]==aiSymbol)
                return +10;
            else if (arr[row][0]==playerSymbol)
                return -10;
        }
    }

    // Checking for Columns for X or O victory.
    for (let col = 0; col<3; col++)
    {
        if (arr[0][col]==arr[1][col] &&
          arr[1][col]==arr[2][col])
        {
            if (arr[0][col]==aiSymbol)
                return +10;

            else if (arr[0][col]==playerSymbol)
                return -10;
        }
    }

    // Checking for Diagonals for X or O victory.
    if (arr[0][0]==arr[1][1] && arr[1][1]==arr[2][2])
    {
        if (arr[0][0]==aiSymbol)
            return +10;
        else if (arr[0][0]==playerSymbol)
            return -10;
    }

    if (arr[0][2]==arr[1][1] && arr[1][1]==arr[2][0])
    {
        if (arr[0][2]==aiSymbol)
            return +10;
        else if (arr[0][2]==playerSymbol)
            return -10;
    }

    // Else if none of them have won then return 0
    return 0;
}

// This is the minimax function. It considers all
// the possible ways the game can go and returns
// the value of the board
minimax(arr: any[3][3], depth: number, isMax: boolean, playerSymbol="X", aiSymbol="O" )
{
    let score: number = this.evaluate(arr);

    // If Maximizer has won the game return it's
    // evaluated score
    if (score == 10)
        return score;

    // If Minimizer has won the game return it's
    // evaluated score
    if (score == -10)
        return score;

    // If there are no more moves and no winner then
    // it is a tie
    if (this.areMovesLeft(arr)==false)
    return 0;


    // If this maximizer's move
    if (isMax)
    {
        let best = -1000;

        // Traverse all cells
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                // Check if cell is empty
                if (arr[i][j]==null)
                {
                    // Make the move
                    arr[i][j] = aiSymbol;

                    // Call minimax recursively and choose
                    // the maximum value
                    best = Math.max( best,
                        this.minimax(arr, depth+1, !isMax) );

                    // Undo the move
                    arr[i][j] = null;
                }
            }
        }
        return best;
    }

    // If this minimizer's move
    else
    {
        let best = 1000;

        // Traverse all cells
        for (let i = 0; i<3; i++)
        {
            for (let j = 0; j<3; j++)
            {
                // Check if cell is empty
                if (arr[i][j]==null)
                {
                    // Make the move
                    arr[i][j] = playerSymbol;

                    // Call minimax recursively and choose
                    // the minimum value
                    best = Math.min(best,
                           this.minimax(arr, depth+1, !isMax));

                    // Undo the move
                    arr[i][j] = null;
                }
            }
        }
        return best;
    }
}

// This will return the best possible move for the player
findBestMove(arr: any[3][3], aiSymbol="O")
{
    let bestVal = -1000;
    let bestMove = {} as any;
    bestMove.row = -1;
    bestMove.col = -1;

    // Traverse all cells, evaluate minimax function for
    // all empty cells. And return the cell with optimal
    // value.
    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j<3; j++)
        {
            // Check if cell is empty
            if (arr[i][j]==null)
            {
                // Make the move
                arr[i][j] = aiSymbol;

                // compute evaluation function for this
                // move.
                let moveVal = this.minimax(arr, 0, false);

                // Undo the move
                arr[i][j] = null;

                // If the value of the current move is
                // more than the best value, then update
                // best/
                if (moveVal > bestVal)
                {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }

    console.log("The value of the best Move is : %d\n\n", bestVal);

    return bestMove;
}

  findIndexBasedOnRowAndCol(row: number, col: number) {
    // let index;
    // if(row == 0)
    // index = col;
    // else if(row == 1)
    // index = col + 3;
    // else if(row == 2)
    // index = col + 6;
    // return index;
    return row * 3 + col;
  }

  //#endregion

}

export enum GameMode {
  onePlayer = 1,
  twoPlayersEasy = 2,
  twoPlayersMedium = 3,
  twoPlayersExpert = 4,
}





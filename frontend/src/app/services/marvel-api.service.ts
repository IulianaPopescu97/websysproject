import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {

ALL_CHARACTERS_API_URL: string = environment.Marvel_Api_Characters_URL + environment.Marvel_Url_Param_Api_key + environment.Marvel_Public_Key;
CHARACTER_NAME_THAT_STARTS_WITH_API_URL: string = environment.Marvel_Api_Characters_URL + environment.Marvel_Url_Param_Character_Starts_With + environment.Marvel_Url_Param_Api_key + environment.Marvel_Public_Key;
ALL_STORIES_API_URL: string = environment.Marvel_Api_Stories_URL + environment.Marvel_Url_Param_Api_key + environment.Marvel_Public_Key;
CHARACTERS_THAT_APPEARED_IN_COMICS: string = environment.Marvel_Api_Characters_URL + environment.Marvel_Url_Param_Character_Appeared_In_Comics + environment.Marvel_Url_Param_Api_key + environment.Marvel_Public_Key;


  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<any> {
    return this.http.get<any>(this.ALL_CHARACTERS_API_URL);
  }

  getCharactersThatStartWith(nameStartsWith: string): Observable<any> {
    return this.http.get<any>(this.CHARACTER_NAME_THAT_STARTS_WITH_API_URL.replace("$nameStartsWith",nameStartsWith));
  }

  getCharactersFromComics(comics: string): Observable<any> {
    return this.http.get<any>(this.CHARACTERS_THAT_APPEARED_IN_COMICS.replace("$comics",comics));
  }

  getAllStories(): Observable<any> {
    return this.http.get<any>(this.ALL_STORIES_API_URL);
  }

  arrayToIdsWithSeparator(arr: any[], separator: string){
    let arrResult: string = "";
  for (let index = 0; index < arr.length; index++) {
    arrResult += (index == arr.length - 1) ? arr[index] : (arr[index] + separator);
  }
  return arrResult;
  }

  randomLetter( ) {
    let letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q"
        ,"r","s","t","u","v","w","x","y","z"];

    return letters[Math.floor(Math.random()*letters.length)];
  }

  randomIntsFromInterval(min: number, max: number, howManyNumbers: number) {
    let returnArr = [];
    for (let index = 0; index < howManyNumbers; index++) {
      let number=  Math.floor(Math.random() * (max - min + 1) + min);
      returnArr.push(number)
    }
    return returnArr;

  }

}

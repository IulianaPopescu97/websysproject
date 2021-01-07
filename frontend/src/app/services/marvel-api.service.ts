import { HttpClient } from '@angular/common/http';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';
import { map } from 'lodash';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {

PUBLIC_KEY: string = environment.Marvel_Public_Key;
PRIVATE_KEY: string = environment.Marvel_Private_Key;
URL_API: string = environment.Marvel_Api_URL + this.PUBLIC_KEY;


HASH = '';

  constructor(private http: HttpClient) { }

  getAllCharacters(): Observable<any> {
    return this.http.get<any>(this.URL_API)

  }
}

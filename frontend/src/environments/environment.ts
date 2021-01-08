// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  //#region APIs

  //Google Api
  Google_Url_Api_Key_: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD9EyBKBy4ZrXI42wOcVY6siGca-_O9EmU",

  //Ip Info Api
  Ip_Info_Url: "https://ipinfo.io/?token=",
  Ip_Info_Key: "df96ac341a7a8d",

  //Marvel Api
  Marvel_Public_Key: "4d26ed24fcfe1483aa578c9c9f49fc23",
  Marvel_Private_Key: "5154f85998a70bfb568b6b350a7ccc281d248125",

  Marvel_Api_URL_Common: "https://gateway.marvel.com:443/v1/public/",
  Marvel_Api_Characters_URL: "https://gateway.marvel.com:443/v1/public/characters?",
  Marvel_Api_Stories_URL: "https://gateway.marvel.com:443/v1/public/stories?",
  Marvel_Url_Param_Api_key: "apikey=",
  Marvel_Url_Param_Character_Starts_With: "nameStartsWith=$nameStartsWith&",
  Marvel_Url_Param_Character_Appeared_In_Comics: "comics=$comics&",
  //#endregion

  //Application
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

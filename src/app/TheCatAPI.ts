import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Breed } from './Cat';
import { Category } from './Cat';
import { SafeMethodCall } from '@angular/compiler';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// private enum ImageSize {
//   Full = "full",
//   Medium = "med",
//   Small = "small",
//   Thumb = "thumb",
// };

export class TheCatAPI {

  private filterUrlAPI = "https://api.thecatapi.com/v1";
  private API_KEY = "8874dda0-88e5-433d-9f5c-a31363479449";
  private httpOptions = {
    headers: new HttpHeaders({'x-api-key': this.API_KEY})
  };

  constructor(private http: HttpClient) { }

  // Images
  // https://docs.thecatapi.com/api-reference/images/images-search
  getImages( breedId: string = null, categoryIds: string = null, pageNumber: number = 1 ) {

    let imgUrl = `${this.filterUrlAPI}/images/search?`;
    
    if (breedId != null) {
      imgUrl = `${imgUrl}breed_id=${breedId}&`;
    }
    //TODO: enable multiple selection ?
    if (categoryIds != null) {
      imgUrl = `${imgUrl}category_ids=${categoryIds}&`;
    }

    // Additional Parameters
    imgUrl = `${imgUrl}limit=40&page=${pageNumber}`;

    console.log("IMAGE URL= " + imgUrl);

    return this.http.get(imgUrl, this.httpOptions);
  }

  getImage( imageId: string ) {
    let imgUrl = `${this.filterUrlAPI}/images/${imageId}`;

    console.log(`IMAGE URL = ${imgUrl}`);

    return this.http.get(imgUrl, this.httpOptions);
  }

  // Filters
  getBreeds() {
    const breedUrl = `${this.filterUrlAPI}/breeds`;
    return this.http.get(breedUrl);
  }

  getCategories() {
    var categoryUrl = `${this.filterUrlAPI}/categories`;
    return this.http.get(categoryUrl);
  }
}

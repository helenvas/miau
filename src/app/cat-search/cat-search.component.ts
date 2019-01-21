import { Component, OnInit } from '@angular/core';
import { CatFilter } from '../catFilter';
import { TheCatAPI } from "../TheCatAPI";
import { Observable, of } from 'rxjs';
import { Breed, Category, CatImage } from '../Cat';
import { TestBedRender3 } from '@angular/core/testing/src/r3_test_bed';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-cat-search',
  templateUrl: './cat-search.component.html',
  styleUrls: ['./cat-search.component.css']
})
export class CatSearchComponent implements OnInit {

  catFilters: CatFilter[] = [];
  catImages: CatImage[] = [];

  filterIndexes: [string, string] = [];

  constructor(private theCatApi: TheCatAPI) { }

  ngOnInit() {
    this.getFilters();
    this.getAllImages();
  }

  // Filters cats by selected filters
  filterBy( filterIndex: number, option: string ) {
    
    if (filterIndex > this.catFilters.length) {
      return
    }
    
    const currentFilter = this.catFilters[filterIndex];

    this.filterIndexes[filterIndex] = option;

    this.catImages = []

    this.theCatApi.getImages(
      this.getOption(this.filterIndexes[0]), this.getOption(this.filterIndexes[1])
    ).subscribe( (data: [CatImage] ) => {
      this.populateImages(data);
    });
  }

  getOption( option : string ) {
    if (option == "All") {
      return null;
    }
    return option;
  }
 
  populateImages(data: [CatImage]) {
    for(let index = 0; index < data.length; index++) {
      const currentImageData = data[index];
      this.catImages.push({id: currentImageData["id"], url: currentImageData["url"]});
    }
  }

  getAllImages() {
    this.theCatApi.getImages().subscribe( (data: [CatImage]) => {
      this.populateImages(data)
    });
  }

  // Fill out filters
  getFilters(): void {
    this.populateBreeds();
    this.populateCategories();
  }

  populateBreeds() {
    this.theCatApi.getBreeds().subscribe( (data: [Breed]) => {
      var breeds: Breed[] = [];
      for (let index = 0; index < data.length; index++) {
        const breedData = data[index];
        breeds.push({name: breedData["name"], id: breedData["id"]})
      }
      this.catFilters.push({name: "breeds", options: breeds});
    });
  }

  populateCategories() {
    this.theCatApi.getCategories().subscribe( (data: [Category]) => {
      var categories: Category[] = [];
      for (let index = 0; index < data.length; index++) {
        const breedData = data[index];
        categories.push({name: breedData["name"], id: +breedData["id"]})
      }
      this.catFilters.push({name: "categories", options: categories});
    });
  }

}
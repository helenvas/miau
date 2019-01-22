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

  filterIndexes = [];
  currentPage = 1;


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

    this.filterIndexes[currentFilter.name] = option;

    this.applyFilter();
  }

  applyFilter(pageNumber: number = 1) {
    this.catImages = [];

    this.theCatApi.getImages(
      this.getOption(this.filterIndexes["breeds"]), this.getOption(this.filterIndexes["categories"]), pageNumber
    ).subscribe( (data: [CatImage] ) => {
      this.populateImages(data);
    });
  }

  getOption( option: string ) {
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

  goToPage( pageNumber ) {
    this.currentPage = pageNumber.value;
    this.applyFilter(this.currentPage);
  }

  paginator( operation: string ) {

    console.log("opertion = " + operation + " crurent page = " + this.currentPage);
    if (operation === 'next') {
      this.currentPage++;
    } else if (this.currentPage > 0) {
      this.currentPage--;
    }

    this.applyFilter(this.currentPage);

  }

}
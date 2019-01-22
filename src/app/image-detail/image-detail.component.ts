import { Component, OnInit } from '@angular/core';
import { TheCatAPI } from '../TheCatAPI';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';
import { Category, CatImage } from '../Cat';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {

  imageInfo: CatImage;

  constructor(
    private route: ActivatedRoute,
    private theCatAPI: TheCatAPI,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getImage();
  }

  getImage(): void {
    const imageId = this.route.snapshot.paramMap.get('id');
    
    this.theCatAPI.getImage(imageId).subscribe( ( data: CatImage ) => {
      
      this.imageInfo = data;
     
      this.imageInfo.categories = data.categories;
      console.log(this.imageInfo.categories);
    });
  }

}

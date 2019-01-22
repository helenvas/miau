import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { CatSearchComponent } from './cat-search/cat-search.component';

const routes: Routes = [
  { path: '', component: CatSearchComponent },
  { path: 'image/:id', component: ImageDetailComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})

export class AppRoutingModule {}

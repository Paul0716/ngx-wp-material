import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostsRoutingModule } from './posts-routing-path.module';
import { MaterialModule } from '../../core/material/material.module';
import { PostsService } from './posts/posts.service';

@NgModule({
  declarations: [
    PostsComponent
  ],
  providers: [
    PostsService,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PostsRoutingModule
  ],
})
export class PostsModule { }

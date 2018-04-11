import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostsRoutingModule } from './posts-routing-path.module';
import { MaterialModule } from '../../core/material/material.module';
import { PostsService } from './posts/posts.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPosts from './store/reducers/posts/posts.reducer';
import { PostsEffects } from './store/effects/posts/posts.effects';

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
    PostsRoutingModule,
    StoreModule.forFeature('posts', fromPosts.reducer),
    EffectsModule.forFeature([
      PostsEffects
    ]),
  ],
})
export class PostsModule { }

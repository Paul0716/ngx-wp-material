import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing-path.module';
import { MaterialModule } from '../../core/material/material.module';
import { PostsService } from './posts/posts.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPosts from './store/reducers/posts/posts.reducer';
import * as fromTags from './store/reducers/tags/tags.reducer';
import { PostsEffects } from './store/effects/posts/posts.effects';
import { TagsEffects } from './store/effects/tags/tags.effects';

// component
import { PostsComponent } from './posts/posts.component';
import { EditPostsComponent } from './edit-posts/edit-posts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostsComponent,
    EditPostsComponent,
  ],
  providers: [
    PostsService,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PostsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('posts', fromPosts.reducer),
    StoreModule.forFeature('tags', fromTags.reducer),
    EffectsModule.forFeature([
      PostsEffects,
      TagsEffects,
    ]),
  ],
})
export class PostsModule { }

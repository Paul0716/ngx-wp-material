import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, UrlSegment } from '@angular/router';

// const
import { layoutRoutePaths } from '../../core/layout/layout-routing-path.const';
import { postsRoutingPaths } from './posts-routing-path.const';


// component
import { PostsComponent } from '../../pages/posts/posts.component';

// service
import { AuthGuardService } from '../../auth/auth-guard.service';


const postsRoute: Route = {
  path: postsRoutingPaths.root,
  children: [
    {
      path: '',
      component: PostsComponent,
    },
  ]
};

const routes: Routes = [
  postsRoute,
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PostsRoutingModule { }
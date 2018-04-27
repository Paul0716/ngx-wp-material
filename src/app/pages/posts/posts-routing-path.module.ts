import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, UrlSegment } from '@angular/router';

// const
import { layoutRoutePaths } from '../../core/layout/layout-routing-path.const';
import { postsRoutingPaths } from './posts-routing-path.const';


// component
import { PostsComponent } from './posts/posts.component';
import { EditPostsComponent } from './edit-posts/edit-posts.component';

// service
import { AuthGuardService } from '../../auth/auth-guard.service';

const defaultRoute: Route = {
  path: '**',
  redirectTo: postsRoutingPaths.root,
  pathMatch: 'full'
};

const postsRoute: Route = {
  path: postsRoutingPaths.root,
  children: [
    {
      path: postsRoutingPaths.edit,
      component: EditPostsComponent,
    },
    {
      path: postsRoutingPaths.new,
      component: EditPostsComponent,
    },
    {
      path: postsRoutingPaths.list,
      component: PostsComponent,
    },
  ]
};

const routes: Routes = [
  postsRoute,
  defaultRoute
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

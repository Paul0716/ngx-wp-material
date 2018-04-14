import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, UrlSegment } from '@angular/router';

// const
import { layoutRoutePaths } from './layout-routing-path.const';
import { appRoutePaths } from '../../app-routing-path.const';

// component
import { DashbroadComponent } from '../../pages/dashbroad/dashbroad.component';
import { PostsComponent } from '../../pages/posts/posts/posts.component';
import { LayoutComponent } from './layout.component';

// service
import { AuthGuardService } from '../../auth/auth-guard.service';


const layoutRoute: Route = {
  path: appRoutePaths.layout,
  component: LayoutComponent,
  canActivate: [ AuthGuardService ],
  children: [
    {
      path: layoutRoutePaths.dashbroad,
      canActivate: [ AuthGuardService ],
      loadChildren: '../../pages/dashbroad/dashbroad.module#DashbroadModule'
    },
    {
      path: layoutRoutePaths.posts,
      canActivate: [ AuthGuardService ],
      loadChildren: '../../pages/posts/posts.module#PostsModule'
    },
  ]
};

const routes: Routes = [
  layoutRoute,
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule { }

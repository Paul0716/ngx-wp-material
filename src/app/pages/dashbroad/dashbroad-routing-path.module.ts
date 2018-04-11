import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, UrlSegment } from '@angular/router';

// const
import { layoutRoutePaths } from '../../core/layout/layout-routing-path.const';
import { dashbroadRoutingPaths } from './dashbroad-routing-path.const';

// component
import { DashbroadComponent } from './dashbroad.component';

// service
import { AuthGuardService } from '../../auth/auth-guard.service';


const postsRoute: Route = {
  path: dashbroadRoutingPaths.root,
  children: [
    {
      path: '',
      component: DashbroadComponent,
    }
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
export class DashbroadRoutingModule { }

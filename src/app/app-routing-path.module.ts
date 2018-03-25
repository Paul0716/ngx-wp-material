import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, PreloadAllModules } from '@angular/router';

// const
import { appRoutePaths } from './app-routing-path.const';

// component
import { LayoutComponent } from './core/layout/layout.component';


const layoutRout: Route = {
    path: 'dashbroad',
    component: LayoutComponent,
};

// 沒有定義的Route，全部都會導回首頁處理
const fallbackRoute: Route = {
  path: '**',
  redirectTo: appRoutePaths.layout
};

const routes: Routes = [
  layoutRout,
  fallbackRoute
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true,
      useHash: true,
      // preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

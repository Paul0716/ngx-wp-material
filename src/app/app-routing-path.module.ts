import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, PreloadAllModules } from '@angular/router';

// const
import { appRoutePaths } from './app-routing-path.const';

// component
import { LayoutComponent } from './core/layout/layout.component';
import { environment } from '../environments/environment';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { layoutRoutePaths } from './core/layout/layout-routing-path.const';


const loginRoute: Route = {
  path: 'login',
  component: LoginComponent,
};

// 沒有定義的Route，全部都會導回首頁處理
const fallbackRoute: Route = {
  path: '**',
  redirectTo: appRoutePaths.layout + '/' + layoutRoutePaths.dashbroad,
  pathMatch: 'full',
};

const routes: Routes = [
  loginRoute,
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      useHash: true,
      preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

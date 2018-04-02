import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, PreloadAllModules } from '@angular/router';

// const
import { appRoutePaths } from './app-routing-path.const';

// component
import { LayoutComponent } from './core/layout/layout.component';
import { environment } from '../environments/environment.prod';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthModule } from './auth/auth.module';


const loginRout: Route = {
  path: appRoutePaths.login,
  component: LoginComponent,
};

const layoutRout: Route = {
    path: appRoutePaths.layout,
    component: LayoutComponent,
    canActivate: [
      AuthGuardService
    ],
};

// 沒有定義的Route，全部都會導回首頁處理
const fallbackRoute: Route = {
  path: '**',
  redirectTo: appRoutePaths.layout
};

const routes: Routes = [
  loginRout,
  layoutRout,
  fallbackRoute
];

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forRoot(routes, {
      enableTracing: !environment.production,
      useHash: true,
      // preloadingStrategy: PreloadAllModules
    }
  )],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

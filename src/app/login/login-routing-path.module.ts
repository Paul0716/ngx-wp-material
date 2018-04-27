import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, UrlSegment } from '@angular/router';

// const
import { appRoutePaths } from '../app-routing-path.const';

// component
import { LoginComponent } from './login.component';


const loginRoute: Route = {
  path: appRoutePaths.login,
  component: LoginComponent,
};

const routes: Routes = [
  loginRoute,
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule { }

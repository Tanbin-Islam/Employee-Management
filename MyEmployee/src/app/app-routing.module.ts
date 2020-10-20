import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./dashboard/home/home.component";
import { UsersComponent } from "./dashboard/users/users.component";
import { DepartmentComponent } from "./dashboard/department/department.component";
import { PositionComponent } from "./dashboard/position/position.component";
import { EmplyeeComponent } from "./dashboard/emplyee/emplyee.component";
import { PayrollHeadComponent } from "./dashboard/payroll-head/payroll-head.component";
import { SalaryConfigComponent } from "./dashboard/salary-config/salary-config.component";
import { SalaryTransComponent } from "./dashboard/salary-trans/salary-trans.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

import { AuthGuard } from "./login/auth.guard";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "users", component: UsersComponent },
      { path: "department", component: DepartmentComponent },
      { path: "position", component: PositionComponent },
      { path: "employee", component: EmplyeeComponent },
      { path: "payroll-head", component: PayrollHeadComponent },
      { path: "salary-config", component: SalaryConfigComponent },
      { path: "salary-transactions", component: SalaryTransComponent },
      { path: "logout", component: LogoutComponent },
    ],
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  DashboardComponent,
  HomeComponent,
  UsersComponent,
  DepartmentComponent,
  PositionComponent,
  EmplyeeComponent,
  PayrollHeadComponent,
  SalaryConfigComponent,
  SalaryTransComponent,
  LoginComponent,
  LogoutComponent,
  PageNotFoundComponent,
];
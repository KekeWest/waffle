import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilesComponent } from "app/files/components/files.component";
import { LoginComponent } from "app/login/components/login.component";

const routes: Routes = [
  {
    path: '', redirectTo: '/files', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent, children: []
  },
  {
    path: 'files', component: FilesComponent, children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

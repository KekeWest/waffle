import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilesComponent } from "app/files/components/files.component";
import { LoginComponent } from "app/login/components/login.component";
import { MeStoreService } from "app/common/services";

const routes: Routes = [
  {
    path: '', redirectTo: '/files', pathMatch: 'full', canActivate: [MeStoreService]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'files', component: FilesComponent, canActivate: [MeStoreService], children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//use auth.guard for prevent unauthorize users
const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

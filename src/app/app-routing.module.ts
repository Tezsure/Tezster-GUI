import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LocalnodeComponent} from './localnode/localnode.component';
import {AccountsComponent} from './accounts/accounts.component';


const routes: Routes = [
  {path: 'localnode', component: LocalnodeComponent},
  {path:'accounts',component:AccountsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent=[LocalnodeComponent,AccountsComponent];
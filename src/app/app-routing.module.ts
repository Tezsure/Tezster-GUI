import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LocalnodeComponent} from './localnode/localnode.component';
import {AccountsComponent} from './accounts/accounts.component';
import { AlphanetComponent } from './alphanet/alphanet.component';
import { WalletComponent } from './wallet/wallet.component';


const routes: Routes = [  
  {path:'accounts',component:AccountsComponent},
  {path:'',component:AccountsComponent},
  {path:'alphanet',component:AlphanetComponent},
  {path:'wallet',component:WalletComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent=[LocalnodeComponent,AccountsComponent];
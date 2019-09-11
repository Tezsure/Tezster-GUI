import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { WalletComponent } from './wallet/wallet.component';
import { BlocksComponent } from './blocks/blocks.component';
import { ContractsComponent } from './contracts/contracts.component';
import { EventsComponent } from './events/events.component';
import { TransactionComponent } from './transaction/transaction.component';


const routes: Routes = [
  { path: 'accounts', component: AccountsComponent },
  { path: '', redirectTo: '/accounts', pathMatch: 'full' },
  { path: 'wallet', component: WalletComponent },
  { path: 'blocks', component: BlocksComponent },
  { path: 'contracts', component: ContractsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'transactions', component: TransactionComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

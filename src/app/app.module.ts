import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { AlphanetComponent } from './alphanet/alphanet.component';
import { WalletComponent } from './wallet/wallet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LocalnodeComponent } from './localnode/localnode.component';
import { FormsModule } from '@angular/forms';
import { CreateWalletComponent } from './create-wallet/create-wallet.component';
import { RestoreWalletComponent } from './restore-wallet/restore-wallet.component';
import { BlocksComponent } from './blocks/blocks.component';
import { ContractsComponent } from './contracts/contracts.component';
import { EventsComponent } from './events/events.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AccountsComponent } from './accounts/accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlphanetComponent,
    WalletComponent,
    LocalnodeComponent,
    CreateWalletComponent,
    RestoreWalletComponent,
    BlocksComponent,
    ContractsComponent,
    EventsComponent,
    AccountsComponent,
    TransactionComponent
  ],
  entryComponents: [LocalnodeComponent, CreateWalletComponent, RestoreWalletComponent, AlphanetComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }

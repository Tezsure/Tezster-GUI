import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule,routingComponent} from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {AppService} from './app.service';
import {HttpClientModule } from '@angular/common/http';
import { AlphanetComponent } from './alphanet/alphanet.component';
import { WalletComponent } from './wallet/wallet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import {LocalnodeComponent} from './localnode/localnode.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,    
    routingComponent,
    AlphanetComponent,
    WalletComponent,
    LocalnodeComponent    
  ],
  entryComponents: [LocalnodeComponent],
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

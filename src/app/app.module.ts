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
import { FontAwesomeModule } from 'ngx-icons';
import { ValidateWalletComponent } from './validate-wallet/validate-wallet.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { BlankDataComponent } from './blank-data/blank-data.component';
import { SendtransactionComponent } from './sendtransaction/sendtransaction.component';
import { TransferPreviewComponent } from './transfer-preview/transfer-preview.component';
import {MatButtonModule} from '@angular/material/button'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule, MatOptionModule,MatDialogModule, MatSelectModule,
        MatTableModule, MatIconModule, MatChipsModule, MatCheckboxModule,
        MatDatepickerModule, MatTooltipModule, MatProgressSpinnerModule,
        MatNativeDateModule,MatSnackBarModule,MatProgressBarModule,
		MatPaginatorModule, MatStepperModule, MatMenuModule, MatGridListModule} from '@angular/material';



import {MatToolbarModule} from '@angular/material/toolbar';
import { ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';


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
		TransactionComponent,
		ValidateWalletComponent,
		BlankDataComponent,
		SendtransactionComponent,
		TransferPreviewComponent    
	],
  	entryComponents: [
		LocalnodeComponent,
		CreateWalletComponent,
		RestoreWalletComponent,
		AlphanetComponent,
		ValidateWalletComponent,
		BlankDataComponent,
		SendtransactionComponent,
		TransferPreviewComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		FormsModule,
		ModalModule.forRoot(),
		FontAwesomeModule,
		SelectDropDownModule,
		MatTabsModule,
		MatSidenavModule, MatToolbarModule,
    	ReactiveFormsModule, MatFormFieldModule,MatInputModule,
    	MatOptionModule, MatSelectModule, MatButtonModule, MatDialogModule,
    	MatTableModule, MatIconModule, MatChipsModule, MatCheckboxModule,
    	MatDatepickerModule,MatTooltipModule,MatProgressSpinnerModule,
    	MatNativeDateModule,MatSnackBarModule,MatProgressBarModule,MatPaginatorModule,
		MatStepperModule, MatMenuModule, MatGridListModule,
	],
	providers: [AppService],
	bootstrap: [AppComponent]
})
export class AppModule { }

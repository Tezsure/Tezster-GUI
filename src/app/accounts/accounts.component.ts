import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  public configData = null;

  constructor(private _AppService: AppService) { }

  ngOnInit() {

    this._AppService.configDataChangeObs$
      .subscribe(data => {
        if (data) {
          this.configData = data;
        }
      });


    // setTimeout(() => {
    //   this._AppService.addAccount(
    //     {
    //       "label": "bootstrap_3",
    //       "pkh": "tz1faswCTDciRzE4oJ9jn2Vm2dvjeyA9fUzU",
    //       "identity": "bootstrap3"
    //     }
    //   );
    // }, 5000);

  }

  async getAccountBalance(key: string) {
    const data = await this._AppService.getBalance(key);
    return data;
  }


}


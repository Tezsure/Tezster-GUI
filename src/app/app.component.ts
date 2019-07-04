import { Component,OnInit } from '@angular/core';
declare var eztz: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tezsure';
  ngOnInit():void{    
    // console.log(JSON.stringify(eztz.crypto.generateKeys()));
  }
  
}

import { AfterContentInit, Component, OnInit } from '@angular/core';
import * as DuoWebSDK from 'duo_web_sdk';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  title = 'angular-duo-mfa-integration';

  constructor(public appService: AppService) {

  }

  ngAfterContentInit() {
    this.onSave();
  }

  onSave() {
    this.appService.getFrameData().subscribe(response => {
      DuoWebSDK.init({
        iframe: "iframe",
        host: "YOUR_HOST_NAME", // your API Host Name goes in here: find it on your duo acoount web sdk
        sig_request: response,
        submit_callback: this.submitPostAction.bind(this),
      });
       
    })

  }
  submitPostAction(form) {
    this.appService.postAction(form.sig_response.value).subscribe((response) => {
      debugger;
      if (response === 'abc1234') {
        console.log({duoAuthState: 'AUTHORIZED USER!'});
      } else {
        console.log({duoAuthState: 'NON AUTHORIZED USER!'});
      }
    });

   
  }
}

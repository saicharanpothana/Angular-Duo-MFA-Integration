import { Injectable } from '@angular/core';
import * as Credentials from './creds';
import * as duo from '@duosecurity/duo_web';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const credentials = {
    ikey: 'DI3J1XLBLW0IXOV61JDP',
    skey: 'Hn86pcsKlJmBess5PjT4xwFiDUek6w2VtJSkFCbW',
    akey: 'Aaaaaaa1wwww111111111111111111111111111111111124rfvvvbfbbbvcbvcbvcbcvbvcbvcb',
    host: "api-2d84a605.duosecurity.com",
    user: 'ssss'
}

@Injectable({
    providedIn: 'root',
})
export class AppService {

    public url = 'http://localhost:8080/'

    constructor(private httpClient: HttpClient) { }

    getFrameData(): Observable<any>  {
        return this.httpClient.get(this.url+'signed-request',    {responseType: 'text'});
    }

    postAction(signedToken): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
        return this.httpClient.post(
            this.url+'verify-response', 
            signedToken, 
            { headers, responseType: 'text' }
        );
    }


}
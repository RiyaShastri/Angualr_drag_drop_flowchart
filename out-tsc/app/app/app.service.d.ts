import { HttpClient } from '@angular/common/http';
export declare class AppService {
    Http: HttpClient;
    constructor(Http: HttpClient);
    getFiles(): import("rxjs").Observable<Object>;
}

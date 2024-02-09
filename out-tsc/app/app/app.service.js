import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
var AppService = (function () {
    function AppService(Http) {
        this.Http = Http;
    }
    AppService.prototype.getFiles = function () {
        var URL = 'https://www.googleapis.com/drive/v2/files?key=AIzaSyDBg6zSDCn6o0XSoiA2nIUyPg6THLzp9T4&trashed=false';
        var headers = new HttpHeaders().set('content-type', 'application/json');
     
        return this.Http.get(URL, { headers: headers });
    };
    AppService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
    ], AppService);
    return AppService;
}());
export { AppService };
//# sourceMappingURL=app.service.js.map
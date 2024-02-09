import { inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export class AppService {

  constructor(public Http: HttpClient) {}

  public GetallFiles(){
    const URL = 'https://www.googleapis.com/drive/v2/files?key=AIzaSyDBg6zSDCn6o0XSoiA2nIUyPg6THLzp9T4&trashed=false'
    const headers = new HttpHeaders().set('content-type', 'application/json');
    
    return this.Http.get(URL, {headers});
  }
}

import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment, backend_url} from "../../environments/environment";

const base_url: string = backend_url;

@Injectable({
  providedIn: 'root',
})
export class ApiHelperService {
  constructor(private http: HttpClient) { }

  public get({
    endpoint,
    queryParams = {},
  }: {
    endpoint: string;
    queryParams?: any;
  }): Promise<any> {
    let time = this.start();
    environment
    let ret = this.request({ endpoint, method: 'GET', queryParams });
    this.stop("GET : ",time);
    return ret;
  }

  public post({
    endpoint,
    data = {},
    queryParams = {},
  }: {
    endpoint: string;
    data?: any;
    queryParams?: any;
  }): Promise<any> {
    let time = this.start();
    let ret = this.request({ endpoint, method: 'POST', data, queryParams });
    this.stop("POST : ",time);
    return ret;
  }

  public put({
    endpoint,
    data = {},
    queryParams = {},
  }: {
    endpoint: string;
    data?: any;
    queryParams?: any;
  }): Promise<any> {
    let time : number = this.start();
    let ret = this.request({ endpoint, method: 'PUT', data, queryParams });
    this.stop("PUT : ",time);
    return ret;
  }

  public delete({
    endpoint,
    data = {},
    queryParams = {},
  }: {
    endpoint: string;
    data?: any;
    queryParams?: any;
  }): Promise<any> {
    let time = this.start();
    let ret = this.request({ endpoint, method: 'DELETE', data, queryParams });
    this.stop("DELETE : ",time);
    return ret;
  }

  public async request({
    endpoint,
    method = 'GET',
    data = {},
    queryParams = {},
  }: {
    endpoint: string;
    method?: string;
    data?: object;
    queryParams?: any;
  }): Promise<any> {
    const methodWanted = method.toLowerCase();

    const url = base_url + endpoint;

    const requestOptions = {
      params: queryParams,
    };

    console.log(method, url, JSON.stringify(requestOptions), JSON.stringify(data));

    let req: Observable<any>;
    if (methodWanted === 'get') {
      req = this.http.get(url, { ...requestOptions, observe: 'response' });
    } else if (methodWanted === 'post') {
      req = this.http.post(url, data, {
        ...requestOptions,
        observe: 'response',
      });
    } else if (methodWanted === 'put') {
      req = this.http.put(url, data, {
        ...requestOptions,
        observe: 'response',
      });
    } else {
      req = this.http.delete(url, { ...requestOptions, observe: 'response' });
    }

    if (!req) {
      throw new Error(`error calling ${url} with method ${methodWanted}`);
    }

    return await lastValueFrom(req).then((res) => {
      return res.body;
    });
  }

  private start(): number {
    let date = new Date();
    return date.getMilliseconds();
  }

  private stop(prefixe:string, startTime:number):void {
    console.log("TIME pour "+prefixe+(this.start()-startTime)+" ms.");
  }
}


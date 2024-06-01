import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';

export class ProductInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler){
    console.log('Product Interceptor Called');
    return next.handle(req);

    // Modifying a HttpRequest Header
    // const modifiedReq = req.clone({headers: req.headers.append('Product', 'abcxyz')});
    // return next.handle(modifiedReq);
  }
}

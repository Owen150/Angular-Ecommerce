import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class Product implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor: Request intercepted');
    console.log('Request URL:', req.url);
    console.log('Request Headers:', req.headers.keys());

    // Clone the request to add the new header
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer YOUR_TOKEN_HERE`)
    });

    return next.handle(clonedRequest).pipe(
      tap(
        event => {
          console.log('Interceptor: Response received');
        },
        error => {
          console.error('Interceptor: Error occurred');
        }
      )
    );
  }
}

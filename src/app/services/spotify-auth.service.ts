import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SpotifyAuthInterceptor implements HttpInterceptor {
  constructor(private router: Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');
    const authReq = req.clone({
      headers: req.headers.append(
        'Authorization', `Bearer ${authToken}`
      ).append('Content-Type', 'application/json')
    })
    return next.handle(authReq).pipe(catchError(error => {
      if(error){
        if(error.status === 401){
          if(localStorage.getItem('authToken') !== null){
            localStorage.removeItem('authToken');
            localStorage.removeItem('expiresIn');
            // localStorage.clear();
          }
          this.router.navigate(['/login'])
        }
      }
      return throwError(error.statusText)
    }));
  }

  private errorHandler(err: HttpErrorResponse){
    if(err){
      if(err.status === 401){
        console.log('Unauthorize');
        this.router.navigate(['/login']);
      }
    }

   return throwError(err.statusText)
  }
}

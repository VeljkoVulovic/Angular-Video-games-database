import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'x-rapidapi-key': '3ff9b6fdeamsh0d4aa32d09b3d4dp197d5ejsn079824e6a615',
        'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com'
      },
      setParams: {
        key: '42101ecc00c04f9cb4fd4c7a92be9c48',
      }
    });
    return next.handle(req);
  }
}

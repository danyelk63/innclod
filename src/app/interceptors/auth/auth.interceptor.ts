import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { IUserLogin } from "@models";
import { environment } from "environments/environment";
import { Observable, of } from "rxjs";

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  if (req.url.includes('/login') && req.method === 'POST') {
    const { username, password } = req.body as IUserLogin;

    if (username === environment.userLogin.username && password === environment.userLogin.password) {
      return of(new HttpResponse({ status: 200, body: { token: 'fake-jwt-token', user: environment.userData } }));
    } else {
      return of(new HttpResponse({ status: 401, body: { message: 'Usuario o contraseña incorrectos' } }));
    }
  }
  return next(req);
}
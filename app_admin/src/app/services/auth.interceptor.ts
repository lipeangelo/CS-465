import { HttpInterceptorFn } from '@angular/common/http';

// Attach the stored JWT to requests that modify trip data.
// Public GET requests and login requests remain unchanged.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('travlr-token');

  // Only trip modification endpoints require authentication.
  const isProtectedRequest =
    req.url.startsWith('/api/trips') &&
    ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method);

  if (token && isProtectedRequest) {
    // Clone the immutable request and add the Bearer token.
    const authenticatedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authenticatedRequest);
  }

  // Continue without modifying public requests.
  return next(req);
};

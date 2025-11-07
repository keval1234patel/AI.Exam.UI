import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export const LoaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);
  
  // loader.show(); // show loader (after 300ms delay)

  return next(req).pipe(
    finalize(() => loader.hide()) // hide after response or error
  );
};

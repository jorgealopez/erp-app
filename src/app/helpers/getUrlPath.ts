import { Router } from '@angular/router';

export function getUrlPathWithOutFirstSlash (router: Router): string {
  return router.url.substring(1);
}

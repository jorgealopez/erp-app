import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FormInterface } from '../../types/forms/form.interface';
import { FormsCreatorService } from './forms-creator.service';


@Injectable()
export class FormResolver implements Resolve<FormInterface> {

  constructor( private formsCreatorService: FormsCreatorService ) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<FormInterface> {

    const formUrl = route.paramMap.get('formUrl');

    console.log(formUrl);

    return this.formsCreatorService.findFormByUrl(formUrl);

  }
}

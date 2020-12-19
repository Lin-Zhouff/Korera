import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResourcesModel } from './resources.model';
import {Subject} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {Router} from '@angular/router';

const BACKEND_URL = environment.apiUrl + '/resources';

@Injectable({ providedIn: 'root' })
export class ResourcesService{

  private ResourcesList: any;

  private ResourcesUpdated = new Subject<{ resource: ResourcesModel[] }>();

  constructor(private http: HttpClient, private router: Router) { }

  // tslint:disable-next-line:typedef
  getResources(): void{
    this.http.get<{Resources: any}>
    (BACKEND_URL + '/all')
      //.pipe(
      //  map(ResourceData => {
      //    return { ResourcesList: Object.values(ResourceData).map(
      //      resource => {
      //        return {
      //          'resource name': resource.resourceName,
      //          'resource code': resource.resourceCode
      //        }
      //      }
      //    )}
      //  })
      //)
      .subscribe(transformedPostData => {
        this.ResourcesList = transformedPostData;
        this.ResourcesUpdated.next({
          resource: [...this.ResourcesList]
        });
      });
  }
  // tslint:disable-next-line:typedef
  getPostUpdateListener() {
    return this.ResourcesUpdated.asObservable();
  }
}


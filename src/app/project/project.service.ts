import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ResourcesModel} from '../resources/resources.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // @ts-ignore
  public Datasource: ResourcesModel[];
  constructor() {
  }

  setDatabase(database:ResourcesModel[]) {
    this.Datasource = database;
  }

}

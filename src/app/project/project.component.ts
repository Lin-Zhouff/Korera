import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ResourcesService} from '../resources/resources.service';
import {MatPaginator} from '@angular/material/paginator';
import {ResourcesModel} from '../resources/resources.model';
import {Subscription} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import {ProjectService} from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements AfterViewInit, OnInit, OnDestroy {

  // @ts-ignore
  private Resourcesub: Subscription;
  displayedColumns: string[] = ['select','resourceName', 'resourceCode'];
  dataSource1 = new MatTableDataSource<ResourcesModel>();
  dataSource2 = new MatTableDataSource<ResourcesModel>() ;
  projects= ['project1', 'project2','project3'];
  selection1 = new SelectionModel<ResourcesModel>(true, []);
  selection2 = new SelectionModel<ResourcesModel>(true, []);
  projectSelected = this.projects[0];

  // @ts-ignore
  @ViewChild('paginator1') paginator1: MatPaginator;
  // @ts-ignore
  @ViewChild('paginator2') paginator2: MatPaginator;


  isAllSelected_1() {
    const numSelected = this.selection1.selected.length;
    const numRows = this.dataSource1.data.length;
    return numSelected === numRows;
  }
  masterToggle_1() {
    this.isAllSelected_1() ?
      this.selection1.clear() :
      this.dataSource1.data.forEach(row => this.selection1.select(row));
  }
  checkboxLabel_1(row?: ResourcesModel): string {
    if (!row) {
      return `${this.isAllSelected_1() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection1.isSelected(row) ? 'deselect' : 'select'} row ${row['resource code'] + 1}`;
  }

  isAllSelected_2() {
    const numSelected = this.selection2.selected.length;
    const numRows = this.dataSource2.data.length;
    return numSelected === numRows;
  }
  masterToggle_2() {
    this.isAllSelected_2() ?
      this.selection2.clear() :
      this.dataSource2.data.forEach(row => this.selection2.select(row));
  }
  checkboxLabel_2(row?: ResourcesModel): string {
    if (!row) {
      return `${this.isAllSelected_2() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection2.isSelected(row) ? 'deselect' : 'select'} row ${row['resource code'] + 1}`;
  }

  constructor(public ResourcesService: ResourcesService, public ProjectService: ProjectService) { }

  ngOnInit(): void {
    this.ResourcesService.getResources();
    this.Resourcesub = this.ResourcesService
      .getPostUpdateListener()
      .subscribe( (Resource: {resource: any}) => {
          this.dataSource1.data = Resource.resource;
          this.dataSource1.paginator = this.paginator1;
        }
      );
  }

  ngAfterViewInit(): void {
    this.dataSource1.paginator = this.paginator1;
    this.dataSource2.paginator = this.paginator2;
  }

  ngOnDestroy(): void {
    this.Resourcesub.unsubscribe();
    console.log('project destroied');
  }
  selected(): void{
    this.dataSource2.data = this.selection1.selected.concat();
  }
  removeSelected(): void {
    for(let data of this.selection2.selected){
      this.dataSource2.data = this.dataSource2.data.filter(item => item !== data);
    }
  }

  TranlateDatabase(): void{
    this.ProjectService.setDatabase(this.dataSource2.data);
  }
}

import {Component, AfterViewInit, ViewChild, ElementRef, OnInit, OnDestroy} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {ResourcesService} from './resources.service';
import {ResourcesModel} from './resources.model';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})

export class ResourcesComponent implements AfterViewInit, OnInit, OnDestroy  {
  // @ts-ignore
  private Resourcesub: Subscription;
  displayedColumns: string[] = ['resourceName', 'resourceCode'];
  dataSource = new MatTableDataSource<ResourcesModel>();
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild('Filter') Filter: ElementRef;

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public ResourcesService: ResourcesService,
  ) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.ResourcesService.getResources();
    this.Resourcesub = this.ResourcesService
      .getPostUpdateListener()
      .subscribe( (Resource: {resource: any}) => {
        this.dataSource.data = Resource.resource;
        this.dataSource.paginator = this.paginator;
        }
      );
  }
  applyFilter(): void {
    const filterValue = this.Filter.nativeElement.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  addColumn(): void {
    this.displayedColumns.push('new');
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.Resourcesub.unsubscribe();
  }

}

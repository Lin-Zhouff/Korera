import {Component, AfterViewInit, ViewChild, ElementRef, OnInit, OnDestroy, Inject} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {ResourcesService} from './resources.service';
import {ResourcesModel} from './resources.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})

export class ResourcesComponent implements AfterViewInit, OnInit, OnDestroy  {
  // @ts-ignore
  editField : string;
  addNewRow = false;
  editHeader: string = '';
  NewRow;
  // @ts-ignore
  private Resourcesub: Subscription;
  displayedColumns: string[] = ['resource name', 'resource code'];
  dataSource = new MatTableDataSource<ResourcesModel>();
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild('Filter') Filter: ElementRef;

  constructor(
    // tslint:disable-next-line:no-shadowed-variable
    public ResourcesService: ResourcesService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) {
    this.NewRow = this.formBuilder.group({
      'resource name': '',
      'resource code': ''
    });
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.ResourcesService.getResources();
    this.Resourcesub = this.ResourcesService
      .getPostUpdateListener()
      .subscribe( (Resource: {resource: ResourcesModel[]}) => {
        // console.log(Resource.resource);
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.Resourcesub.unsubscribe();
  }
  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.value;
  }
  updateList(id: number, property: string, event: any) {
    this.editField = event.target.value;
    // @ts-ignore
    this.dataSource.data[id][property] = this.editField;
  }
  addRow(): void {
    this.addNewRow = true;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.lastPage();
    }
  }

  // @ts-ignore
  onSubmit(customerData){
    let check = this.dataSource.data.filter(
      item => customerData['resource code'] === item['resource code']
        || customerData['resource name'] === item['resource name']);
    if (check.length !== 0){return;}
    this.dataSource.data.push(customerData);
    this.dataSource._updateChangeSubscription();
    this.addNewRow = false;
  }

  Cancel() {
    this.addNewRow = false;
  }

  addColumn(): void {
    const dialogRef = this.dialog.open(NewColumnPopupComponent, {
      width: '250px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == '' || !result){
        return;
      }
      this.displayedColumns.push(result);
      this.dataSource.data.map(data=>{// @ts-ignore
        data[result] = ''});
      // console.log(this.dataSource.data);
    });
  }

  // @ts-ignore
  getHeader(event) {
    this.editHeader = event.target.parentNode.parentNode.children[0].textContent;
  }

  changeColumnName() {
    const dialogRef = this.dialog.open(EditColumnPopupComponent, {
      width: '350px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == '' || !result){
        return;
      }
      var index = this.displayedColumns.indexOf(this.editHeader);
      this.displayedColumns[index] = result;
      this.dataSource.data.map(data=>{// @ts-ignore
        data[result] = data[this.editHeader];
        // @ts-ignore
        delete data[this.editHeader];
      });
      console.log(this.dataSource.data);
      console.log(this.displayedColumns);
    });
  }
  DeleteColumn() {
    var index = this.displayedColumns.indexOf(this.editHeader);
    this.displayedColumns.splice(index, 1);
    this.dataSource.data.map(data=>{
      // @ts-ignore
      delete data[this.editHeader];
    });
  }
}



@Component({
  selector: 'new-column-popup',
  templateUrl: 'newColumn.html',
})
export class NewColumnPopupComponent{
  constructor(
    public dialogRef: MatDialogRef<NewColumnPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  onNoClick(): void {
    this.data = '';
    this.dialogRef.close();
  }
}

@Component({
  selector: 'edit-column-popup',
  templateUrl: 'changeColumnName.html',
})
export class EditColumnPopupComponent{
  constructor(
    public dialogRef: MatDialogRef<EditColumnPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

  onNoClick(): void {
    this.data = '';
    this.dialogRef.close();
  }
}

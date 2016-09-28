import { Component, OnInit, Input, Pipe, PipeTransform, OnChanges } from '@angular/core';
import { Order } from './order';

@Component({
  selector: 'tableGrid',
  templateUrl: './table-grid.component.html',
  styleUrls: ['./table-grid.component.css']
})

export class TableGridComponent implements OnInit {

  @Input() columns: Object = { 'id' : '#' , 'firstName' : 'First Name', 'lastName' : 'Last Name', 'userName' : 'Username'};

  @Input() rows = [
                    { id : 1, firstName : 'A Mark', lastName : 'Otto', userName : '@mdo' },
                    { id : 2, firstName : 'B Jacob', lastName : 'Thornton', userName : '@fat' },
                    { id : 3, firstName : 'C Larry', lastName : 'the Bird', userName : '@twitter' },
                    { id : 4, firstName : 'A Mark', lastName : 'Otto', userName : '@mdo' },
                    { id : 5, firstName : 'B Jacob', lastName : 'Thornton', userName : '@fat' },
                    { id : 6, firstName : 'C Larry', lastName : 'the Bird', userName : '@twitter' },
                    { id : 7, firstName : 'A Mark', lastName : 'Otto', userName : '@mdo' },
                    { id : 8, firstName : 'B Jacob', lastName : 'Thornton', userName : '@fat' },
                    { id : 9, firstName : 'C Larry', lastName : 'the Bird', userName : '@twitter' },
                    { id : 10, firstName : 'A Mark', lastName : 'Otto', userName : '@mdo' },
                    { id : 11, firstName : 'B Jacob', lastName : 'Thornton', userName : '@fat' },
                    { id : 12, firstName : 'C Larry', lastName : 'the Bird', userName : '@twitter' }
                  ];
  @Input() sort: string = 'firstName';

  @Input() order: any = { col : 'firstName' , asc : true };

  @Input() pagination: any = { current : 1, totalRecords : 50, recordPerPage : 4, previous : false, next : false, pagination : true };

  constructor() {
    this.rows = this.rows; //Order.transform(this.rows,'-firstName');
    this.pagination.previous = false;
    this.pagination.next = true;
  }

  ngOnInit() {
  }

  // FUNCTIONS
  selectedClass(columnName): string {
    if(columnName === this.order.col)
    { return this.order.asc ? 'sort-true fa fa-sort-amount-asc' : 'sort-false fa fa-sort-amount-desc'; }
    else
    { return ''; }
  }

  changeSorting(columnName): void {
    this.sort = columnName;
    if (this.order.col == columnName) {
        this.order.asc = !this.order.asc;
    } else {
      this.order.col = columnName;
      this.order.asc = true;
    }
    this.rows = this.rows; //this.rows = Order.transform(this.rows,(this.order.asc ? '+' : '-') + this.order.col);
  }

  convertSorting(): string {
    return "'[" + (this.order.asc ? '+' : '-') + this.sort + "]'";
  }

  getPaginationNumberBegin(): any {
    let res = [];
    let init = this.pagination.current < 3 ? 1 : this.pagination.current - 3;
    let finish =  (Math.round(this.pagination.totalRecords / this.pagination.recordPerPage)+1) > (this.pagination.current + 4) ? this.pagination.current + 4 : Math.round(this.pagination.totalRecords / this.pagination.recordPerPage);

    if(this.pagination.current > 1)
      this.pagination.previous = true;
    else
      this.pagination.previous = false;

    if((Math.round(this.pagination.totalRecords / this.pagination.recordPerPage)+1) > (this.pagination.current + 4))
      this.pagination.next = true;
    else
      this.pagination.next = false;

    for (let i = init; i < finish; i++) {
      res.push(i);
    }

    return res;
  }

  // EVENTS
  ngOnChanges(){
    this.sort = this.order.col;
   this.rows = this.rows; // this.rows = Order.transform(this.rows,(this.order.asc ? '+' : '-') + this.order.col);
    this.getPaginationNumberBegin();

    let totalRecords: number = this.rows != null ? this.rows.length : 0;
    if(!this.pagination.pagination)
    {
      if(this.pagination.totalRecords != totalRecords)
        this.pagination.pagination = false;
    }


  }

}

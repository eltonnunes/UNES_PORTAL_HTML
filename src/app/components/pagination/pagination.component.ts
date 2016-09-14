import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() current: number = 1;
  @Input() totalRecords: number = 50;
  @Input() recordPerPage: number = 4;
  @Input() previous: boolean = false;
  @Input() next: boolean = false;
  @Input() pagination: boolean = true;
  @Input() totalRows : number = 50;

    constructor() {
      this.previous = false;
      this.next = true;
      this.pagination = true;
    }

    ngOnInit() {
    }

    getPaginationNumberBegin(): any{
      let res = [];
      let init = this.current < 3 ? 1 : this.current - 3;
      let finish =  (Math.round(this.totalRecords / this.recordPerPage)+1) > (this.current + 4) ? this.current + 4 : Math.round(this.totalRecords / this.recordPerPage);

      if(this.current > 1)
        this.previous = true;
      else
        this.previous = false;

      if((Math.round(this.totalRecords / this.recordPerPage)+1) > (this.current + 4))
        this.next = true;
      else
        this.next = false;

      for (let i = init; i < finish; i++) {
        res.push(i);
      }

      return res;
    }

    // EVENTS
    ngOnChanges(){
      this.getPaginationNumberBegin();

      if(!this.pagination)
      {
        if(this.totalRecords != this.totalRecords)
          this.pagination = false;
      }
    }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  @Output() currentUpdate = new EventEmitter();

    constructor() {
      this.previous = true;
      this.next = true;
      this.pagination = true;
    }

    ngOnInit() {
    }

    getPaginationNumberBegin(): any{
      let res = [];
      let init = this.current <= 3
                 ? 1
                 : this.current - 3;
      let finish =  (Math.round(this.totalRecords / this.recordPerPage) > (this.current + 4)
                    ? this.current + 4
                    : Math.round(this.totalRecords / this.recordPerPage)+1);

      if((Math.round(this.totalRecords / this.recordPerPage)) > (this.current + 4))
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
      if(!this.pagination)
      {
        if(this.totalRecords != this.totalRecords)
          this.pagination = false;
      }
    }


    setCurrent(currentValue){
      this.current = currentValue;
      this.currentUpdate.emit({current: this.current});

      if(this.current > 1)
      {
        this.previous = true;
      }
      if(this.current == 1)
      {
        this.previous = false;
      }

    }

    setPrevious(){
      if(this.current > 1)
      {
        this.previous = true;
        this.current--;
        this.currentUpdate.emit({current: this.current});

        if(this.current == 1)
        {
          this.previous = false;
        }
      }
      else
      {
        this.previous = false;
      }
    }

    setNext(){
      this.current++;
      if(this.current > 1)
      {
        this.previous = true;
      }
      this.currentUpdate.emit({current: this.current});
    }
}

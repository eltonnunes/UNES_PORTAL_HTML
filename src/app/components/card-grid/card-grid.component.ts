import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cardGrid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.css']
})
export class CardGridComponent implements OnInit {

  @Input() current: number = 1;
  @Input() totalRecords: number = 50;
  @Input() recordPerPage: number = 4;
  @Input() previous: boolean = false;
  @Input() next: boolean = false;
  @Input() pagination: boolean = true;
  @Input() totalRows : number = 50;
  info: Boolean = false;

  @Output() currentUpdate = new EventEmitter();
  @Output() videoSelected = new EventEmitter();
  @Output() tagSelected = new EventEmitter();

  @Input() rows : any = null;

  constructor() {
  }

  ngOnInit() {
  }

  onCurrentUpdate(event){
    this.currentUpdate.emit({current: event.current});
  }

  onVideoSelected(event){
    this.videoSelected.emit(event);
  }

  onTagSelected(event){
    this.tagSelected.emit(event);
  }

  ngOnChanges(){
  }

}

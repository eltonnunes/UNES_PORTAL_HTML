import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'navmenu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() rows: any = [{ "UntIdTag": 1, "UntTxNome": "Erro ao carregar dados" }];
  @Input() tag = 0;

  @Output() selectedTag = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onEventTagSelected(eventValueId, eventValueName){
    this.selectedTag.emit({IdTag: eventValueId, NameTag: eventValueName});
  }

}

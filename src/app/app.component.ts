import { Component, OnInit } from '@angular/core';

//import { Video } from './models/video';
//import { VideosService } from './services/videos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app works!';
  load : boolean = true;
  rows : any;
  cols : any;
  order: any = { col : 'id' , asc : false };
  pagination: any;

  constructor() {
  }

  ngOnInit(){
    //setTimeout(() => {
      this.load = false;
    //}, 10000);
  }



  // Get all videos
  /*loadVideos(){

        this.videosService.getVideos()
                          .subscribe(
                              comments => {this.rows = comments;}, //Bind to view
                              err => {
                                  console.log(err);
                              });

      this.order = { col : 'id' , asc : false };

      this.cols = {
                    "UNV_ID_VIDEOS"       : "ID VIDEOS",
                    "UNV_TX_TITULO"       : "TITULO",
                    "UNV_TX_DESCRICAO"    : "DESCRIÇÃO",
                    "UNV_NR_VIEW"         : "VIEW",
                    "UNV_NR_LIKE"         : "LIKE",
                    "UNV_DT_DATA"         : "DATA",
                    "UNT_ID_TAG"          : "ID TAG",
                    "UNV_TX_HASH"         : "HASH"
                  };

      let totalRecords: number = this.rows != null ? this.rows.length : 0;
      this.pagination = {
                          current       : 1,
                          totalRecords  : totalRecords,
                          recordPerPage : 4,
                          previous      : false,
                          next          : true,
                          pagination    : false
                        };
  }*/

}

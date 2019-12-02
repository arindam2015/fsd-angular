import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isNoteView:boolean = true;
  constructor(private routerService:RouterService){
     

     }
     toggle():void{
        
        //this.isNoteView= !this.isNoteView;
        if (this.isNoteView) {
          this.isNoteView = false;
          this.routerService.routeToListView();
        } else if (!this.isNoteView) {
          this.isNoteView = true;
          this.routerService.routeToNoteView();
        }
        
     }
     ngOnInit():void{
      // this.toggle();
     }
  
 
}

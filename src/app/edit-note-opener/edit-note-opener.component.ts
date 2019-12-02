import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {

  noteId:number;
  constructor(private dialog:MatDialog,
    private activatedroute:ActivatedRoute,
    private routerservice:RouterService) 
    {
      //const noteId = +this.activatedroute.snapshot.paramMap.get('noteId');
      this.activatedroute.params.subscribe(params => this.noteId=params.noteid);
  
      this.dialog.open(EditNoteViewComponent,{
        data:{
          noteId:this.noteId,
        }
      }).afterClosed().subscribe(result=>{
        this.routerservice.routeBack();
      })
    }
  
    ngOnInit() 
    {    
       }

}

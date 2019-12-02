import { Component, OnInit, Inject } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';


@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;
    
  constructor(
    private dialogref:MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private noteservice:NotesService   
  ) {
    
     }    
  

  onSave() {
    this.errMessage='';
        
    this.noteservice.editNote(this.note).subscribe(
      (data) =>{this.dialogref.close();},
     (err:any)=>{
      if (err.status === 404) {
        this.errMessage = err.message;
      } else {
        this.errMessage = err.error.message;
      }
      }
    );
    
  }
  
  ngOnInit() 
  {    
    this.note =this.noteservice.getNoteById(this.data.noteId);
   
     }
  
}

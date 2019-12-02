import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {
  errMessage: string;
  note:Note=new Note();
  notes:Array<Note> = [];
  error404Message: string;
  mandatoryFieldsMessage: string;
  constructor(private notesService:NotesService) {

  }
  ngOnInit(): void {
    this.error404Message = `Http failure response for ${this.notesService.backendUrl}: 404 Not Found`;
    this.mandatoryFieldsMessage = 'Title and Text both are required fields';
  }
  addNote():void
  {
    this.errMessage='';
    if(this.note.text===' '||this.note.title===' '){
      this.errMessage=this.mandatoryFieldsMessage;
      return;
    }
    if (!(this.note.title || this.note.text)) {
      /**
       * Empty note
       */
      this.errMessage = this.mandatoryFieldsMessage;
      return;
    }

    this.notes.push(this.note);

    this.notesService.addNote(this.note).subscribe((response:Note)=>
      data=>{
       // console.log(response)
      },
      error=>{
      this.errMessage=this.error404Message;
      });
    
    this.note = new Note();
  }
}

import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;
  constructor(private notesService: NotesService) {
    this.startedNotes = [];
    this.notStartedNotes = [];
    this.completedNotes = [];
    //this.splitByState();
  }
  // splitByState(){
  //   console.log('inside split');
  //       for(let data in this.notes){
  //         console.log(this.notes[data].state);
  //         if(this.notes[data].state==='started'){
  //           this.startedNotes.push(this.notes[data]);
  //           console.log('started:' +this.startedNotes.length);
  //         }else if(this.notes[data].state==='not-started'){
  //           this.notStartedNotes.push(this.notes[data]);
  //           console.log('notstarted:' +this.notStartedNotes);
  //         }else if(this.notes[data].state==='completed'){
  //           this.completedNotes.push(this.notes[data]);
  //           console.log('completed:' +this.completedNotes[data]);
  //         }
  //       }
  // }
  ngOnInit(): void {
    this.notesService.getNotes().subscribe(notes => {
      
      this.notStartedNotes = notes.filter(note => ('not-started' === note.state));
      this.startedNotes = notes.filter(note => ('started' === note.state));
      this.completedNotes = notes.filter(note => ('completed' === note.state));
    },
     (err) => {console.log(err);});
  }
}

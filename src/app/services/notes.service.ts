import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
   backendUrl:string='http://localhost:3000/api/v1/notes';
  constructor(private httpClient:HttpClient,private authservice:AuthenticationService){
    this.notes = [];
    this.notesSubject = new BehaviorSubject([]);
  }

  fetchNotesFromServer() {
    return this.httpClient.get<Note[]>(this.backendUrl,{
      headers:new HttpHeaders().set('Authorization',`${this.authservice.getBearerToken()}`)
    }).subscribe(notesres =>{
      //console.log("Note Res"+JSON.stringify(notesres));
      this.notes = notesres;
      console.log("fetchfs notes data"+JSON.stringify(this.notes));
      this.notesSubject.next(this.notes);
    },
    (err:any)=>{
      this.notesSubject.error(err);
    }
  )

  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>(this.backendUrl,note,{
      headers:new HttpHeaders().set('Authorization',`${this.authservice.getBearerToken()}`)
    }).pipe(tap(addedNote =>{
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes)
    }))
  }

  editNote(note: Note): Observable<Note> {
    return this.httpClient.put<Note>(this.backendUrl+`/${note.id}`,note,{
      headers:new HttpHeaders().set('Authorization',`${this.authservice.getBearerToken()}`)
    }).pipe(tap(editedNote =>{
      const note =this.notes.find(note=> note.id === editedNote.id);
      Object.assign(note,editedNote);
      this.notesSubject.next(this.notes)
    }))
  }

  getNoteById(noteId): Note {
    //console.log('Notes Data   '+ JSON.stringify(this.notes));
    //console.log('fetch note by this id   '+noteId);    

    let foundnote = this.notes.find(note => note.id == noteId);
   // console.log('Note fetched by this id   '+JSON.stringify(foundnote));
    return foundnote;

  }
}

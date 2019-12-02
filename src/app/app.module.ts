import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';
import { NotesService } from './services/notes.service';
import { Routes, RouterModule } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule,MatListModule,MatSelectModule } from '@angular/material';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteComponent } from './note/note.component';
import {MatDialogModule} from '@angular/material/dialog';


const routes: Routes = [
  {
    path:'login',component:LoginComponent
  },
  {
    path:'dashboard',component:DashboardComponent,
    canActivate:[CanActivateRouteGuard],
    children:[
      {
        path:'view/noteview',component:NoteViewComponent
      },
      {
        path:'view/listview',component: ListViewComponent
      },
      {
        path:'note/:noteid/edit',component:EditNoteOpenerComponent,
        outlet:'noteEditOutlet'
      },
      {
        path:'',redirectTo:'view/noteview',pathMatch:'full'
      } 
    ]
  },
  {
    path:'',redirectTo:'dashboard',pathMatch:'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    NoteViewComponent,
    NoteTakerComponent,
    EditNoteOpenerComponent,
    ListViewComponent,
    EditNoteViewComponent,
    NoteComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule
    
    

   ],
  providers: [CanActivateRouteGuard,AuthenticationService,NotesService,RouterService],
  bootstrap: [ AppComponent],
  entryComponents: [EditNoteViewComponent ]
})

export class AppModule { }

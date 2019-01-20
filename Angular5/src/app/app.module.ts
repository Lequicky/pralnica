import { AuthGuard } from './auth/auth.guard';
import { UserService } from './shared/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler.service';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {RouterModule} from '@angular/router'

import {ToastrModule} from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { appRoutes } from './routes';
import { AuthInterceptor } from './auth/auth.interceptor';

import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UsersComponent } from './users/users.component';
import { RoomsComponent } from './rooms/rooms.component';

import { RoomComponent } from './rooms/room/room.component';
import { RoomsListComponent } from './rooms/rooms-list/rooms-list.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { TerminComponent } from './reservations/termin/termin.component';
import { ReservationsAdminComponent } from './reservations/reservations-admin/reservations-admin.component';
import { ReservationsUserComponent } from './reservations/reservations-user/reservations-user.component';
import { TajnistvoComponent } from './tajnistvo/tajnistvo.component';
import { TajnistvoUserComponent } from './tajnistvo/tajnistvo-user/tajnistvo-user.component';
import { TajnistvoPregledComponent } from './tajnistvo/tajnistvo-pregled/tajnistvo-pregled.component';
import { StudentViewComponent } from './student-view/student-view.component';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { TajnistvoMonthComponent } from './tajnistvo/tajnistvo-month/tajnistvo-month.component';
import { ReceptorComponent } from './receptor/receptor.component';
import { MessageComponent } from './message/message.component';
import { ShowMessagesComponent } from './show-messages/show-messages.component';
import { StudentBeforeComponent } from './student-view/student-before/student-before.component';
import { StudentEditComponent } from './student-view/student-edit/student-edit.component';
import { StudentPasswordComponent } from './student-view/student-edit/student-password/student-password.component';
import { StudentImageComponent } from './student-view/student-edit/student-image/student-image.component';




@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    ForbiddenComponent,
    UsersComponent,
    RoomsComponent,
    ReservationsAdminComponent,
    ReservationsUserComponent,
    RoomComponent,
    RoomsListComponent,
    UsersListComponent,
    NavigationComponent,
    ReservationsComponent,
    TerminComponent,
    TajnistvoComponent,
    TajnistvoUserComponent,
    TajnistvoPregledComponent,
    StudentViewComponent,
    TajnistvoMonthComponent,
    ReceptorComponent,
    MessageComponent,
    ShowMessagesComponent,
    StudentBeforeComponent,
    StudentEditComponent,
    StudentPasswordComponent,
    StudentImageComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule, MatCheckboxModule

  ],
  providers: [UserService, HttpErrorHandler,
     AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    }
    ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }

import { MessageComponent } from './message/message.component';


import { UsersComponent } from './users/users.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

import { AuthGuard } from './auth/auth.guard';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserComponent } from './user/user.component';

import {Routes } from '@angular/router'
import { RoomsComponent } from './rooms/rooms.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationsAdminComponent } from './reservations/reservations-admin/reservations-admin.component';
import { ReservationsUserComponent } from './reservations/reservations-user/reservations-user.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { TajnistvoComponent } from './tajnistvo/tajnistvo.component';
import { TajnistvoMonthComponent } from './tajnistvo/tajnistvo-month/tajnistvo-month.component';
import { ReceptorComponent } from './receptor/receptor.component';
import { ShowMessagesComponent } from './show-messages/show-messages.component';
import { StudentEditComponent } from './student-view/student-edit/student-edit.component';

export const appRoutes: Routes = [
    { path: 'home', component: ReservationsComponent,canActivate:[AuthGuard] },
    { path: 'forbidden', component: ForbiddenComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] , data: { roles: ['Admin'] }},
    { path: 'rooms', component: RoomsComponent, canActivate: [AuthGuard] , data: { roles: ['Admin'] }},
    { path: 'reservations-admin', component: ReservationsAdminComponent, canActivate: [AuthGuard] , data: { roles: ['Admin'] }},
    { path: 'reservations-user', component: ReservationsUserComponent, canActivate: [AuthGuard] , data: { roles: ['Admin'] }},
    { path: 'reservations', component: ReservationsComponent, canActivate: [AuthGuard] , data: { roles: ['Admin', 'Student'] }},
    { path: 'student-home', component: StudentViewComponent,canActivate:[AuthGuard] , data: { roles: ['Admin', 'Student'] }},
    { path: 'tajnistvo-home', component: TajnistvoComponent,canActivate:[AuthGuard] , data: { roles: ['Admin', 'Accountant'] }},
    { path: 'tajnistvo-month', component: TajnistvoMonthComponent,canActivate:[AuthGuard] , data: { roles: ['Admin', 'Accountant'] }},
    { path: 'receptor-home', component: ReceptorComponent,canActivate:[AuthGuard] , data: { roles: ['Admin', 'Receptor'] }},
    { path: 'student-message', component: MessageComponent,canActivate:[AuthGuard] , data: { roles: ['Student'] }},
    { path: 'admin-message', component: ShowMessagesComponent,canActivate:[AuthGuard] , data: { roles: ['Admin'] }},
    { path: 'student-edit', component: StudentEditComponent,canActivate:[AuthGuard] , data: { roles: ['Student'] }},
    
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    { path : '', redirectTo:'/login', pathMatch : 'full'}
    
];
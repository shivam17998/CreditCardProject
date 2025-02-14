import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { LoginComponent } from '../Components/login/login.component';
import { AdminAuthGuard } from '../Guard/admin-authgard.guard';
import { UserComponent } from '../Components/user/user.component';
import { userAuthguardGuard } from '../Guard/user-authguard.guard';

export const routes: Routes = [

    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent,canActivate:[AdminAuthGuard]},
    {path:'user',component: UserComponent,canActivate:[userAuthguardGuard] }
   
];

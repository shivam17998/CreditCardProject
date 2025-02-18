import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { LoginComponent } from '../Components/login/login.component';
import { AdminAuthGuard } from '../Guard/admin-authgard.guard';
import { UserComponent } from '../Components/user/user.component';
import { userAuthguardGuard } from '../Guard/user-authguard.guard';
import { RegisterComponent } from '../Components/register/register.component';
import { CardTypeComponent } from '../Components/card-type/card-type.component';
import { PayNowComponent } from '../Components/pay-now/pay-now.component';

export const routes: Routes = [

    {path:'',component:LoginComponent},
    {path:'login',component:LoginComponent},
    {path:'home',component:HomeComponent,canActivate:[AdminAuthGuard]},
    {path:'user',component: UserComponent,canActivate:[userAuthguardGuard], },
    {path:'register', component:RegisterComponent},
    {path:'cardtype', component:CardTypeComponent},
    {path:'paynow',component:PayNowComponent}
   
];

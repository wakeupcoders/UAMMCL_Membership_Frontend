import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdinarymembershipformComponent } from './appComponents/ordinarymembershipform/ordinarymembershipform.component';
import { PageNotFoundComponent } from './appComponents/page-not-found/page-not-found.component';
import { CertificateComponent } from './appComponents/certificate/certificate.component';
import { ViewordinaryformComponent } from './appComponents/viewordinaryform/viewordinaryform.component';
import { OrdinaryreceiptComponent } from './appComponents/ordinaryreceipt/ordinaryreceipt.component';
import { SignupComponent } from './appComponents/signup/signup.component';
import { LoginComponent } from './appComponents/login/login.component';
import { AuthGuard } from './appGuards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'ordinary', component: OrdinarymembershipformComponent, canActivate: [AuthGuard] },
  { path: 'certificate/:id', component: CertificateComponent, canActivate: [AuthGuard] }, // Dynamic route
  { path: 'viewordinary/:id', component: ViewordinaryformComponent,canActivate: [AuthGuard] }, // Dynamic route
  { path: 'receiptordinary/:id', component: OrdinaryreceiptComponent, canActivate: [AuthGuard] }, // Dynamic route


  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },


  { path: '**', component: PageNotFoundComponent }, // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

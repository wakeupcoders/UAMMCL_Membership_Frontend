import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdinarymembershipformComponent } from './appComponents/ordinarymembershipform/ordinarymembershipform.component';
import { PageNotFoundComponent } from './appComponents/page-not-found/page-not-found.component';
import { CertificateComponent } from './appComponents/certificate/certificate.component';
import { ViewordinaryformComponent } from './appComponents/viewordinaryform/viewordinaryform.component';
import { OrdinaryreceiptComponent } from './appComponents/ordinaryreceipt/ordinaryreceipt.component';
import { AuthGuard } from './appGuards/auth.guard';
import { NominalmembershipformComponent } from './appComponents/nominalmembershipform/nominalmembershipform.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule), pathMatch: 'full' }, // Default route
  { path: 'ordinary', component: OrdinarymembershipformComponent, canActivate: [AuthGuard] },
  { path: 'nominal', component: NominalmembershipformComponent, canActivate: [AuthGuard] },
  { path: 'certificate/:id', component: CertificateComponent, canActivate: [AuthGuard] }, // Dynamic route
  { path: 'viewordinary/:id', component: ViewordinaryformComponent,canActivate: [AuthGuard] }, // Dynamic route
  { path: 'receiptordinary/:id', component: OrdinaryreceiptComponent, canActivate: [AuthGuard] }, // Dynamic route

  { path: 'auth', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },


  { path: '**', component: PageNotFoundComponent }, // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

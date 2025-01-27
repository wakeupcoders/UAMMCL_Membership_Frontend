import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdinarymembershipformComponent } from './appComponents/ordinarymembershipform/ordinarymembershipform.component';
import { PageNotFoundComponent } from './appComponents/page-not-found/page-not-found.component';
import { CertificateComponent } from './appComponents/certificate/certificate.component';
import { ViewordinaryformComponent } from './appComponents/viewordinaryform/viewordinaryform.component';
import { OrdinaryreceiptComponent } from './appComponents/ordinaryreceipt/ordinaryreceipt.component';

const routes: Routes = [
  { path: '', redirectTo: '/ordinary', pathMatch: 'full' }, // Default route
  { path: 'ordinary', component: OrdinarymembershipformComponent },
  { path: 'certificate/:id', component: CertificateComponent }, // Dynamic route
  { path: 'viewordinary/:id', component: ViewordinaryformComponent }, // Dynamic route
  { path: 'receiptordinary/:id', component: OrdinaryreceiptComponent }, // Dynamic route
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

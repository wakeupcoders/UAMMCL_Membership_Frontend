import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdinarymembershipformComponent } from './appComponents/ordinarymembershipform/ordinarymembershipform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { HeaderComponent } from './appComponents/header/header.component';
import { FooterComponent } from './appComponents/footer/footer.component';
import { LoaderComponent } from './appComponents/loader/loader.component';
import { CertificateComponent } from './appComponents/certificate/certificate.component';
import { PageNotFoundComponent } from './appComponents/page-not-found/page-not-found.component';
import { ViewordinaryformComponent } from './appComponents/viewordinaryform/viewordinaryform.component';
import { OrdinaryreceiptComponent } from './appComponents/ordinaryreceipt/ordinaryreceipt.component';
// import { SignupComponent } from './appComponents/signup/signup.component';
// import { LoginComponent } from './appComponents/login/login.component';
import { NumberToWordsPipe } from './appPipes/number-to-words.pipe';
import { NominalmembershipformComponent } from './appComponents/nominalmembershipform/nominalmembershipform.component';
import { NominalreceiptComponent } from './appComponents/nominalreceipt/nominalreceipt.component';
import { NominalcertificateComponent } from './appComponents/nominalcertificate/nominalcertificate.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdinarymembershipformComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    CertificateComponent,
    PageNotFoundComponent,
    ViewordinaryformComponent,
    OrdinaryreceiptComponent,
    // SignupComponent,
    // LoginComponent,
    NumberToWordsPipe,
    NominalmembershipformComponent,
    NominalreceiptComponent,
    NominalcertificateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

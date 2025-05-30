import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpressionOfInterestComponent } from './expression-of-interest.component';
import { AuthGuard } from '../appGuards/auth.guard';

const routes: Routes = [
  { path: '', component: ExpressionOfInterestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpressionOfInterestRoutingModule { }

 
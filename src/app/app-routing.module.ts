import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BasicOperatorsComponent } from './basic-operators/basic-operators.component';
import { IntermediateOperatorsComponent } from './intermediate-operators/intermediate-operators.component';
import { AdvanceOperatorsComponent } from './advance-operators/advance-operators.component';

const routes: Routes = [
  { path: '', component: BasicOperatorsComponent },
  { path: 'intermediate', component: IntermediateOperatorsComponent },
  { path: 'advance', component: AdvanceOperatorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

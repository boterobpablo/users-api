import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
  ],
  exports: [
    DialogModule,
    SpinnerComponent,
    DialogComponent,
  ]
})
export class ComponentsModule { }

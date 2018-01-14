import { NgModule } from '@angular/core';

import { MatToolbarModule,
         MatIconModule,
         MatSidenavModule,
         MatListModule,
         MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';



@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    LayoutModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    LayoutModule
  ]
})
export class MaterialModule {}

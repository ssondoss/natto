import { NgModule } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';
import { from } from 'rxjs';

@NgModule({
  exports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class MaterialModule {}

import {NgModule} from '@angular/core';

import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule
  ],
  providers: [],
  exports: [
    ToolbarComponent
  ],
  bootstrap: []
})
export class SharedModule {
}

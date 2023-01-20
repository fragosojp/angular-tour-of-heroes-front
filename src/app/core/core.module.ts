import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessagesComponent } from './components/messages/messages.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';

const COMPONENTS = [MessagesComponent, ToolbarComponent];
const MODULES = [MaterialModule, RouterModule];

@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule, MODULES],
  exports: [COMPONENTS, MODULES],
})
export class CoreModule {}

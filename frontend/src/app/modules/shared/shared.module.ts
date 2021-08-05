import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemanticDropdownDirective } from './directives/dropdown/semantic-dropdown.directive';
import { SemanticCalendarDirective } from './directives/calendar/semantic-calendar.directive';
import { DragDropDirective } from './directives/upload/songImage/drag-drop.directive';
import { SemanticMessageDirective } from './directives/message/semantic-message.directive';

@NgModule({
  declarations: [
    SemanticDropdownDirective,
    SemanticCalendarDirective,
    DragDropDirective,
    SemanticMessageDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SemanticDropdownDirective,
    SemanticCalendarDirective,
    SemanticMessageDirective,
    DragDropDirective
  ]
})

export class SharedModule { }

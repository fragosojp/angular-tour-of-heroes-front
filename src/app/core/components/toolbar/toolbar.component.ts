import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() isLoggedIn: boolean | null = null;
  @Input() title = '';
  @Input() menuItems: MenuItem[] = [];

  @Output() private logout = new EventEmitter();

  onLogout(): void {
    this.logout.emit();
  }
}

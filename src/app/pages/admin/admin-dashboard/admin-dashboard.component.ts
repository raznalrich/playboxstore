import { Component } from '@angular/core';
import { SidebarComponent } from "../../../ui/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';
import { AdminnavComponent } from "../../../ui/adminnav/adminnav.component";


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, AdminnavComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}

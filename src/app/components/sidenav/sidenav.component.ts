import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule}  from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule }	from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatToolbarModule, MatIconModule, MatListModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  isExpanded = true;
  
  isShowing = false;
  showSubSubMenu: boolean = false;

  submenuState: { [key: string]: boolean } = {
    vendas: false,
    configuracoes: false
  };

  // Alterna o estado de expansão para o submenu específico
  toggleSubmenu(menu: string) {
    this.submenuState[menu] = !this.submenuState[menu];
  }

  // Para alternar os submenus internos de cada menu
  submenuStateNested: { [key: string]: boolean } = {
    vendas: false,
    configuracoes: false
  };

  toggleSubSubMenu(menu: string) {
    this.submenuStateNested[menu] = !this.submenuStateNested[menu];
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
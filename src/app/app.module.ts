import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { SortableModule} from 'ngx-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CenterComponent } from './center/center.component';
import { MenuComponent } from './menu/menu.component';
import { PermissionComponent } from './permission/permission.component';
import { AdminComponent } from './admin/admin.component';
import { RoleComponent } from './role/role.component';

@NgModule({
  declarations: [
    AppComponent,
    CenterComponent,
    MenuComponent,
    PermissionComponent,
    AdminComponent,
    RoleComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'center', pathMatch: 'full' },
      { path: 'center', component: CenterComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'permission', component: PermissionComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'role', component: RoleComponent }
    ]),
    NgbModule.forRoot(),
    SortableModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
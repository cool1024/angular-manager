import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdMenuModule,MdGridListModule,MdCheckboxModule } from '@angular/material';
import 'hammerjs';
import { SortableModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CenterComponent } from './center/center.component';
import { MenuComponent } from './menu/menu.component';
import { PermissionComponent } from './permission/permission.component';
import { AdminComponent } from './admin/admin.component';
import { RoleComponent } from './role/role.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    CenterComponent,
    MenuComponent,
    PermissionComponent,
    AdminComponent,
    RoleComponent,
    LoginComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'center', pathMatch: 'full' },
      { path: 'center', component: CenterComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'permission', component: PermissionComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'role', component: RoleComponent },
      { path: 'login', component: LoginComponent }
    ]),
    NgbModule.forRoot(),
    SortableModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdGridListModule,
    MdCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
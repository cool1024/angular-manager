import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdMenuModule, MdGridListModule, MdCheckboxModule } from '@angular/material';
import 'hammerjs';
import { SortableModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { CenterComponent } from './page/center/center.component';
import { MenuComponent } from './page/menu/menu.component';
import { PermissionComponent } from './page/permission/permission.component';
import { AdminComponent } from './page/admin/admin.component';
import { RoleComponent } from './page/role/role.component';
import { LoginComponent } from './page/login/login.component';

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
    ToastrModule.forRoot({ timeOut: 1000, positionClass: 'toast-bottom-right' }),
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdGridListModule,
    MdCheckboxModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
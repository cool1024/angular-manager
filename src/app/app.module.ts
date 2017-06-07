import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdMenuModule, MdGridListModule, MdCheckboxModule } from '@angular/material';
import 'hammerjs';
import { SortableModule,PaginationModule  } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { SelectModule } from 'ng2-select';
import { AppComponent } from './app.component';
import { CenterComponent } from './page/center/center.component';
import { MenuComponent } from './page/menu/menu.component';
import { PermissionComponent } from './page/permission/permission.component';
import { AdminComponent } from './page/admin/admin.component';
import { RoleComponent } from './page/role/role.component';
import { LoginComponent } from './page/login/login.component';
import { RoleParentPipe } from './pipe/role-parent.pipe';
import { RoleForComponent } from './page/role/role-for.component';
import { LoopCardComponent } from './tool/loop-card/loop-card.component';
import { ToolComponent } from './page/tool/tool.component';

@NgModule({
  declarations: [
    AppComponent,
    CenterComponent,
    MenuComponent,
    PermissionComponent,
    AdminComponent,
    RoleComponent,
    LoginComponent,
    RoleParentPipe,
    RoleForComponent,
    LoopCardComponent,
    ToolComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'center', pathMatch: 'full' },
      { path: 'center', component: CenterComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'permission', component: PermissionComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'role', component: RoleComponent },
      { path: 'login', component: LoginComponent },
      { path: 'tool', component: ToolComponent }
    ]),
    NgbModule.forRoot(),
    SortableModule.forRoot(),
    PaginationModule.forRoot(),
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
    SelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
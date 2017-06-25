import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdMenuModule, MdGridListModule, MdCheckboxModule } from '@angular/material';
import 'hammerjs';
import { SortableModule, PaginationModule } from 'ngx-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { SelectModule } from 'ng2-select';
import { SortablejsModule } from 'angular-sortablejs';
import { ChartsModule } from 'ng2-charts';
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
import { InputImagesComponent } from './tool/input-images/input-images.component';
import { InputImageComponent } from './tool/input-image/input-image.component';
import { ModalWindowComponent } from './tool/modal-window/modal-window.component';
import { ErrorComponent } from './page/error/error.component';
import { ChartDemoComponent } from './page/tool/chart-demo/chart-demo.component';
import { TableDemoComponent } from './page/tool/table-demo/table-demo.component';
import { ImageDemoComponent } from './page/tool/image-demo/image-demo.component';
import { ImagesDemoComponent } from './page/tool/images-demo/images-demo.component';
import { CardDemoComponent } from './page/tool/card-demo/card-demo.component';
import { AlertDemoComponent } from './page/tool/alert-demo/alert-demo.component';
import { FormDomComponent } from './page/tool/form-dom/form-dom.component';

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
    ErrorComponent,
    ChartDemoComponent,
    TableDemoComponent,
    ImageDemoComponent,
    ImagesDemoComponent,
    CardDemoComponent,
    InputImagesComponent,
    InputImageComponent,
    ModalWindowComponent,
    AlertDemoComponent,
    FormDomComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'center', pathMatch: 'full' },
      { path: 'error', component: ErrorComponent },
      { path: 'center', component: CenterComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'permission', component: PermissionComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'role', component: RoleComponent },
      { path: 'login', component: LoginComponent },
      { path: 'tool/chart', component: ChartDemoComponent },
      { path: 'tool/table', component: TableDemoComponent },
      { path: 'tool/inputimage', component: ImageDemoComponent },
      { path: 'tool/loopcard', component: CardDemoComponent },
      { path: 'tool/alert', component: AlertDemoComponent },
      { path: 'tool/form', component: FormDomComponent },

      { path: '**', component: ErrorComponent },//此链接必须放置在最后
    ]),
    NgbModule.forRoot(),
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
    SortablejsModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
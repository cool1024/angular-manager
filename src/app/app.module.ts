import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { CenterComponent } from './center/center.component';

@NgModule({
  declarations: [
    AppComponent,
    CenterComponent,
  ],
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'center', pathMatch: 'full' },
      { path: 'center', component: CenterComponent }
    ]),
    CollapseModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

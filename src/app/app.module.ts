import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { InitialFormComponent } from './components/initial-form/initial-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { VideocallPageComponent } from './components/videocall-page/videocall-page.component';
import { ChatComponent } from './components/chat/chat.component';
import { CamsDisplayerComponent } from './components/cams-displayer/cams-displayer.component';
import { VcallHeaderComponent } from './components/vcall-header/vcall-header.component';

const routes: Routes = [
  { path: 'video-chat', component: VideocallPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DisclaimerComponent,
    InitialFormComponent,
    VideocallPageComponent,
    ChatComponent,
    CamsDisplayerComponent,
    VcallHeaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule { }

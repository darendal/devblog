import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillsComponent } from './skills/skills.component';
import {MatDividerModule} from "@angular/material/divider";
import {FlexModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatListModule,
        MatDividerModule,
        FlexModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

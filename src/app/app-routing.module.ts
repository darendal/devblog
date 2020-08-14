import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutComponent} from './about/about.component';
import {ExperienceComponent} from './experience/experience.component';
import {SkillsComponent} from './skills/skills.component';
import {BlogComponent} from './blog/blog.component';
import {PostComponent} from './post/post.component';

const routes: Routes = [
  {path: '', redirectTo: '/about', pathMatch: 'full'},
  {path: 'about',      component: AboutComponent, data: {title: 'About'}},
  {path: 'experience', component: ExperienceComponent, data: {title: 'Experience'}},
  {path: 'skills',     component: SkillsComponent, data: {title: 'Skills'}},
  {path: 'blog',       component: BlogComponent, data: {title: 'blog'}},
  {path: 'blog/posts/:id', component: PostComponent},
  {path: '**', redirectTo: '/about'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

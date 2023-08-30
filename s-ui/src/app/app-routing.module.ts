import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BodyComponent } from './components/shared/body/body.component';

const routes: Routes = [
  { path: '', component: BodyComponent, pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/modules/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SafeComponent } from './safe.component';

const routes: Routes = [
    {
        path: '',
        component: SafeComponent,
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SafeRoutes {}

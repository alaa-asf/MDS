import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './shared/guard/auth.guard';
import { RoleGuard } from './shared/guard/role.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                canActivate: [AuthGuard],
                children: [
                    {
                        path: 'logistics',
                        children:[
                            {
                                path: 'alloperations',
                                loadChildren: () => import('./modules/logistics/alloperations/alloperations.module').then(m => m.AlloperationsModule),
                                canActivate: [RoleGuard],
                                data: {
                                    roles: ["logistics"]
                                }
                            },
                            ///{ path: '**', redirectTo: '/alloperations' },

                        ]
                    },
                    {
                        path: 'users',
                        loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
                        canActivate: [RoleGuard],
                        data: {
                            roles: ['ITBOSS']
                        }
                    },
                    {
                        path: 'roles',
                        loadChildren: () => import('./modules/roles/roles.module').then(m => m.RolesModule),
                        canActivate: [RoleGuard],
                        data: {
                            roles: ['ITBOSS']
                        }
                    },
                    {
                        path: 'permissions',
                        loadChildren: () => import('./modules/permissions/permissions.module').then(m => m.PermissionsModule),
                        canActivate: [RoleGuard],
                        data: {
                            roles: ['ITBOSS']
                        }
                    },
                    ///{ path: '**', redirectTo: '/logistics' },

                ]
            },
            { path: 'auth', loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ],
            { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })

    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

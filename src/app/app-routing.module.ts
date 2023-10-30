import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { RoleGuard } from './shared/guard/role.guard';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    canActivate: [AuthGuard],
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './modules/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                            canActivate: [RoleGuard],
                            data: {
                                roles: ['ITBOSS'],
                            },
                        },
                        {
                            path: 'logistics',
                            children: [
                                {
                                    path: 'alloperations',
                                    loadChildren: () =>
                                        import(
                                            './modules/logistics/alloperations/alloperations.module'
                                        ).then((m) => m.AlloperationsModule),
                                    canActivate: [RoleGuard],
                                    data: {
                                        roles: ['logistics'],
                                    },
                                },
                                ///{ path: '**', redirectTo: '/alloperations' },
                            ],
                        },
                        {
                            path: 'users',
                            loadChildren: () =>
                                import('./modules/users/users.module').then(
                                    (m) => m.UsersModule
                                ),
                            canActivate: [RoleGuard],
                            data: {
                                roles: ['ITBOSS'],
                            },
                        },
                        {
                            path: 'roles',
                            loadChildren: () =>
                                import('./modules/roles/roles.module').then(
                                    (m) => m.RolesModule
                                ),
                            canActivate: [RoleGuard],
                            data: {
                                roles: ['ITBOSS'],
                            },
                        },
                        {
                            path: 'permissions',
                            loadChildren: () =>
                                import(
                                    './modules/permissions/permissions.module'
                                ).then((m) => m.PermissionsModule),
                            canActivate: [RoleGuard],
                            data: {
                                roles: ['ITBOSS'],
                            },
                        },
                        {
                            path: 'new-shipping',
                            loadChildren: () =>
                                import(
                                    './modules/newshipping/newshipping.module'
                                ).then((m) => m.NewshippingModule),
                        },
                        {
                            path: 'safe',
                            loadChildren: () =>
                                import('./modules/safe/safe.module').then(
                                    (m) => m.SafeModule
                                ),
                            canActivate: [RoleGuard],
                            data: {
                                roles: ['ITBOSS'],
                            },
                        },
                        {
                            path: 'finfunds',
                            loadChildren: () =>
                                import(
                                    './modules/financial-funds/financial-funds.module'
                                ).then((m) => m.FinancialFundsModule),
                            canActivate: [RoleGuard],
                            data: {
                                roles: ['ITBOSS'],
                            },
                        },
                        {
                            path: 'outBoxTransactions',
                            loadChildren: () =>
                                import(
                                    './modules/out-box-transactions/out-box-transactions.module'
                                ).then((m) => m.OutBoxTransactionsModule),
                            canActivate: [RoleGuard],
                            data: {
                                roles: ['ITBOSS'],
                            },
                        },
                        {
                            path: 'safeCashTransReport',
                            loadChildren: () =>
                                import(
                                    './modules/safe-cash-trans-report/safe-cash-trans-report.module'
                                ).then((m) => m.SafeCashTransReportModule),
                            canActivate: [RoleGuard],
                            data: {
                                roles: ['ITBOSS'],
                            },
                        },
                        {
                            path: 'payDebtToSafe',
                            loadChildren: () =>
                                import(
                                    './modules/pay-debt-to-safe/pay-debt-to-safe.module'
                                ).then((m) => m.PayDebtToSafeModule),
                            canActivate: [RoleGuard],
                            data: {
                                roles: ['ITBOSS'],
                            },
                        },
                        {
                            path: 'branchReturnables',
                            loadChildren: () =>
                                import(
                                    './modules/branch-returnables/branch-returnables.module'
                                ).then((m) => m.BranchReturnablesModule),
                            canActivate: [RoleGuard],
                            data: {
                                roles: ['ITBOSS'],
                            },
                        },
                        {
                            path: 'rtn_barcode_isolator',
                            loadChildren: () =>
                                import(
                                    './modules/rtn-barcode-isolator/rtn-barcode-isolator.module'
                                ).then((m) => m.RtnBarcodeIsolatorModule),
                            canActivate: [RoleGuard],
                            data: {
                                roles: ['ITBOSS'],
                            },
                        },
                        {
                            path: 'pickupagent_return',
                            loadChildren: () =>
                                import(
                                    './modules/pickupagent-return/pickupagent-return.module'
                                ).then((m) => m.PickupagentReturnModule),
                            canActivate: [RoleGuard],
                            data: {
                                roles: ['ITBOSS'],
                            },
                        },
                        {
                            path: 'customerReturnables',
                            loadChildren: () =>
                                import(
                                    './modules/customer-returnables/customer-returnables.module'
                                ).then((m) => m.CustomerReturnablesModule),
                            canActivate: [RoleGuard],
                            data: {
                                roles: ['ITBOSS'],
                            },
                        },
                        {
                            path: 'agentReturnables',
                            loadChildren: () =>
                                import(
                                    './modules/agent-returnables/agent-returnables.module'
                                ).then((m) => m.AgentReturnablesModule),
                            canActivate: [RoleGuard],
                            data: {
                                roles: ['ITBOSS'],
                            },
                        },
                        {
                            path: 'income-outcome',
                            canActivate: [RoleGuard],
                            data: {
                                roles: ['ITBOSS'],
                            },
                            loadChildren: () =>
                                import(
                                    './modules/income-outcome/income-outcome.module'
                                    ).then((m) => m.IncomeOutcomeModule),
                        },
                        // { path: '**', redirectTo: '/' },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./core/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}

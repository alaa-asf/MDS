import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuChangeEvent } from './api/menuchangeevent';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    menu: any = [
        {
            label: 'الرئيسية',
            visible: false,
            items: [
                {
                    label: 'الواجهة الرئيسية',
                    roles: ['ITBOSS'],
                    icon: 'pi pi-fw pi-chart-bar',
                    visible: false,
                    routerLink: ['/'],
                },
            ],
        },
        {
            label: 'طلبات الشحن',
            visible: false,
            items: [
                {
                    label: 'انشاء شحنات على مستوى المحافظة',
                    roles: ['ITBOSS'],
                    icon: 'pi pi-box',
                    visible: false,
                    routerLink: ['/new-shipping'],
                },
            ],
        },
        // {
        //     label: 'طلبات الشحن',
        //     visible: false,
        //     items: [
        //         {label: 'انشاء شحنات على مستوى المحافظة',roles: ['user'], icon: 'pi pi-box', visible: false, routerLink: ['/new-shipping']},
        //     ]
        // },
        {
            label: 'عمليات التوصيل',
            visible: false,
            items: [
                {
                    label: 'كل مراحل النقل',
                    roles: ['logistics'],
                    icon: 'pi pi-fw pi-home',
                    visible: false,
                    routerLink: ['/logistics/alloperations'],
                },
            ],
        },
        {
            label: 'الاعدادات الأدراية',
            visible: false,
            items: [
                {
                    label: 'صلاحيات',
                    roles: ['ITBOSS'],
                    icon: 'pi pi-fw pi-shield',
                    visible: false,
                    routerLink: ['/permissions'],
                },
                {
                    label: 'الأدوار',
                    roles: ['ITBOSS'],
                    icon: 'pi pi-fw pi-user-plus',
                    visible: false,
                    routerLink: ['/roles'],
                },
                {
                    label: 'المستخدمين',
                    roles: ['ITBOSS'],
                    icon: 'pi pi-fw pi-user',
                    visible: false,
                    routerLink: ['/users'],
                },
            ],
        },

        {
            label: 'النظام المصرفي',
            visible: false,
            items: [
                {
                    label: 'القاصة',
                    roles: ['ITBOSS'],
                    visible: false,
                    routerLink: ['/safe'],
                },
                {
                    label: 'الصناديق المالية',
                    roles: ['ITBOSS'],
                    visible: false,
                    routerLink: ['/finfunds'],
                },
                {
                    label: 'حركات الصندوق المالي',
                    roles: ['ITBOSS'],
                    visible: false,
                    routerLink: ['/outBoxTransactions'],
                },
                {
                    label: 'المبالغ النقدية من القاصة',
                    roles: ['ITBOSS'],
                    visible: false,
                    routerLink: ['/safeCashTransReport'],
                },
                {
                    label: 'تسديد الديون ',
                    roles: ['ITBOSS'],
                    visible: false,
                    routerLink: ['/payDebtToSafe'],
                },
            ],
        },
        {
            label: 'تصفيات الراجع',
            visible: false,
            items: [
                {
                    label: 'استلام راجع من المندوب',
                    roles: ['ITBOSS'],
                    visible: false,
                    routerLink: ['/agentReturnables'],
                },
                {
                    label: 'تسليم الراجع للعميل',
                    roles: ['ITBOSS'],
                    visible: false,
                    routerLink: ['/customerReturnables'],
                },
                {
                    label: 'تسليم الراجع لمندوب الاستلام',
                    roles: ['ITBOSS'],
                    visible: false,
                    routerLink: ['/pickupagent_return'],
                },
                {
                    label: 'فرز الراجع للفروع',
                    roles: ['ITBOSS'],
                    visible: false,
                    routerLink: ['/rtn_barcode_isolator'],
                },
                {
                    label: 'ارشيف منفيستات الرواجع المرسلة من الفروع',
                    roles: ['ITBOSS'],
                    visible: false,
                    routerLink: ['/branchReturnables'],
                },
            ],
        },
        {
            label: 'أيرادات ومصروفات',
            visible: false,
            items:[
                {
                    label: 'حسابات مندوب التوصيل',
                    roles: ['ITBOSS'],
                    visible: false,
                    routerLink: ['/income-outcome/agent-account'],
                },
            ]
        }
    ];

    private menuSource = new Subject<MenuChangeEvent>();
    private resetSource = new Subject();
    private menuVisibility = new Subject<any>();

    menuSource$ = this.menuSource.asObservable();
    resetSource$ = this.resetSource.asObservable();
    menuVisibility$ = this.menuVisibility.asObservable();

    onMenuStateChange(event: MenuChangeEvent) {
        this.menuSource.next(event);
    }

    setMenuVisibility(permission: any[]) {
        this.menu.forEach((el: any) => {
            el.items?.forEach((element: any) => {
                element.visible = !!permission?.some((per) =>
                    element.roles.includes(per.replace(/^ROLE_/, ''))
                );
            });
            el.visible = el.items.some((el: any) => el.visible);
        });
    }
    reset() {
        this.resetSource.next(true);
    }
}

import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MenuChangeEvent} from './api/menuchangeevent';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    menu: any = [
        {
            label: '',
            visible: false,
            items: [
                {label: 'Dashboard', roles: ['Dashboard'], icon: 'pi pi-fw pi-chart-bar', visible: false, routerLink: ['/']},
            ]
        },
        {
            label: 'عمليات التوصيل',
            visible: false,
            items: [
                {label: 'كل مراحل النقل',roles: ['logistics'], icon: 'pi pi-fw pi-home', visible: false, routerLink: ['/logistics/alloperations']}
            ]
        },
        {
            label: 'الاعدادات الأدراية',
            visible: false,
            items: [
                {label: 'صلاحيات',roles: ['ITBOSS'], icon: 'pi pi-fw pi-shield', visible: false, routerLink: ['/permissions']},
                {label: 'الأدوار',roles: ['ITBOSS'], icon: 'pi pi-fw pi-user-plus', visible: false, routerLink: ['/roles']},
                {label: 'المستخدمين',roles: ['ITBOSS'], icon: 'pi pi-fw pi-user', visible: false, routerLink: ['/users']},
            ]
        }
    ];

    private menuSource = new Subject<MenuChangeEvent>();
    private resetSource = new Subject();
    private menuVisibility = new Subject<any>();

    menuSource$ = this.menuSource.asObservable();
    resetSource$ = this.resetSource.asObservable();
    menuVisibility$ = this.menuVisibility.asObservable()

    onMenuStateChange(event: MenuChangeEvent) {
        this.menuSource.next(event);
    }

    setMenuVisibility(permission:any[]) {
        this.menu.forEach((el: any) => {
            el.items?.forEach((element: any) => {
                element.visible = !!permission?.some(per=>element.roles.includes(per.replace(/^ROLE_/, '')))
            });
            el.visible = el.items.some((el:any)=>el.visible)
        })
    }
    reset() {
        this.resetSource.next(true);
    }
}

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthService } from './shared/services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import {MessageService} from "primeng/api";
import { AgentAccountComponent } from './modules/income-outcome/agent-account/agent-account.component';
import {PrimeNgModule} from "./shared/primeng.module";
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {ConfirmPopupModule} from "primeng/confirmpopup";


@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, AgentAccountComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        PrimeNgModule,
        DatePipe,
        CurrencyPipe,
        NgIf,
        ConfirmPopupModule
    ],
    providers: [
        JwtHelperService,
        AuthService,
        MessageService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },


    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

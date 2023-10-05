import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from 'src/app/shared/Apis/reports.service';
import { StateService } from 'src/app/shared/services/state.service';

@Component({
    selector: 'app-newshipping',
    templateUrl: './newshipping.component.html',
    styleUrls: ['./newshipping.component.scss'],
})
export class NewshippingComponent implements OnInit {
    governorates: [] = [];
    stores: [] = [];
    regions: [] = [];

    newShippingForm = this.fb.group({
        state: ['', [Validators.required]], //المحافظة
        merchantName: [''], //المتجر id
        district: [''], //المنطقة الي جبتا حسب المحافظة
        handPhone: [''], //هاتف المتجر
        receiptNumber: [''], //رقم الوصل
        receiptAmount: [''], //مبلغ الوصل دينار عراقي
        receiptAmountUsd: [''], //مبلغ الوصل دولار
        endCustomerPhone: [''], //هاتف المستلم
        addressDetails: [''], //العنوان
        notes: [''], //ملاحظات
    });

    constructor(
        public fb: FormBuilder,
        private _reportsService: ReportsService,
        private _stateService: StateService
    ) {
        this.changeName(this._stateService.states);
        this.governorates = this._stateService.states;
        console.log(this._stateService.states);
    }

    ngOnInit() {}

    getAllDistritCodes(district: any) {
        this._stateService.deliveryAgents(district);
    }

    changeName(states: any) {
        states?.forEach((state: any) => {
            switch (state.label) {
                case 'Maysan':
                    state.label = 'ميسن';
                    break;
                case 'Al-Anbar':
                    state.label = 'الانبار';
                    break;
                case 'Erbil':
                    state.label = 'اربيل';
                    break;
                case 'Basra':
                    state.label = 'بصرى';
                    break;
                case 'Babil':
                    state.label = 'بابيل';
                    break;
                case 'Baghdad':
                    state.label = 'بغداد';
                    break;
                case 'Duhok':
                    state.label = 'دهوك';
                    break;
                case 'Al-Qādisiyyah':
                    state.label = 'القادسية';
                    break;
                case 'Diyala':
                    state.label = 'ديالا';
                    break;
                case 'Wasit':
                    state.label = 'واسط';
                    break;
                case 'Karbala':
                    state.label = 'كربلاء';
                    break;
                case 'Kirkuk':
                    state.label = 'كركوك';
                    break;
                case 'Ninawa':
                    state.label = 'نينوى';
                    break;
                case 'Dhi Qar':
                    state.label = 'ذي قار';
                    break;
                case 'Najaf':
                    state.label = 'النجف';
                    break;
                case 'Salah Al-Din':
                    state.label = 'صلاح الدين';
                    break;
                case 'Muthanna':
                    state.label = 'مثنى';
                    break;
                case 'Sulaymaniyah':
                    state.label = 'سليمانية';
                    break;
                default:
                    console.log('Invalid operator');
                    break;
            }
        });
    }
}
//for dropdown
// this.cities = [
//   { name: 'New York', code: 'NY' },
//   { name: 'Rome', code: 'RM' },
//   { name: 'London', code: 'LDN' },
//   { name: 'Istanbul', code: 'IST' },
//   { name: 'Paris', code: 'PRS' }
// ];

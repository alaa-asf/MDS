import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from 'src/app/shared/Apis/reports.service';
import { ShippingService } from 'src/app/shared/Apis/shipping.service';
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
    loading = false;
    totalCases: any = ['1'];
    newShippingForm: any;
    districts:[] = [];
    district: any;
    constructor(
        public fb: FormBuilder,
        private _stateService: StateService,
        private _shippingService: ShippingService
    ) {
        this.changeName(this._stateService.states);
        this.governorates = this._stateService.states;
        console.log(this._stateService.states);
        this.newShippingForm = this.fb.group({
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
    }

    ngOnInit() { }

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

    selectGovernorates(governorate: any) {
        console.log(governorate.value);
        this.getAllDistritCodes(governorate.value);
    }

    addCase() {
        this.loading = true;
        this.totalCases.push("1");
        this.loading = false;
    }

    getAllDistritCodes(stateCode: any) {
        this._shippingService.get_all_distritCodes(stateCode.value).subscribe((data: any) => {
            console.log(data);
            let newArray = data.map((element:any) => {
                return { name: element };
              });
            this.districts = newArray;
        })
    }

    
}


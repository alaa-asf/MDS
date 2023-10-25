import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AnyPtrRecord } from 'dns';
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
    governorate: any;
    stores: [] = [];
    regions: [] = [];
    loading = false;
    totalCases: any = ['1'];
    newShippingForm: any;
    districts: [] = [];
    district: any;
    totalShipping: any = [];
    caseId = 0;
    constructor(
        public fb: FormBuilder,
        private _stateService: StateService,
        private _shippingService: ShippingService
    ) {
        this.changeName(this._stateService.states);
        this.governorates = this._stateService.states;
        this.newShippingForm = this.fb.group({
            state: ['', [Validators.required]], //المحافظة
            merchantName: [''], //المتجر id
            district: [''], //المنطقة الي جبتا حسب المحافظة
            handPhone: [''], //هاتف المتجر
            receiptNumber: "", //رقم الوصل
            receiptAmount: [''], //مبلغ الوصل دينار عراقي
            receiptAmountUsd: [''], //مبلغ الوصل دولار
            endCustomerPhone: "", //هاتف المستلم
            addressDetails: [''], //العنوان
            notes: [''], //ملاحظات
            branchId: ['']
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
        this.getAllDistritCodes(governorate.value);
    }

    addCase() {
        let shipping = {
            "state": this.newShippingForm.value.state.value,
            "district": this.newShippingForm.value.district.id,
            "merchantName": this.newShippingForm.value.merchantName.branchId,
            "handPhone": this.newShippingForm.value.merchantName.phoneNumber,
            "endCustomerPhone": this.newShippingForm.value.endCustomerPhone,
            "receiptNumber": this.newShippingForm.value.receiptNumber,
            "receiptAmount": this.newShippingForm.value.receiptAmount,
            "receiptAmountUsd": this.newShippingForm.value.receiptAmountUsd,
            "addressDetails": this.newShippingForm.value.addressDetails,
            "notes": this.newShippingForm.value.notes,
            "branchId": 1
        }
        this.totalShipping.push({ id: this.caseId, value: shipping });
        this.caseId++
        this.totalCases.push(1);       // this._shippingService.addShippingGovernorate(shipping).subscribe(res => {
        //     console.log(res);

        // })
    }

    sendAllCases() {
        console.log(this.newShippingForm);

        console.log(this.totalShipping);

        // this._shippingService.addShippingGovernorate(shipping).subscribe(res => {
        //     console.log(res);

        // })
    }

    deleteAllCases() {
        this.totalShipping = [];
        this.totalCases = [];
    }

    getAllDistritCodes(stateCode: any) {
        this._shippingService.get_all_distritCodes(stateCode.value).subscribe((data: any) => {
            this.districts = data;
        })
    }

    selectDistrict(event: any) {
        let stateCode = this.newShippingForm.value.state.value;
        this.getStores(stateCode);
    }

    getStores(stateCode: AnyPtrRecord) {
        this._shippingService.getStoresByStatuscode(stateCode).subscribe(((res: any) => {
            this.stores = res;
        }))
    }

    selectStore(event: any) {
        this.newShippingForm.get('handPhone').disable();
        this.newShippingForm.get('handPhone').setValue(this.newShippingForm.value.merchantName.phoneNumber);

    }

    deleteCase(index: any) {
        console.log(index);
        this.totalCases.splice(index, 1);
        this.totalShipping.splice(index, 1);
    }
}
import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnyPtrRecord} from 'dns';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ShippingService} from 'src/app/shared/Apis/shipping.service';
import {StateService} from 'src/app/shared/services/state.service';

@Component({
    selector: 'app-newshipping',
    templateUrl: './newshipping.component.html',
    styleUrls: ['./newshipping.component.scss'],
    providers: [ConfirmationService, MessageService],
})
export class NewshippingComponent implements OnInit {
    stores: [] = [];
    loading = false;
    districts: [] = [];
    district: any;
    state:any
    casesForm: FormGroup;
    visible = false
    duplicateCases=[]
    col = [
        {title: 'العنوان', dataKey: 'address'},
        {title: 'رقم الوصل', dataKey: 'custReceiptNoOri'},
        {title: 'هاتف المستلم', dataKey: 'receiverHp1'},
        {title: 'إسم المتجر', dataKey: 'senderName'},
        {title: 'هاتف المتجر', dataKey: 'senderHp'},
        {title: 'المبلغ المطلوب د.ع', dataKey: 'receiptAmtIqd'},
        {title: 'المبلغ المطلوب $', dataKey: 'receiptAmtUsd'},
        {title: 'ملاحظات', dataKey: 'qrmk',},
        {title: 'انشئ بتاريخ', dataKey: 'createddt',},

    ]

    constructor(
        public fb: FormBuilder,
        public _stateService: StateService,
        private _shippingService: ShippingService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
    ) {
        this.casesForm = this.fb.group({
            shippingForm: new FormArray([]) ,
        });
    }
    get cases() : FormArray {
        return this.casesForm?.get('shippingForm') as FormArray
    }
    newSkill(): FormGroup {
        return this.fb.group({
            merchantName: ['',[Validators.required]], //المتجر id
            district: ['',[Validators.required]], //المنطقة الي جبتا حسب المحافظة
            handPhone: [{value: '', disabled: true}], //هاتف المتجر
            receiptNumber: ["",[Validators.required]], //رقم الوصل
            receiptAmount: [0,[Validators.required]], //مبلغ الوصل دينار عراقي
            receiptAmountUsd: [0,[Validators.required]], //مبلغ الوصل دولار
            endCustomerPhone: ["",[Validators.required]], //هاتف المستلم
            addressDetails: [''], //العنوان
            notes: [''], //ملاحظات
            branchId: [1]
        })
    }

    ngOnInit() {
    }

    selectGovernorates(governorate: any) {
        this.getAllDistritCodes(governorate.value);
        this.getStores(governorate.value);
        this.cases.clear()
        this.cases?.push(this.newSkill())

    }

    addCase() {
        this.cases?.push(this.newSkill())
    }

    sendAllCases(ignore = 0) {
        this.loading = true
        let orders = [...this.cases.getRawValue()]
        orders = orders.map((el:any)=>{return {...el,'state':this.state.value}})
        let shipping = {
            "ignore":ignore,
            "orders":orders
        }
        this._shippingService.addShippingGovernorate(shipping).subscribe((res:any) => {
            this.loading = false
            this.visible = false
            if(res.length==0){
                this.cases.clear()
                this.cases?.push(this.newSkill())
                this.messageService.add({
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'تمت عملية الاضافة',
                });
            }else{
                this.duplicateCases = res
                this.visible = true
            }
        }, error => {
            this.loading = false
            this.messageService.add({
                severity: 'error',
                summary: 'Rejected',
                detail: 'حدث خطأ ما',
            });
        })
    }
    replace(){
        this.sendAllCases(1)
    }
    deleteAllCases() {
        this.cases.clear()
        this.cases?.push(this.newSkill())
    }

    getAllDistritCodes(stateCode: any) {
        this.districts = []
        this._shippingService.get_all_distritCodes(stateCode.value).subscribe((data: any) => {
            this.districts = data;
        })
    }


    getStores(stateCode: AnyPtrRecord) {
        this.stores = []
        this._shippingService.getStoresByStatuscode(stateCode.value).subscribe(((res: any) => {
            this.stores = res;
        }))
    }

    selectStore(event: any,index:any) {
        this.cases.at(index)?.get('merchantName')?.setValue(event.value.branchId);
        this.cases.at(index)?.get('handPhone')?.setValue(event.value.phoneNumber);
    }

    deleteCase(index: any) {
        this.cases?.removeAt(index)
    }
}

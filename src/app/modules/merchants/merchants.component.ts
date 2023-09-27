import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "../../shared/base.component";
import {ReportsService} from "../../shared/Apis/reports.service";
import * as FileSaver from "file-saver";
import * as moment from 'moment';
import { codeToString } from 'src/app/shared/constant/states';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss']
})
export class MerchantsComponent extends BaseComponent implements OnInit {
    constructor(injector: Injector, private reportsService: ReportsService) {
        super(injector)
    }
    codeToString= codeToString
    data: any[] = []
    new_Date: Date = new Date();
    rangeDates: any = []
    states:any=[]
    districts:any=[]
    totalRecords = 0
    loading: boolean = false
    filters = {
        "vendorPhone": null,
        "state":null,
        "district":null,
        "startDate":null,
        "endDate":null,
        "pageSize":10,
        "page":1
    }

    ngOnInit(): void {
        this.rangeDates = [new Date(moment(this.new_Date).subtract(1, 'years').format()), this.new_Date]
        this.reportsService.getAllStateCodes().subscribe((el:any)=>{
            el.forEach((element:any) => {
                this.states.push( { label: codeToString[element], value: element })
            });
        })
        this.getData()
    }
    selectState(state:any){
        this.districts= []
         this.reportsService.getAllDistritCodes(state.value).subscribe((el:any)=>{
            el.forEach((element:any) => {
                this.districts.push( { label: element, value: element })
            });
        })
    }
    changePage(ev:any){
        this.filters.page = (ev.first/10)+1
        this.getData()
    }
    resetFilter(){
        this.filters.vendorPhone = null
        this.filters.state = null
        this.filters.district = null
        this.rangeDates = []
        this.getData()
    }
    getData() {
        this.filters.vendorPhone = this.filters.vendorPhone?this.filters.vendorPhone:null
        this.filters.state = this.filters.state?this.filters.state:null
        this.filters.district = this.filters.district?this.filters.district:null
        this.filters.startDate = this.rangeDates && this.rangeDates[0]?this.utility.convertDate(this.rangeDates[0]):null
        this.filters.endDate = this.rangeDates && this.rangeDates[1]?this.utility.convertDate(this.rangeDates[1]):null
        this.loading = true
        this.reportsService.getMerchantData(this.filters).subscribe((el: any) => {
            this.data = el.data
            this.totalRecords = el.totalRecords
            this.loading = false
        })
    }
    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.data);
            const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
            const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
            this.saveAsExcelFile(excelBuffer, 'all Data');
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
}


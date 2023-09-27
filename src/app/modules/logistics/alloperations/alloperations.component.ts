import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../../shared/Apis/dashboard.service";

@Component({
  selector: 'app-alloperations',
  templateUrl: './alloperations.component.html',
  styleUrls: ['./alloperations.component.scss']
})
export class AlloperationsComponent implements OnInit {
    stages=[
        {
            name:'شحنات جديده قادمة في الطريق',
            code:'NEW_ONWAY',
            stage:'INIT',
            value:0
        },
        {
            name:'داخل المخزن',
            code:'NEWINSTORE',
            stage:'INIT',
            value:0
        },
        {
            name:'طباعة المنفيست لمندوبين التوصيل',
            code:'PRINTMANIFEST',
            stage:'INIT',
            value:0
        },
        {
            name:'قيد التوصيل',
            code:'ONWAY',
            stage:'AGENTOP',
            value:0
        },
        {
            name:'راجع عند المندوب',
            code:'RTN_WITHAGENT',
            value:0,
            stage:'AGENTOP',
        },
        {
            name:'مؤجل',
            code:'POSTPONED',
            value:0,
            stage:'AGENTOP',
        },
        {
            name:'إعادة توصيل',
            code:'TRY_AGAIN',
            value:0,
            stage:'AGENTOP',
        },
        {
            name:'شحنات راجعه في المخزن',
            code:'RTN_INSTORE',
            value:0,
            stage:'CNCL',
        },
        // {
        //     "stepId": 8,
        //     "name": "أرشيف شحنات راجعة",
        //     "code": "RTNARCHV",
        //     value:0,
        //     stage:'CNCL',
        // },
        {
            name:'واصل أجباري',
            code:'FORCE_DLV',
            value:0,
            stage:'DLV',
        },
        {
            name:'شحنات سلمت بنجاح',
            code:'DLEIVERD',
            value:0,
            stage:'DLV',
        },
        {
            name:'تسليم جزئيا أو أستبدال',
            code:'PART_SUCC',
            value:0,
            stage:'DLV',
        },
        {
            name:'سلمت مع تغيير المبلغ',
            code:'SUCC_CHANGEPRICE',
            value:0,
            stage:'DLV',
        },
        {
            name:'طباعة منفيست للفروع',
            code:'MANIFEST_BRANCHES',
            value:0,
            stage:'BRANCHES',
        },
        {
            name:'شحنات جديدة بين فرعين',
            code:'LIAISONAGT_NEWONWAY',
            value:0,
            stage:'BRANCHES',
        },
        {
            name:'استلام الراجع من الفروع',
            code:'RTN_WITHLIAISONAGENT',
            value:0,
            stage:'BRANCHES',
        },
        {
            name:'رواجع الفروع في المخزن',
            code:'RTN_INSTORE_WAITLIAISON',
            value:0,
            stage:'BRANCHES',
        },
        {
            name:'رواجع جاهزة للتسليم للفروع',
            code:'RTN_MANIFEST_LIAISON',
            value:0,
            stage:'BRANCHES',
        },
        {
            name:'جاهز للطبع',
            code:'READYTOPRINT',
            value:0,
            stage:'NEWCUSTLOGI',
        },
        {
            name:'جاهز للبيك اب',
            code:'READYTOPICKUP',
            value:0,
            stage:'NEWCUSTLOGI',
        }
    ]
    isLoading=true
    stepByStage(stage:any){
        return this.stages.filter(el=>el.stage == stage)
    }
    constructor(private dashboardService:DashboardService) {
    }

    ngOnInit(): void {
        this.dashboardService.getSummaryData().subscribe((el:any)=>{
            el.forEach((z:any)=>{
                this.stages.forEach(x=> {
                    if (x.code == z.step){
                        x.value = z.stepCount
                    }
                })
                this.isLoading = false
            })
        })
    }
}

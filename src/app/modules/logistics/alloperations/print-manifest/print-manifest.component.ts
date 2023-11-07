import {Component, Injector, OnInit} from '@angular/core';
import {BaseComponent} from "../../../../shared/base.component";
import {ActivatedRoute} from "@angular/router";
import {StateService} from "../../../../shared/services/state.service";
import {MainService} from "../../../../shared/Apis/main.service";
import {DashboardService} from "../../../../shared/Apis/dashboard.service";
import {BehaviorSubject, combineLatest, finalize, forkJoin, Subscription} from "rxjs";
import {stage, step, stepId} from "../../../../shared/constant/stage";
import * as moment from 'moment/moment';

@Component({
    selector: 'app-print-manifest',
    templateUrl: './print-manifest.component.html',
    styleUrls: ['./print-manifest.component.scss']
})
export class PrintManifestComponent extends BaseComponent implements OnInit {
    stage: any
    step: any
    stepEnum = step
    stageEnum = stage

    data: any[] = []
    cases: any = []
    states: any = []
    districts: any = []
    totalRecords = 0
    selectedAgent: any
    col: any = []
    stepDialogVisible = false
    loading: boolean = false
    decisionId: any
    optionForAction: any = {}
    columns: any = []
    operation: any = []
    singleCases:any = []
    visible: any = false
    title =''
    constructor(injector: Injector, private route: ActivatedRoute,
                public state: StateService,
                private mainService: MainService,
                private dashboardService: DashboardService) {
        super(injector)
        this.stage = this.route.snapshot.url[0].path;
        this.step = this.route.snapshot.url[1].path;

    }

    canPrintNow = new BehaviorSubject<boolean>(false)

    get filterOperation() {
        return this.operation.filter((el: any) => el.value == 'TOINSTORE')
    }
    changeDecisionSingle(data:any,event:any){
        this.singleCases=this.singleCases.filter((el:any)=>el != data.caseId)
        if (event.value){
            this.singleCases.push(data.caseId)
        }
        console.log(this.singleCases)
    }
    savecases(){
        let cases = {
            "cases": [...this.singleCases],
            "branchId": 31
        }
        this.casesLoading = true
        this.dashboardService.manifestReturnToStoreSingleCases(cases).subscribe(res => {
            this.casesLoading = false
            this.singleCases = []
            this.openCases(this.selectedAgent)
        }, () => {
            this.casesLoading = false
        })
    }
    ngOnInit() {
        if (this.step == "PRINTMANIFEST") {
            this.col = [
                {title: 'العنوان', dataKey: 'address'},
                {title: 'رقم الوصل', dataKey: 'custReceiptNoOri'},
                {title: 'هاتف المستلم', dataKey: 'receiverHp1'},
                {title: 'إسم المتجر', dataKey: 'senderName'},
                {title: 'هاتف المتجر', dataKey: 'senderHp'},
                {title: 'المبلغ المطلوب د.ع', dataKey: 'receiptAmtIqd'},
                {title: 'المبلغ المطلوب $', dataKey: 'receiptAmtUsd'},
                {title: 'ملاحظات', dataKey: 'qrmk',},
            ]
        }
        if (this.step == "MANIFEST_BRANCHES") {
            this.col = [
                {title: 'إسم صاحب المحل', dataKey: 'custName'},
                {title: 'رقم الوصل', dataKey: 'custReceiptNoOri'},
                {title: 'مبلغ الوصل د.ع', dataKey: 'receiptAmt'},
                {title: 'مبلغ الوصل $', dataKey: 'receiptAmtUsd'},
                {title: 'العنوان', dataKey: 'address'},
                {title: 'هاتف المستلم', dataKey: 'rcvHp1'},
                {title: 'ملاحظات', dataKey: 'rmk',},
                {title: 'تاريخ الشحنه', dataKey: 'createdDate',},
                {title: 'العملية', dataKey: 'op',},
            ]
        }

        this.dashboardService.getDecisionsByStep(stepId[this.step]).subscribe((des: any) => {
            this.operation = des.map((obj: any) => ({
                value: obj.actionCode,
                label: obj.description
            }));
            this.optionForAction = {
                "CHNGE_AGENT": [
                    {
                        type: 'dropdown',
                        options: this.state.deliveryAgents,
                        placeholder: 'مندوب توصيل',
                        selected: null
                    }

                ]
            }
        })
        this.setData()
        this.getData()
    }

    save() {
        if (this.step == "PRINTMANIFEST") {
            let MoveToAgent = this.data.filter(el => el.decision == 'MOVETOAGENT')
            let ChangeAgent = this.data.filter(el => el.decision == 'CHNGE_AGENT')
            let returnToSore = this.data.filter(el => el.decision == 'RETURN_TO_STORE')
            let MoveToAgentData: any = []
            let ChangeAgentData: any = []
            let returnToSoreData:any = {
                'casesIds':[]
            }
            MoveToAgent.forEach(el => {
                MoveToAgentData.push({
                    "deliveryAgentId": el.agentId,
                    "comingFromBranch": el.comingFromBranch,
                    "branchId": el.branchCode,
                })
            })
            ChangeAgent.forEach(el => {
                ChangeAgentData.push({
                    "deliveryAgentId": el.agentId,
                    "deliveryAgentToChangeId": +el.optionForAction[0].selected,
                    "comingFromBranch": el.comingFromBranch,
                    "branchId": el.branchCode,
                })
            })
            returnToSore.forEach(el => {
                returnToSoreData = {
                    "casesIds": [...returnToSoreData['casesIds'],...el.caseIds]
                }
            })
            this.loading = true

            let completionObservables = [];
            if (ChangeAgent.length>0){
                completionObservables.push(this.dashboardService.ChangeAgent(ChangeAgentData).pipe(finalize(() => console.log('Subscription 1 completed.'))))
            }
            if (MoveToAgent.length>0){
                completionObservables.push(this.dashboardService.MoveToAgent(MoveToAgentData).pipe(finalize(() => console.log('Subscription 2 completed.'))))
            }
            if (returnToSore.length>0){
                completionObservables.push(this.dashboardService.returnToSore(returnToSoreData).pipe(finalize(() => console.log('Subscription 3 completed.'))))
            }

            const allCompleted$ = forkJoin(completionObservables);
            allCompleted$.subscribe({
                next: () => {
                    this.loading = false
                    this.getData()
                },
                error: (error) => {
                    this.loading = false
                }
            });
        }
        if (this.step == "MANIFEST_BRANCHES") {
            let updatedCases = this.data.filter(el => el.decision)
            let actionsMap: any = {}
            let keyAgentMap :any ={}
            let keyToBranchMap :any ={}

            updatedCases.forEach((obj: any) => {
                actionsMap[obj.specialkey] = obj.decision;
                keyAgentMap[obj.specialkey] = obj.liaisonAgentId;
                keyToBranchMap[obj.specialkey] = obj.agentId;

            });
            let otherData: any = {
                "toBranchliaisonagentActionsMap": actionsMap,
                "keyAgentMap": keyAgentMap,
                "keyToBranchMap": keyToBranchMap,
                "newDriversMap": {},
            }

            updatedCases.forEach((obj: any) => {
                if (obj.optionForAction) {
                    obj.optionForAction.forEach((opt: any) => {
                            otherData[opt.key][obj.caseId] = opt.selected
                    });
                }
            });

            let base = {
                "branchId": 31,
                ...otherData,
            }
            this.loading = true
            this.dashboardService.ManifestBranchesOp(base).subscribe(res => {
                this.loading = false
                this.getData()
            }, () => {
                this.loading = false
            })
        }
    }

    casesLoading = false

    openCases(data: any, out = false) {
        this.selectedAgent = data
        this.singleCases = []
        this.casesLoading = true
        if (!out) {
            this.visible = true
        }
        if (this.step == "PRINTMANIFEST"){
            this.title = `شحنات المندوب :`+this.selectedAgent?.agentName
            let filter = {
                "deliveryAgentId": data.agentId,
                "comingFromBranch": data.comingFromBranch,
                "branchId": data.branchCode,
            }
            this.cases=[]

            this.dashboardService.getDataToPrintDlvAgManifest(filter).subscribe(el => {
                this.cases = el
                this.casesLoading = false
                if (out) {
                    this.canPrintNow.next(true)
                }
            })
        }
        if (this.step == "MANIFEST_BRANCHES"){
            this.title = `شحنات مندوب الأرتباط :`+this.selectedAgent?.liaisonAgentName


            this.cases=[]

            this.dashboardService.getLiaisonAgentShipmentsBranches(data.agentId,data.fromBranch,data.liaisonAgentId).subscribe(el => {
                this.cases = el
                this.casesLoading = false
                if (out) {
                    this.canPrintNow.next(true)
                }
            })
        }
    }

    exportPdf(agent?: any) {
        if (!!agent) {
            this.openCases(agent, true)
            let sub = this.canPrintNow.subscribe(el => {
                this.print(sub)

            })
        } else {
            this.print()
        }

    }

    print(sub?: Subscription) {
        if (sub) {
            sub.unsubscribe()
        }
        let printCol = [...this.col].reverse().filter(el=>el.dataKey != 'op')
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then((x) => {
                const doc = new jsPDF.default('p', 'px', 'a4');
                doc.setFontSize(10)
                doc.addFont('assets/fonts/DINNextLTArabic-Regular.ttf', 'DINNEXTLTARABIC-LIGHT', 'normal');
                doc.setFont('DINNEXTLTARABIC-LIGHT');
                let footerCases = [...this.cases]
                if (this.step == "PRINTMANIFEST"){
                    footerCases.push(
                        [
                            {content: '', colSpan: 1, styles: {fillColor: '#B4B3B3'}},
                            {
                                content: footerCases.reduce((accumulator, currentValue) => accumulator + currentValue.receiptAmtUsd, 0),
                                colSpan: 1,
                                styles: {fillColor: '#B4B3B3'}
                            },
                            {
                                content: footerCases.reduce((accumulator, currentValue) => accumulator + currentValue.receiptAmtIqd, 0),
                                colSpan: 1,
                                styles: {fillColor: '#B4B3B3'}
                            },
                            {
                                content: `المبلغ الكلي المطلوب`, colSpan: 5,
                                styles: {fillColor: '#B4B3B3', halign: 'center'}
                            }
                        ]
                    )
                    doc.text('مندوب التوصيل : ' + this.selectedAgent.agentName, doc.internal.pageSize.width - 18, 70, {
                        align: 'right',
                        isOutputRtl: true
                    });
                    doc.text("طباعة المنفيست لمندوبين التوصيل", doc.internal.pageSize.width / 2, 110, {
                        align: 'center'
                    });
                    doc.text("رقم المنفيست " + this.cases[0].manifestNumber, doc.internal.pageSize.width / 2, 125, {
                        align: 'center'
                    });
                }
                if (this.step == "MANIFEST_BRANCHES"){
                    footerCases.push(
                        [
                            {content: '', colSpan: 4, styles: {fillColor: '#B4B3B3'}},
                            {
                                content: footerCases.reduce((accumulator, currentValue) => accumulator + Number(currentValue.receiptAmtUsd), 0),
                                colSpan: 1,
                                styles: {fillColor: '#B4B3B3'}
                            },
                            {
                                content: footerCases.reduce((accumulator, currentValue) => accumulator + currentValue.receiptAmt, 0),
                                colSpan: 1,
                                styles: {fillColor: '#B4B3B3'}
                            },
                            {
                                content: `المبلغ الكلي المطلوب`, colSpan: 2,
                                styles: {fillColor: '#B4B3B3', halign: 'center'}
                            }
                        ]
                    )
                    doc.text('مندوب الإرتباط : ' + this.selectedAgent.liaisonAgentName, doc.internal.pageSize.width - 18, 70, {
                        align: 'right',
                        isOutputRtl: true
                    });
                    doc.text("قائمه بالتسليمات المطلوبه", doc.internal.pageSize.width / 2, 110, {
                        align: 'center'
                    });
                    doc.text("رقم المنفيست " + this.cases[0].manifestId, doc.internal.pageSize.width / 2, 125, {
                        align: 'center'
                    });
                }
                doc.text('بتاريخ : ' + moment(new Date()).locale('ar').format('dddd') + ' , ' + moment(new Date()).format('DD-MM-YYYY'), doc.internal.pageSize.width - 18, 85, {
                    align: 'right',
                });



                (doc as any).autoTable(printCol, footerCases, {
                    headStyles: {font: "DINNEXTLTARABIC-LIGHT", fillColor: '#B4B3B3'},
                    bodyStyles: {font: "DINNEXTLTARABIC-LIGHT", textColor: '#000'},
                    styles: {
                        fontSize:8,
                        halign: 'right',
                        textColor: '#000'
                    },
                    showHead: "everyPage",

                    didDrawPage: function (data: any) {
                        //header
                        doc.setFontSize(8);
                        doc.addImage("assets/layout/images/logo-white.png", 10, 10, 30, 30);
                        doc.text(new Date().toLocaleString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            year: 'numeric'
                        }),  doc.internal.pageSize.width - 18, 30,{
                            align:'right'
                        });
                        // Footer
                        // @ts-ignore
                        var str = 'Page ' + doc.internal.getNumberOfPages()
                        doc.setFontSize(8)

                        // jsPDF 1.4+ uses getHeight, <1.4 uses .height
                        var pageSize = doc.internal.pageSize
                        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
                        doc.text(str, data.settings.margin.left, pageHeight - 10)
                    },
                    margin: {top: 160,left:10,right:10},
                });

                doc.save('products.pdf');
            });
        });
    }

    changeDecision(data: any, ev: any) {
        if (this.optionForAction[ev.value]) {
            data.optionForAction = JSON.parse(JSON.stringify(this.optionForAction[ev.value]));
        } else {
            data.optionForAction = null
        }
    }

    removeDuplicatesAndCountEntries(array: any,localkey='agentId') {
        const agents:any = {};

        // Loop through the array and process each object
        array.forEach((obj:any) => {
            const agentId = obj[localkey];

            if (agentId in agents) {
                // If agentId already exists, increment the count and add caseId to the array
                agents[agentId].count++;
                agents[agentId].caseIds.push(obj.caseId);
            } else {
                // If agentId doesn't exist, create a new entry
                agents[agentId] = {
                    count: 1,
                    caseIds: [obj.caseId],
                    agentData: {}
                };
            }

            // Copy all other data except agentId to the agentData object
            for (const key in obj) {
                if (key !== localkey) {
                    agents[agentId].agentData[key] = obj[key];
                }
            }
        });

        // Convert agents object back to an array
        const result = Object.keys(agents).map(agentId => ({
            agentId: parseInt(agentId),
            count: agents[agentId].count,
            caseIds: agents[agentId].caseIds,
            ...agents[agentId].agentData
        }));

        return result;
    }

    getData() {
        this.loading = true
        if (this.stage == "INIT" && this.step == "PRINTMANIFEST") {
            this.dashboardService.INIT_PRINTMANIFEST().subscribe((res: any) => {
                this.data = this.removeDuplicatesAndCountEntries(res)
                this.loading = false
            }, () => {
                this.loading = false
            })
        }
        if (this.stage == "BRANCHES" && this.step == "MANIFEST_BRANCHES") {
            this.dashboardService.getManifestBranches().subscribe((res: any) => {
                this.data = this.removeDuplicatesAndCountEntries(res,'toBranch')
                console.log(  this.data)
                this.loading = false
            }, () => {
                this.loading = false
            })
        }
        if (this.stage == "BRANCHES" && this.step == "RTN_MANIFEST_LIAISON") {
            this.dashboardService.getReturnedManifestBranches().subscribe((res: any) => {
                this.data = this.removeDuplicatesAndCountEntries(res,'toBranch')
                this.loading = false
            }, () => {
                this.loading = false
            })
        }
    }

    setData() {
        switch (this.step) {
            case 'PRINTMANIFEST':
                return this.PRINTMANIFEST();
            case 'MANIFEST_BRANCHES':
                return this.MANIFEST_BRANCHES();
            case 'RTN_MANIFEST_LIAISON':
                return this.RTN_MANIFEST_LIAISON();
        }
    }
    MANIFEST_BRANCHES() {
        this.columns = [
            {
                name: 'الى فرع',
                type: 'string',
                key: 'tobBranchName'
            },
            {
                name: 'المندوب',
                type: 'string',
                key: 'liaisonAgentName'
            },
            {
                name: 'عدد الشحنات',
                type: 'totcases',
                key: ''
            },
            {
                name: 'طباعة المنفيست',
                type: 'print',
                title: 'PDF طباعة الكشف',
            },
            {
                name: '',
                type: 'button',
                title: 'استلام الشحنات باركود',
                key: ''
            },
            {
                name: 'عدد الشحنات المستلمة باركود',
                type: '',
                key: ''
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'dropdown',
                key: ''
            }
        ]

    }
    RTN_MANIFEST_LIAISON() {
        this.columns = [
            {
                name: 'الى فرع',
                type: 'string',
                key: 'toBranch'
            },
            {
                name: 'المندوب',
                type: 'string',
                key: 'liaisonAgentName'
            },
            {
                name: 'عدد الشحنات',
                type: 'totcases',
                key: ''
            },
            {
                name: 'طباعة المنفيست',
                type: 'print',
                title: 'PDF طباعة الكشف',
            },
            {
                name: '',
                type: 'button',
                title: 'استلام الشحنات باركود',
                key: ''
            },
            {
                name: 'عدد الشحنات المستلمة باركود',
                type: '',
                key: ''
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'dropdown',
                key: ''
            }
        ]

    }


    PRINTMANIFEST() {
        this.columns = [
            {
                name: 'المندوب',
                type: 'string',
                key: 'agentName'
            },
            {
                name: 'عدد الشحنات',
                type: 'totcases',
                key: ''
            },
            {
                name: 'طباعة الكشف',
                type: 'print',
                title: 'PDF طباعة الكشف',
                key: ''
            },
            {
                name: '',
                type: 'button',
                title: 'استلام الشحنات باركود',
                key: ''
            },
            {
                name: 'عدد الشحنات المستلمة باركود',
                type: 'string',
                key: ''
            },
            {
                name: 'العمليه',
                option: this.operation,
                type: 'dropdown',
                key: ''
            },

        ]

    }

}

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
    visible: any = false

    constructor(injector: Injector, private route: ActivatedRoute,
                public state: StateService,
                private mainService: MainService,
                private dashboardService: DashboardService) {
        super(injector)
        this.stage = this.route.snapshot.url[0].path;
        this.step = this.route.snapshot.url[1].path;

    }

    canPrintNow = new BehaviorSubject<boolean>(false)

    filterOperation(item: any) {
        if (true) {
            return this.operation.filter((el: any) => el.value == 'ASSGN_AGENT')

        }
        if (item.toLiaisonAgent) {
            return this.operation.filter((el: any) => el.value == 'ASSIGN_LIASIONAGT')
        }
    }

    ngOnInit() {
        this.col = [
            {title: 'العنوان', dataKey: 'address'},
            {title: 'رقم الوصل', dataKey: 'custReceiptNoOri'},
            {title: 'هاتف المستلم', dataKey: 'receiverHp1'},
            {title: 'إسم المتجر', dataKey: 'senderName'},
            {title: 'هاتف المتجر', dataKey: 'senderHp'},
            {title: 'المبلغ المطلوب د.ع', dataKey: 'receiptAmtIqd'},
            {title: 'المبلغ المطلوب $', dataKey: 'receiptAmtUsd'},
            {title: 'ملاحظات', dataKey: 'qrmk',},
        ].reverse()

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
        if (this.stage == 'INIT' && this.step == "PRINTMANIFEST") {
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
    }

    casesLoading = false

    openCases(data: any, out = false) {
        this.selectedAgent = data
        this.casesLoading = true
        if (!out) {
            this.visible = true
        }
        let filter = {
            "deliveryAgentId": data.agentId,
            "comingFromBranch": data.comingFromBranch,
            "branchId": data.branchCode,
        }

        this.dashboardService.getDataToPrintDlvAgManifest(filter).subscribe(el => {
            this.cases = el
            this.casesLoading = false
            if (out) {
                this.canPrintNow.next(true)
            }
        })
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
        let footerCases = [...this.cases]
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

        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then((x) => {
                const doc = new jsPDF.default('p', 'px', 'a4');
                doc.setFontSize(10)
                doc.addFont('assets/fonts/DINNextLTArabic-Regular.ttf', 'DINNEXTLTARABIC-LIGHT', 'normal');
                doc.setFont('DINNEXTLTARABIC-LIGHT');
                doc.text('مندوب التوصيل : ' + this.selectedAgent.agentName, doc.internal.pageSize.width - 18, 70, {
                    align: 'right',
                    isOutputRtl: true
                });

                doc.text('بتاريخ : ' + moment(new Date()).locale('ar').format('dddd') + ' , ' + moment(new Date()).format('DD-MM-YYYY'), doc.internal.pageSize.width - 18, 85, {
                    align: 'right',
                });
                doc.text("طباعة المنفيست لمندوبين التوصيل", doc.internal.pageSize.width / 2, 110, {
                    align: 'center'
                });
                doc.text("رقم المنفيست " + this.cases[0].manifestNumber, doc.internal.pageSize.width / 2, 125, {
                    align: 'center'
                });

                (doc as any).autoTable(this.col, footerCases, {
                    headStyles: {font: "DINNEXTLTARABIC-LIGHT", fillColor: '#B4B3B3'},
                    bodyStyles: {font: "DINNEXTLTARABIC-LIGHT", textColor: '#000'},
                    styles: {
                        halign: 'right',
                        textColor: '#000'
                    },
                    showHead: "everyPage",

                    didDrawPage: function (data: any) {
                        //header
                        doc.addImage("assets/layout/images/logo-white.png", 10, 10, 30, 30);
                        doc.setFontSize(10);
                        doc.text(new Date().toLocaleString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            year: 'numeric'
                        }), doc.internal.pageSize.width - 120, 30);
                        // Footer
                        // @ts-ignore
                        var str = 'Page ' + doc.internal.getNumberOfPages()
                        doc.setFontSize(8)

                        // jsPDF 1.4+ uses getHeight, <1.4 uses .height
                        var pageSize = doc.internal.pageSize
                        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
                        doc.text(str, data.settings.margin.left, pageHeight - 10)
                    },
                    margin: {top: 160},
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

    removeDuplicatesAndCountEntries(array: any) {
        const agents:any = {};

        // Loop through the array and process each object
        array.forEach((obj:any) => {
            const agentId = obj.agentId;

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
                if (key !== "agentId") {
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
    }

    setData() {
        switch (this.step) {
            case 'PRINTMANIFEST':
                return this.PRINTMANIFEST();
        }
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

/* tslint:disable:max-line-length */
// angular core
import {
    Component,
    Directive,
    Type,
    ElementRef,
    TemplateRef,
    ViewChild,
    OnInit,
    OnDestroy,
    AfterViewInit,
    ViewEncapsulation,
    Inject,
    Input
} from '@angular/core';
import {Observable} from 'rxjs';

// Services
import {HELPERSService} from './HELPERS.service';

// third parties
import {SimpleGlobal} from 'ng2-simple-global';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Calendar} from '@fullcalendar/core';
import interactionPlugin, {Draggable} from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

// config
import {global_IS_LOCALDEV} from '../app-config';
import {global_TODAY_DATE} from '../app-config';
import {selector} from 'rxjs-compat/operator/publish';

declare var $: any; // Support for Jquery


@Component({

    moduleId: module.id,
    selector: 'app-jobsscheduler',
    // template: '',
    templateUrl: './jobs-scheduler-demo.component.html',
    styles: [`
        .popover {
            max-width: unset;
        }
        .jobCard_pop {
            width: 25rem;
            background: lightgray;
            font-size: 100%;
        }

        .jobCard_pop .arrow::after {
            border-top-color: lightgray;
        }
    `],
    // styleUrls: [''],
    encapsulation: ViewEncapsulation.None,
})

export class JobsSchedulerDemoComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('job_modal') public job_modal: TemplateRef<any>;

    jobForm_data_modal: any = {};
    jobCard_data_pop: any = {};
    calendar: any;


    constructor(
        public HELPERS: HELPERSService,
        public APP: SimpleGlobal,
        private modalService: NgbModal,
    ) {

        // Demo data

        const today = new Date();
        const y = today.getFullYear();
        const m = today.getMonth();
        const d = today.getDate();

        const demoDATA: any = {

            Draggable: {
                Employee: {
                    draggable_Id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                    label: 'Employee',
                    className: 'fc-event_event-azure',
                    events: [
                        {
                            id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                            title: 'Job 1 Employee',
                            allDay: false,
                            duration: '24:00',
                            duration_num: 24,
                            className: 'fc-event_event-azure',
                            editable: true,
                            extendedProps: {
                                tags: [
                                    {
                                        filter_Id: '1',
                                        label: 'Employees',
                                        value: {Id: '6', label: 'Rahim Kent'},
                                    },
                                ]
                            }
                        },
                        {
                            id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                            title: 'Job 2 Employee',
                            allDay: false,
                            duration: '02:00',
                            duration_num: 2,
                            className: 'fc-event_event-azure',
                            editable: true,
                            extendedProps: {
                                tags: [
                                    {
                                        filter_Id: '1',
                                        label: 'Employees',
                                        value: {Id: '2', label: 'Jorja Kirby'},
                                    },
                                ]
                            }
                        },
                        {
                            id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                            title: 'Job 3 Employee',
                            allDay: false,
                            duration: '04:00',
                            duration_num: 4,
                            className: 'fc-event_event-azure',
                            editable: true,
                            extendedProps: {
                                tags: [
                                    {
                                        filter_Id: '1',
                                        label: 'Employees',
                                        value: {Id: '2', label: 'Jorja Kirby'},
                                    },
                                ]
                            }
                        },
                    ]
                },
                Scheduler: {
                    draggable_Id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                    label: 'Scheduler',
                    className: 'fc-event_event-green',
                    events: [
                        {
                            id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                            title: 'Job 1 Scheduler',
                            allDay: false,
                            duration: '01:00',
                            duration_num: 1,
                            className: 'fc-event_event-green',
                            editable: true,
                            extendedProps: {
                                tags: [
                                    {
                                        filter_Id: '2',
                                        label: 'Scheduler',
                                        value: {Id: '2', label: 'Scheduler 2'},
                                    },
                                ]
                            }
                        },
                        {
                            id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                            title: 'Job 2 Scheduler',
                            allDay: false,
                            duration: '01:30',
                            duration_num: 1.5,
                            className: 'fc-event_event-green',
                            editable: true,
                            extendedProps: {
                                tags: [
                                    {
                                        filter_Id: '2',
                                        label: 'Scheduler',
                                        value: {Id: '2', label: 'Scheduler 2'},
                                    },
                                ]
                            }
                        },
                        {
                            id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                            title: 'Job 3 Scheduler',
                            allDay: false,
                            duration: '02:00',
                            duration_num: 2,
                            className: 'fc-event_event-green',
                            editable: true,
                            extendedProps: {
                                tags: [
                                    {
                                        filter_Id: '2',
                                        label: 'Scheduler',
                                        value: {Id: '3', label: 'Scheduler 3'},
                                    },
                                ]
                            }
                        },
                    ]
                },
                SubContractor: {
                    draggable_Id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                    label: 'SubContractor',
                    className: 'fc-event_event-red',
                    events: [
                        {
                            id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                            title: 'Job 1 SubContractor',
                            allDay: false,
                            duration: '24:00',
                            duration_num: 24,
                            className: 'fc-event_event-red',
                            editable: true,
                            extendedProps: {
                                tags: [
                                    {
                                        filter_Id: '3',
                                        label: 'SubContractor',
                                        value: {Id: '1', label: 'Accord Homes'},
                                    },
                                ]
                            }
                        },
                        {
                            id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                            title: 'Job 2 SubContractor',
                            allDay: false,
                            duration: '02:00',
                            duration_num: 2,
                            className: 'fc-event_event-red',
                            editable: true,
                            extendedProps: {
                                tags: [
                                    {
                                        filter_Id: '3',
                                        label: 'SubContractor',
                                        value: {Id: '2', label: 'A B Freese'},
                                    },
                                ]
                            }
                        },
                        {
                            id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                            title: 'Job 3 SubContractor',
                            allDay: false,
                            duration: '03:00',
                            duration_num: 3,
                            className: 'fc-event_event-red',
                            editable: true,
                            extendedProps: {
                                tags: [
                                    {
                                        filter_Id: '3',
                                        label: 'SubContractor',
                                        value: {Id: '3', label: 'Cameron Daff'},
                                    },
                                ]
                            }
                        },
                    ]
                },
                Jobs: {
                    draggable_Id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                    label: 'Jobs (Unscheduled)',
                    className: 'fc-event_event-yellow',
                    events: [
                        {
                            id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                            title: 'Job 1',
                            allDay: false,
                            duration: '01:30',
                            duration_num: 1.5,
                            className: 'fc-event_event-yellow',
                            editable: true,
                            extendedProps: {
                                tags: []
                            }
                        },
                        {
                            id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                            title: 'Job 2',
                            allDay: false,
                            duration: '02:00',
                            duration_num: 2,
                            className: 'fc-event_event-yellow',
                            editable: true,
                            extendedProps: {
                                tags: []
                            }
                        },
                        {
                            id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                            title: 'Job 3',
                            allDay: false,
                            duration: '01:00',
                            duration_num: 1,
                            className: 'fc-event_event-yellow',
                            editable: true,
                            extendedProps: {
                                tags: []
                            }
                        },
                    ]
                },
            },

            Dropdown_filters: [
                {
                    filter_Id: '1',
                    label: 'Employees',
                    value: [],
                    data: [
                        {Id: '1', label: 'Ellesha Alvarado', enabled: true, selected: false},
                        {Id: '2', label: 'Jorja Kirby', enabled: true, selected: false},
                        {Id: '3', label: 'Thomas Barker', enabled: true, selected: false},
                        {Id: '4', label: 'Rafe Hines', enabled: true, selected: false},
                        {Id: '5', label: 'Wren Haworth', enabled: true, selected: false},
                        {Id: '6', label: 'Rahim Kent', enabled: true, selected: false},
                    ],
                },
                {
                    filter_Id: '2',
                    label: 'Scheduler',
                    value: [],
                    data: [
                        {Id: '1', label: 'Scheduler 1', enabled: false, selected: false},
                        {Id: '2', label: 'Scheduler 2', enabled: true, selected: false},
                        {Id: '3', label: 'Scheduler 3', enabled: true, selected: false},
                    ],
                },
                {
                    filter_Id: '3',
                    label: 'SubContractor',
                    value: [],
                    data: [
                        {Id: '1', label: 'Accord Homes', enabled: true, selected: false},
                        {Id: '2', label: 'A B Freese', enabled: true, selected: false},
                        {Id: '3', label: 'Cameron Daff', enabled: true, selected: false},
                        {Id: '4', label: 'Rawcorp Pty Ltd', enabled: true, selected: false},
                        {Id: '5', label: 'Urban Building Services', enabled: true, selected: false},
                        {Id: '6', label: 'East Coast Designer Builders Pty Ltd', enabled: true, selected: false},
                        {Id: '7', label: 'Eddie Blaiklock Builder', enabled: true, selected: false},
                        {Id: '8', label: 'Nerek Construction', enabled: true, selected: false},
                        {Id: '9', label: 'Lauder Jeff', enabled: true, selected: false},
                        {Id: '10', label: 'Saurus Contracting', enabled: true, selected: false},
                        {Id: '11', label: 'Dalponte Building Services', enabled: true, selected: false},
                        {Id: '12', label: 'Dave Baldwin', enabled: true, selected: false},
                        {Id: '13', label: 'O\'Loan Build', enabled: true, selected: false},
                        {Id: '14', label: 'Ray Mahoney Builder', enabled: true, selected: false},
                        {Id: '15', label: 'Bale Constructions', enabled: true, selected: false},
                        {Id: '16', label: 'Vivid Home Builders', enabled: true, selected: false},
                        {Id: '17', label: 'Leisure Living Homes, Mackay', enabled: true, selected: false},
                        {Id: '18', label: 'Galaxi Homes', enabled: true, selected: false},
                        {Id: '19', label: 'Lamb Gary Building Contractor', enabled: true, selected: false},
                        {Id: '20', label: 'Fergus Builders', enabled: true, selected: false},
                    ],
                },
                {
                    filter_Id: '4',
                    label: 'Division',
                    value: [],
                    data: [
                        {Id: '1', label: 'Construction', enabled: true, selected: false},
                        {Id: '2', label: 'Plumbing', enabled: true, selected: false},
                        {Id: '3', label: 'Electrical', enabled: true, selected: false},
                    ],
                },
                {
                    filter_Id: '5',
                    label: 'Branch',
                    value: [],
                    data: [
                        {Id: '1', label: 'QLD', enabled: true, selected: false},
                        {Id: '2', label: 'NSW', enabled: true, selected: false},
                        {Id: '3', label: 'VIC', enabled: true, selected: false},
                        {Id: '4', label: 'WA', enabled: true, selected: false},
                        {Id: '5', label: 'NT', enabled: true, selected: false},
                    ],
                },
                {
                    filter_Id: '6',
                    label: 'Product',
                    value: [],
                    data: [
                        {Id: '1', label: 'Product 1', enabled: true, selected: false},
                        {Id: '2', label: 'Product 2', enabled: true, selected: false},
                        {Id: '3', label: 'Product 3', enabled: true, selected: false},
                        {Id: '4', label: 'Product 4', enabled: true, selected: false},
                    ],
                },
                {
                    filter_Id: '7',
                    label: 'Stage',
                    value: [],
                    data: [
                        {Id: '1', label: 'Stage 1', enabled: true, selected: false},
                        {Id: '2', label: 'Stage 2', enabled: true, selected: false},
                        {Id: '3', label: 'Stage 3', enabled: true, selected: false},
                    ],
                },
                {
                    filter_Id: '8',
                    label: 'Health',
                    value: [],
                    data: [
                        {Id: '1', label: 'Good', enabled: true, selected: false},
                        {Id: '2', label: 'Average', enabled: true, selected: false},
                        {Id: '3', label: 'Bad', enabled: true, selected: false},
                    ],
                },
            ],
            fullCalendar_events: [
                {
                    id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                    title: 'Ellesha Alvarado',
                    start: new Date(y, m, 1),
                    allDay: true,
                    className: 'fc-event_event-azure',
                    editable: true,
                    extendedProps: {
                        tags: [
                            {
                                filter_Id: '1',
                                label: 'Employees',
                                value: {Id: '1', label: 'Ellesha Alvarado'},
                            },
                        ]
                    }
                },
                {
                    id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                    title: 'Jorja Kirby',
                    start: new Date(y, m, d - 4, 6, 0),
                    allDay: false,
                    className: 'fc-event_event-azure',
                    editable: true,
                    extendedProps: {
                        tags: [
                            {
                                filter_Id: '1',
                                label: 'Employees',
                                value: {Id: '2', label: 'Jorja Kirby'},
                            },
                        ]
                    }
                },
                {
                    id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                    title: 'Thomas Barker',
                    start: new Date(y, m, d + 3, 6, 0),
                    allDay: false,
                    className: 'fc-event_event-azure',
                    editable: true,
                    extendedProps: {
                        tags: [
                            {
                                filter_Id: '1',
                                label: 'Employees',
                                value: {Id: '3', label: 'Thomas Barker'},
                            },
                        ]
                    }
                },
                {
                    id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                    title: 'Scheduler 2',
                    start: new Date(y, m, d - 1, 10, 30),
                    allDay: false,
                    className: 'fc-event_event-green',
                    editable: true,
                    extendedProps: {
                        tags: [
                            {
                                filter_Id: '2',
                                label: 'Scheduler',
                                value: {Id: '2', label: 'Scheduler 2'},
                            },
                        ]
                    }
                },
                {
                    id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                    title: 'Rawcorp Pty Ltd',
                    start: new Date(y, m, d + 7, 12, 0),
                    end: new Date(y, m, d + 7, 14, 0),
                    allDay: false,
                    className: 'fc-event_event-red',
                    editable: true,
                    extendedProps: {
                        tags: [
                            {
                                filter_Id: '3',
                                label: 'SubContractor',
                                value: {Id: '4', label: 'Rawcorp Pty Ltd'},
                            },
                        ]
                    }
                },
                {
                    id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                    title: 'Rafe Hines',
                    start: new Date(y, m, d - 2, 12, 0),
                    allDay: true,
                    className: 'fc-event_event-azure',
                    editable: true,
                    extendedProps: {
                        tags: [
                            {
                                filter_Id: '1',
                                label: 'Employees',
                                value: {Id: '4', label: 'Rafe Hines'},
                            },
                        ]
                    }
                },
                {
                    id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                    title: 'Wren Haworth',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    allDay: false,
                    className: 'fc-event_event-azure',
                    editable: true,
                    extendedProps: {
                        tags: [
                            {
                                filter_Id: '1',
                                label: 'Employees',
                                value: {Id: '5', label: 'Wren Haworth'},
                            },
                        ]
                    }
                },
                {
                    id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                    title: 'Job (Unsheduled)',
                    start: new Date(y, m, 21),
                    end: new Date(y, m, 22),
                    allDay: false,
                    className: 'fc-event_event-yellow',
                    editable: true,
                },
                {
                    id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                    title: 'Job (Unsheduled)',
                    start: new Date(y, m, 21),
                    end: new Date(y, m, 22),
                    allDay: false,
                    className: 'fc-event_event-yellow',
                    editable: true,
                }
            ]
        };

        if (global_IS_LOCALDEV) {
            // This is demo mode
            this.APP['Data'] = demoDATA;

        } else {
            // This is production mode

            this.APP['Data'] = demoDATA;
        }
    }


    object_to_JSON(item) {
        return JSON.stringify(item);
    }

    jobCard_pop_toggle(popover, item: any, draggable: any) {
        if (popover.isOpen()) {
            popover.close();
        } else {
            popover.open({popover: popover, item: item, draggable: draggable});
        }
    }

    jobCard_pop_delete(draggable: any, item: any) {
        if (draggable && item) {
            // console.log('Draggable source:', draggable);
            // console.log('Item to delete:', item);
            for (let i = 0; i < draggable.events.length; i++) {
                if (draggable.events[i].id === item.id) {
                    draggable.events.splice(i, 1);
                    break;
                }
            }
        }
    }

    jobCard_pop_edit(draggable: any, item: any) {
        if (draggable && item) {
            // console.log('Draggable source:', draggable);
            // console.log('Item to edit:', item);
            const data = {
                id: item.id,
                title: item.title,
                duration_num: item.duration_num,
                Job_Type_selected: {
                    draggable_Id: draggable.draggable_Id,
                    label: draggable.label,
                    className: draggable.className
                },
                tags: item.extendedProps.tags || [],
            };

            this.jobForm_modal('update', 'job', data)
        }
    }

    jobForm_modal(mode, type, data) {
        const that = this;
        let fullCalendar_view_type, fromDate, toDate, start_time, end_time, title = '', Job_Type_selected;

        if (type === 'scheduler' && data) {
            // Internal fullCalendar fired new event

            const start_Y = new Date(data.start).getFullYear();
            const start_M = new Date(data.start).getMonth();
            const start_D = new Date(data.start).getDate();
            const start_H = new Date(data.start).getHours();
            const start_MN = new Date(data.start).getMinutes();

            fullCalendar_view_type = data.view.type;

            if (fullCalendar_view_type === 'dayGridMonth') {
                fromDate = {year: start_Y, month: start_M + 1, day: start_D};
                toDate = fromDate;
                start_time = {hour: 8, minute: 0, second: 0};
                end_time = {hour: 9, minute: 0, second: 0};

            } else if (fullCalendar_view_type === 'timeGridWeek') {
                fromDate = {year: start_Y, month: start_M + 1, day: start_D};
                toDate = fromDate;
                start_time = {hour: start_H, minute: start_MN, second: 0};
                end_time = {hour: start_H + 1, minute: start_MN, second: 0};

            } else if (fullCalendar_view_type === 'timeGridDay') {
                fromDate = {year: start_Y, month: start_M + 1, day: start_D};
                toDate = fromDate;
                start_time = {hour: start_H, minute: start_MN, second: 0};
                end_time = {hour: start_H + 1, minute: start_MN, second: 0};
            }

        } else if (type === 'job') {
            // External UI based

            if (mode === 'update' && data) {
                // This is updating an existing Job card

                title = data.title;
                start_time = {
                    // Mapping in template is { days, hours, minutes }
                    hour: Math.floor(data.duration_num / 24), // calculate days
                    minute: Math.floor(data.duration_num % 24 ), // calculate hours
                    second: (data.duration_num - Math.floor(data.duration_num)) * 60 // calculate minutes
                };
                Job_Type_selected = data.Job_Type_selected;

            } else if (mode === 'new') {
                // This is a new Job card
                fromDate = {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()};
                toDate = fromDate;
                start_time = {
                    // Mapping in template is { days, hours, minutes }
                    hour: 0,
                    minute: 2,
                    second: 0
                };

            } else {
                // Illegal state
                return;
            }

        } else {
            // Illegal state
            return;
        }

        this.jobForm_data_modal = {
            modal_mode: mode,
            modal_type: type,
            fullCalendar_view_type: fullCalendar_view_type,
            title: title,
            fromDate: fromDate,
            fromDate_isValid: true,
            toDate: toDate,
            toDate_isValid: true,
            start_time: start_time,
            end_time: end_time,

            choices_Job_Type: [],
            Job_Type_selected: Job_Type_selected,

            choices_Tag_Type: [],
        };

        // Build list of available Job type
        // tslint:disable-next-line:forin
        for (const property in this.APP['Data'].Draggable) {
            this.jobForm_data_modal.choices_Job_Type.push({
                draggable_Id: this.APP['Data'].Draggable[property].draggable_Id,
                label: this.APP['Data'].Draggable[property].label,
                className: this.APP['Data'].Draggable[property].className,
                selected: mode === 'update' && this.APP['Data'].Draggable[property].draggable_Id === data.Job_Type_selected.draggable_Id, // pre-se;ect job-type
            });
        }
        // console.log('choices_Job_Type = ', this.jobForm_data_modal.choices_Job_Type);

        // Build list of available Tags type
        // tslint:disable-next-line:forin
        for (let i = 0; i < this.APP['Data'].Dropdown_filters.length; i++) {
            let selected = false, value = [];
            if (type === 'job' && mode === 'update') {
                for (let j = 0; j < data.tags.length; j++) {
                    if (data.tags[j].filter_Id === this.APP['Data'].Dropdown_filters[i].filter_Id) {
                        value = [{
                            Id: data.tags[j].value.Id,
                            label: data.tags[j].value.label,
                        }];
                        selected = true;
                        break;
                    }
                }
            }
            this.jobForm_data_modal.choices_Tag_Type.push({
                filter_Id: this.APP['Data'].Dropdown_filters[i].filter_Id,
                label: this.APP['Data'].Dropdown_filters[i].label,
                data: this.APP['Data'].Dropdown_filters[i].data,
                value: value,
                selected: selected,
            });
        }
        // console.log('choices_Tag_Type = ', this.jobForm_data_modal.choices_Tag_Type);

        // Open Modal
        const AddEvent_modal = this.modalService.open(this.job_modal, {
            ariaLabelledBy: 'modal-basic-title',
            centered: true,
            scrollable: true,
            size: 'lg',

        }).result.then((result) => {
            // console.log('Modal was closed by ' + result);
            console.log('job_modal_data', this.jobForm_data_modal);

            if (type === 'scheduler' && data)  {
                // Internal fullCalendar fired new event

                const start = new Date(
                    this.jobForm_data_modal.fromDate.year,
                    this.jobForm_data_modal.fromDate.month - 1,
                    this.jobForm_data_modal.fromDate.day,
                    this.jobForm_data_modal.start_time.hour,
                    this.jobForm_data_modal.start_time.minute,
                    0
                );

                const end = this.jobForm_data_modal.toDate ? new Date(
                    (this.jobForm_data_modal.toDate.year),
                    this.jobForm_data_modal.toDate.month - 1,
                    this.jobForm_data_modal.toDate.day,
                    this.jobForm_data_modal.end_time.hour,
                    this.jobForm_data_modal.end_time.minute,
                    0) : null;

                const calendar_event = {
                    id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                    title: this.jobForm_data_modal.title,
                    start: start,
                    end: end,
                    allDay: false,
                    classNames: [this.jobForm_data_modal.Job_Type_selected.className],
                    editable: true,
                    extendedProps: {
                        tags: this.my_event_selected_Tag_chips(),
                    },
                };
                console.log('fullCalendar new job: ', calendar_event);

                this.calendar.addEvent(calendar_event); // Inject event in the fullCalendar

            } else if (type === 'job') {
                // External UI based

                const duration = (this.jobForm_data_modal.start_time.hour * 24) + this.jobForm_data_modal.start_time.minute; // Duration in hours

                let job = {
                    id: '0',
                    title: this.jobForm_data_modal.title,
                    allDay: false,
                    className: this.jobForm_data_modal.Job_Type_selected.className || '',
                    editable: true,
                    duration: duration + ':' + (this.jobForm_data_modal.start_time.second ? '30' : '00'),
                    duration_num: duration,
                    extendedProps: {
                        tags: this.my_event_selected_Tag_chips(),
                    },
                };
                console.log('External new job: ', job);

                if (mode === 'update' && data) {
                    // This is updating an existing Job card

                    job.id = data.id;

                    for (const property in this.APP['Data'].Draggable) {
                        if (this.APP['Data'].Draggable[property].draggable_Id === this.jobForm_data_modal.Job_Type_selected.draggable_Id) {
                            for (let i = 0; i < this.APP['Data'].Draggable[property].events.length; i++) {
                                if (this.APP['Data'].Draggable[property].events[i].id === data.id) {
                                    this.APP['Data'].Draggable[property].events[i] = JSON.parse(JSON.stringify(job)); // update existing job
                                    break;
                                }
                            }
                        }
                    }

                } else if (mode === 'new') {
                    // This is a new Job card

                    job.id = (Math.floor(1000 + Math.random() * 1000000)).toString();

                    for (const property in this.APP['Data'].Draggable) {
                        if (this.APP['Data'].Draggable[property].draggable_Id === this.jobForm_data_modal.Job_Type_selected.draggable_Id) {
                            this.APP['Data'].Draggable[property].events.push(job); // create a new job
                            break;
                        }
                    }

                } else {
                    // Illegal state
                    return;
                }

            } else {
                // Illegal state
                return;
            }

        }, (reason) => {
            // Modal was dismissed
            if (reason === ModalDismissReasons.ESC) {
                // console.log('Dismissed by pressing ESC');
            } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
                // console.log('Dismissed by clicking on a backdrop');
            } else {
                // console.log('Dismissed with: ' + reason);
            }
        });
    }

    tags_filter_requestAutocompleteItems(items) {
        let data: any = [];
        if (Array.isArray(items)) {
            items.forEach(function (data_item, index) {
                if (data_item.enabled) {
                    data.push(data_item);
                }
            });
        }
        return data;
    }

    tags_filter_onItemAdded(item) {
        // console.log('tags_filter_onItemAdded item =', item);
        this.calendar.rerenderEvents();
    }

    tags_filter_onItemRemoved(item) {
        // console.log('tags_filter_onItemRemoved item = ', item);
        this.calendar.rerenderEvents();
    }

    new_event_dropdown_Job_Type_clicked(item) {
        // Set 'selected' flag on a single item only
        this.jobForm_data_modal.choices_Job_Type.forEach(function (data_item, index) {
            data_item.selected = false;
        });
        item.selected = true;

        this.jobForm_data_modal.Job_Type_selected = item
    }

    my_event_selected_Tag_chips() {
        let data: any = [];
        this.jobForm_data_modal.choices_Tag_Type.forEach(function (item, index) {
            if (item.selected && item.value.length) {
                data.push({
                    filter_Id: item.filter_Id,
                    label: item.label,
                    value: {Id: item.value[0].Id, label: item.value[0].label},
                });
            }
        });
        return data;
    }

    new_event_set_duration(days, hours, minutes) {
        this.jobForm_data_modal.start_time = {hour: days, minute: hours, second: minutes}; // IMPORTANT: keep mapping as it
    }

    new_event_set_range(h_start, h_end) {
        this.jobForm_data_modal.start_time = {hour: h_start, minute: 0, second: 0};
        this.jobForm_data_modal.end_time = {hour: h_end, minute: 0, second: 0};
    }

    new_event_duration_changed() {
        // console.log('new event: duration changed');
    }

    new_event_time_changed() {
        // console.log('new event: date changed');
    }

    new_event_form_inValid() {
        let disabled = false;
        const d = this.jobForm_data_modal;
        disabled = disabled || d.title.length < 2;
        disabled = disabled || (!d.Job_Type_selected || typeof d.Job_Type_selected.label === 'undefined');
        disabled = disabled || d.fromDate_isValid !== true;
        return disabled;
    }


    ngAfterViewInit() {
        const that = this;

        // Instantiate the Draggable DOM elements
        const draggable_El = <HTMLElement>document.getElementById('collapse_1');
        new Draggable(draggable_El, {
            itemSelector: '.fc-draggable',

            // Use the method below when we want to create events from Javascript instead of from the HTML'data-event' attribute from the template
            // eventData: function(eventEl) {
            //     // console.log('Draggable element data-event = ', eventEl);
            //     const data = JSON.parse(eventEl.getAttribute('data-event'));
            //     // console.log('data = ', data);
            //     return {
            //         create: data.create,
            //         title: data.title,
            //         duration: data.duration,
            //         className: data.className
            //     };
            // }
        });
        const draggable_E2 = <HTMLElement>document.getElementById('collapse_2');
        new Draggable(draggable_E2, {
            itemSelector: '.fc-draggable',
        });
        const draggable_E3 = <HTMLElement>document.getElementById('collapse_3');
        new Draggable(draggable_E3, {
            itemSelector: '.fc-draggable',
        });
        const draggable_E4 = <HTMLElement>document.getElementById('collapse_4');
        new Draggable(draggable_E4, {
            itemSelector: '.fc-draggable',
        });


        // Instantiate the FullCalenndar DOM element
        const calendarEl = <HTMLElement>document.getElementById('jobsScheduler');
        that.calendar = new Calendar(calendarEl, {
            plugins: [
                interactionPlugin,
                dayGridPlugin,
                timeGridPlugin
            ],
            themeSystem: 'bootstrap',
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            defaultDate: new Date(),
            selectable: true,
            navLinks: true, // can click day/week names to navigate views
            duration: {hour: 12},

            header: {
                left: 'title, myCustomButton',
                center: 'dayGridMonth, timeGridWeek, timeGridDay',
                right: 'prev, next, today'
            },

            droppable: true,
            drop: function (info) {
                // console.log(info);

                let event_data = {};
                if (typeof info.draggedEl.dataset === 'object' && info.draggedEl.dataset.event !== 'undefined') {
                    event_data = JSON.parse(info.draggedEl.dataset.event);
                }
                console.log('Dragged data event = ', event_data);

                info.draggedEl.parentNode.removeChild(info.draggedEl); // Remove the element from the "Draggable Events" list
            },

            viewSkeletonRender: function (info) {
                // console.log(info);

            },

            views: {
                dayGridMonth: { // name of view
                    // titleFormat: { year: '2020', month: '05', day: '03' } // year wrong format, crashes the calendar !
                    // other view-specific options here
                },
                dayGrid: {
                    // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
                },
                timeGrid: {
                    // options apply to timeGridWeek and timeGridDay views
                },
                week: {
                    // options apply to dayGridWeek and timeGridWeek views
                },
                day: {
                    // options apply to dayGridDay and timeGridDay views
                }
            },

            select: function (selectionInfo) {
                console.log('selectionInfo:', selectionInfo);

                that.jobForm_modal('new', 'scheduler', selectionInfo); // Create a new event
            },

            eventClick: function (eventClickInfo) {
                console.log('eventClickInfo:', eventClickInfo);

            },

            eventRender: function (info) {
                // console.log('eventRender', info);
                // console.log('extendedProps', info.event.extendedProps);

                if (typeof info.event.extendedProps.tags !== 'undefined' && Array.isArray(info.event.extendedProps.tags)) {
                    let tagged = false, filtered = false, match = false;

                    info.event.extendedProps.tags.forEach(function (tag, index) {
                        tagged = true; // At least one tag is set
                        const filters = that.APP['Data'].Dropdown_filters;
                        for (let f = 0; f < filters.length; f++) {
                            if (typeof filters[f].value !== 'undefined' && Array.isArray(filters[f].value) && filters[f].value.length) {
                                filtered = filtered || filters[f].filter_Id === tag.filter_Id;
                                for (let fv = 0; fv < filters[f].value.length; fv++) {
                                    if (filters[f].filter_Id === tag.filter_Id && filters[f].value[fv].Id === tag.value.Id) {
                                        match = true; // Render this event since a filter and a tag match
                                        break;
                                    }
                                }
                            }
                        }
                    });
                    return !tagged || !filtered || match; // Render this event if no filter was set

                } else {
                    // Render this event since no flags are assigned
                    return true;
                }
            },

            events: that.APP['Data'].fullCalendar_events, // Pre-loaded events
        });
        that.calendar.render();
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}




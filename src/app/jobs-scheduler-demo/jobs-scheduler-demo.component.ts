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

// Services
import { HELPERSService } from './HELPERS.service';

// third parties
import { SimpleGlobal } from 'ng2-simple-global';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

// config
import { global_IS_LOCALDEV } from '../app-config';
import { global_TODAY_DATE } from '../app-config';
import {selector} from 'rxjs-compat/operator/publish';

declare var $: any; // Support for Jquery


@Component({

    moduleId: module.id,
    selector: 'app-jobsscheduler',
    // template: '',
    templateUrl: './jobs-scheduler-demo.component.html',
    // styles: [''],
    // styleUrls: [''],
    encapsulation: ViewEncapsulation.None
})

export class JobsSchedulerDemoComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('add_event_modal') public add_event_modal: TemplateRef<any>;

    new_event_modal_data: any = {};
    calendar: any ;


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
                SubContractor: {
                    Id: '1',
                    label: 'SubContractor',
                    draggable_className: 'fc-event_event-red',
                    events: [
                        { title: 'my event 1 SubContractor', duration: '24:00', className: 'fc-event_event-red' },
                        { title: 'my event 2 SubContractor', duration: '4:00', className: 'fc-event_event-red' },
                        { title: 'my event 3 SubContractor', duration: '2:00', className: 'fc-event_event-red' },
                    ]
                },
                Scheduler: {
                    Id: '2',
                    label: 'Scheduler',
                    draggable_className: 'fc-event_event-green',
                    events: [
                        { title: 'my event 1 Scheduler', duration: '1:00', className: 'fc-event_event-green' },
                        { title: 'my event 2 Scheduler', duration: '6:00', className: 'fc-event_event-green' },
                        { title: 'my event 3 Scheduler', duration: '2:00', className: 'fc-event_event-green' },
                    ]
                },
                Employee: {
                    Id: '3',
                    label: 'Employee',
                    draggable_className: 'fc-event_event-azure',
                    events: [
                        { title: 'my event 1 Employee', duration: '5:00', className: 'fc-event_event-azure' },
                        { title: 'my event 2 Employee', duration: '4:00', className: 'fc-event_event-azure' },
                        { title: 'my event 3 Employee', duration: '2:00', className: 'fc-event_event-azure' },
                    ]
                },
                Jobs: {
                    Id: '4',
                    label: 'Jobs (Unscheduled)',
                    draggable_className: 'fc-event_event-orange',
                    events: [
                        { title: 'my event 1 Jobs', duration: '2:00', className: 'fc-event_event-orange' },
                        { title: 'my event 2 Jobs', duration: '8:00', className: 'fc-event_event-orange' },
                        { title: 'my event 3 Jobs', duration: '3:00', className: 'fc-event_event-orange' },
                    ]
                },
            },

            Dropdown_filters: [
                {
                    Id: '1',
                    label: 'Employees',
                    value: [],
                    selected: false,
                    data: [
                        { Id: '1', enabled: false, selected: false, label: 'Ellesha Alvarado' },
                        { Id: '2', enabled: true, selected: false, label: 'Jorja Kirby' },
                        { Id: '3', enabled: true, selected: false, label: 'Thomas Barker' },
                        { Id: '4', enabled: true, selected: false, label: 'Rafe Hines' },
                        { Id: '5', enabled: true, selected: false, label: 'Wren Haworth' },
                        { Id: '6', enabled: true, selected: false, label: 'Rahim Kent' },
                    ],
                },
                {
                    Id: '2',
                    label: 'Scheduler',
                    value: [],
                    selected: false,
                    data: [
                        { Id: '1', enabled: true, selected: false, label: 'Scheduler 1' },
                        { Id: '2', enabled: true, selected: false, label: 'Scheduler 2' },
                        { Id: '3', enabled: true, selected: false, label: 'Scheduler 3' },
                    ],
                },
                {
                    Id: '3',
                    label: 'Fixer',
                    value: [],
                    selected: false,
                    data: [
                        { Id: '1', enabled: true, selected: false, label: 'Fixer 1' },
                        { Id: '2', enabled: true, selected: false, label: 'Fixer 2' },
                        { Id: '3', enabled: true, selected: false, label: 'Fixer 3' },
                    ],
                },
                {
                    Id: '4',
                    label: 'Customer',
                    value: [],
                    selected: false,
                    data: [
                        { Id: '1', enabled: true, selected: false, label: 'Accord Homes' },
                        { Id: '2', enabled: true, selected: false, label: 'A B Freese' },
                        { Id: '3', enabled: true, selected: false, label: 'Cameron Daff' },
                        { Id: '4', enabled: true, selected: false, label: 'Rawcorp Pty Ltd' },
                        { Id: '5', enabled: true, selected: false, label: 'Urban Building Services' },
                        { Id: '6', enabled: true, selected: false, label: 'East Coast Designer Builders Pty Ltd' },
                        { Id: '7', enabled: true, selected: false, label: 'Eddie Blaiklock Builder' },
                        { Id: '8', enabled: true, selected: false, label: 'Nerek Construction' },
                        { Id: '9', enabled: true, selected: false, label: 'Lauder Jeff' },
                        { Id: '10', enabled: true, selected: false, label: 'Saurus Contracting' },
                        { Id: '11', enabled: true, selected: false, label: 'Dalponte Building Services' },
                        { Id: '12', enabled: true, selected: false, label: 'Dave Baldwin' },
                        { Id: '13', enabled: true, selected: false, label: 'O\'Loan Build' },
                        { Id: '14', enabled: true, selected: false, label: 'Ray Mahoney Builder' },
                        { Id: '15', enabled: true, selected: false, label: 'Bale Constructions' },
                        { Id: '16', enabled: true, selected: false, label: 'Vivid Home Builders' },
                        { Id: '17', enabled: true, selected: false, label: 'Leisure Living Homes, Mackay' },
                        { Id: '18', enabled: true, selected: false, label: 'Galaxi Homes' },
                        { Id: '19', enabled: true, selected: false, label: 'Lamb Gary Building Contractor' },
                        { Id: '20', enabled: true, selected: false, label: 'Fergus Builders' },
                    ],
                },
                {
                    Id: '5',
                    label: 'Division',
                    value: [],
                    selected: false,
                    data: [
                        { Id: '1', enabled: true, selected: false, label: 'Construction' },
                        { Id: '2', enabled: true, selected: false, label: 'Plumbing' },
                        { Id: '3', enabled: true, selected: false, label: 'Electrical' },
                    ],
                },
                {
                    Id: '6',
                    label: 'Branch',
                    value: [],
                    selected: false,
                    data: [
                        { Id: '1', enabled: true, selected: false, label: 'QLD' },
                        { Id: '2', enabled: true, selected: false, label: 'NSW' },
                        { Id: '3', enabled: true, selected: false, label: 'VIC' },
                        { Id: '4', enabled: true, selected: false, label: 'WA' },
                        { Id: '5', enabled: true, selected: false, label: 'NT' },
                    ],
                },
                {
                    Id: '7',
                    label: 'Product',
                    value: [],
                    selected: false,
                    data: [
                        { Id: '1', enabled: true, selected: false, label: 'Product 1' },
                        { Id: '2', enabled: true, selected: false, label: 'Product 2' },
                        { Id: '3', enabled: true, selected: false, label: 'Product 3' },
                        { Id: '4', enabled: true, selected: false, label: 'Product 4' },
                    ],
                },
                {
                    Id: '8',
                    label: 'Stage',
                    value: [],
                    selected: false,
                    data: [
                        { Id: '1', enabled: true, selected: false, label: 'Stage 1' },
                        { Id: '2', enabled: true, selected: false, label: 'Stage 2' },
                        { Id: '3', enabled: true, selected: false, label: 'Stage 3' },
                    ],
                },
                {
                    Id: '9',
                    label: 'Health',
                    value: [],
                    selected: false,
                    data: [
                        { Id: '1', enabled: true, selected: false, label: 'Good' },
                        { Id: '2', enabled: true, selected: false, label: 'Average' },
                        { Id: '3', enabled: true, selected: false, label: 'Bad' },
                    ],
                },
            ],
            fullCalendar_events: [
                {
                    id: '1',
                    title: 'All Day Event',
                    start: new Date(y, m, 1),
                    allDay: true,
                    className: 'fc-event_event-azure'
                },
                {
                    id: '2',
                    title: 'Repeating Event',
                    start: new Date(y, m, d - 4, 6, 0),
                    allDay: false,
                    className: 'fc-event_event-azure',
                    editable: true,
                },
                {
                    id: '3',
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 3, 6, 0),
                    allDay: false,
                    className: 'fc-event_event-azure',
                    editable: true,
                },
                {
                    id: '5',
                    title: 'Meeting',
                    start: new Date(y, m, d - 1, 10, 30),
                    allDay: false,
                    className: 'fc-event_event-green',
                    editable: true,
                },
                {
                    id: '6',
                    title: 'Lunch',
                    start: new Date(y, m, d + 7, 12, 0),
                    end: new Date(y, m, d + 7, 14, 0),
                    allDay: false,
                    className: 'fc-event_event-red',
                    editable: true,
                },
                {
                    id: '7',
                    title: 'Md-pro Launch',
                    start: new Date(y, m, d - 2, 12, 0),
                    allDay: true,
                    className: 'fc-event_event-azure',
                    editable: true,
                },
                {
                    id: '8',
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    allDay: false,
                    className: 'fc-event_event-azure',
                    editable: true,
                },
                {
                    id: '9',
                    title: 'Click for Creative Tim',
                    start: new Date(y, m, 21),
                    end: new Date(y, m, 22),
                    allDay: false,
                    className: 'fc-event_event-orange',
                    editable: true,
                },
                {
                    id: '10',
                    title: 'Click for Google',
                    start: new Date(y, m, 21),
                    end: new Date(y, m, 22),
                    allDay: false,
                    className: 'fc-event_event-orange',
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
            duration: { hour: 12 },

            header: {
                left: 'title, myCustomButton',
                center: 'dayGridMonth, timeGridWeek, timeGridDay',
                right: 'prev, next, today'
            },

            droppable: true,
            drop: function(info) {
                // console.log(info);

                let event_data = {};
                if (typeof info.draggedEl.dataset === 'object' && info.draggedEl.dataset.event !== 'undefined') {
                    event_data = JSON.parse(info.draggedEl.dataset.event);
                }
                console.log('Dragged data event = ', event_data);

                info.draggedEl.parentNode.removeChild(info.draggedEl); // Remove the element from the "Draggable Events" list
            },

            viewSkeletonRender: function(info) {
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

            select: function(selectionInfo ) {
                // console.log('selectionInfo: ', selectionInfo);

                that.new_event(selectionInfo); // Create a new event
            },

            eventClick: function( eventClickInfo ) {
                console.log('eventClickInfo: ', eventClickInfo);

            },

            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
            events: that.APP['Data'].fullCalendar_events,

        });
        that.calendar.render();

    }


    new_event(selectionInfo) {
        const that = this;
        let fullCalendar_view_type, fromDate, toDate, start_time, end_time;

        if (selectionInfo) {
            // Internal fullCalendar fired new event

            const start_Y = new Date(selectionInfo.start).getFullYear();
            const start_M = new Date(selectionInfo.start).getMonth();
            const start_D = new Date(selectionInfo.start).getDate();
            const start_H = new Date(selectionInfo.start).getHours();
            const start_MN = new Date(selectionInfo.start).getMinutes();

            fullCalendar_view_type = selectionInfo.view.type;

            if (fullCalendar_view_type === 'dayGridMonth') {
                fromDate = { year: start_Y, month: start_M + 1, day: start_D };
                toDate = fromDate;
                start_time = { hour: 8, minute: 0, second: 0 };
                end_time = { hour: 9, minute: 0, second: 0 };

            } else if (fullCalendar_view_type === 'timeGridWeek') {
                fromDate = { year: start_Y, month: start_M + 1, day: start_D };
                toDate = fromDate;
                start_time = { hour: start_H, minute: start_MN, second: 0 };
                end_time = { hour: start_H + 1, minute: start_MN, second: 0 };

            } else if (fullCalendar_view_type === 'timeGridDay') {
                fromDate = { year: start_Y, month: start_M + 1, day: start_D };
                toDate = fromDate;
                start_time = { hour: start_H, minute: start_MN, second: 0 };
                end_time = {hour: start_H + 1, minute: start_MN, second: 0 };
            }

        } else {
            // External UI based

            fullCalendar_view_type = null;
            fromDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
            toDate = fromDate;
            start_time = { hour: 0, minute: 2, second: 0 }; // Mapping in template is { days, hours, minutes }
            end_time = null;
        }

        this.new_event_modal_data = {
            modal_mode: selectionInfo ? 'scheduler' : 'job',
            modal_title: selectionInfo ? 'New schedule' : 'New Job',
            fullCalendar_view_type: fullCalendar_view_type,
            title: 'New event title',
            fromDate: fromDate,
            fromDate_isValid: true,
            toDate: toDate,
            toDate_isValid: true,
            start_time: start_time,
            end_time: end_time,

            choices_Job_Type: [],
            selected_choices_Job_Type: {
                label: null,
                className: 'fc-event_event-red'
            },

            choices_Tag_Type: [],
        };

        // Build list of available Job type
        // tslint:disable-next-line:forin
        for (const property in this.APP['Data'].Draggable) {
            this.new_event_modal_data.choices_Job_Type.push({
                Prop_Draggable: property,
                Id: this.APP['Data'].Draggable[property].Id,
                label: this.APP['Data'].Draggable[property].label,
                className: this.APP['Data'].Draggable[property].draggable_className
            });
        }
        // console.log('choices_Job_Type = ', this.new_event_modal_data.choices_Job_Type);

        // Build list of available Tags type
        // tslint:disable-next-line:forin
        for (let i = 0; i < this.APP['Data'].Dropdown_filters.length; i++) {
            this.new_event_modal_data.choices_Tag_Type.push({
                Id: this.APP['Data'].Dropdown_filters[i].Id,
                label: this.APP['Data'].Dropdown_filters[i].label,
                data: this.APP['Data'].Dropdown_filters[i].data,
                value: [],
                selected: false,
            });
        }
        // console.log('choices_Tag_Type = ', this.new_event_modal_data.choices_Tag_Type);

        // Open Modal
        const AddEvent_modal = this.modalService.open(this.add_event_modal, {
            ariaLabelledBy: 'modal-basic-title',
            centered: true,
            scrollable: true,
            size: 'lg',

        }).result.then((result) => {
            // console.log('Modal was closed by ' + result);
            console.log('new_event_modal_data', this.new_event_modal_data);

            if (selectionInfo) {
                // Internal fullCalendar fired new event

                const start = new Date(
                    this.new_event_modal_data.fromDate.year,
                    this.new_event_modal_data.fromDate.month - 1,
                    this.new_event_modal_data.fromDate.day,
                    this.new_event_modal_data.start_time.hour,
                    this.new_event_modal_data.start_time.minute,
                    0
                );

                const end = this.new_event_modal_data.toDate ? new Date(
                    (this.new_event_modal_data.toDate.year),
                    this.new_event_modal_data.toDate.month - 1,
                    this.new_event_modal_data.toDate.day,
                    this.new_event_modal_data.end_time.hour,
                    this.new_event_modal_data.end_time.minute,
                    0) : null;

                const calendar_event = {
                    id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                    title: this.new_event_modal_data.title,
                    start: start,
                    end: end,
                    allDay: false,
                    classNames: [this.new_event_modal_data.selected_choices_Job_Type.className],
                    editable: true,
                };
                console.log('fullCalendar new job: ', calendar_event);

                this.calendar.addEvent(calendar_event); // Inject event in the fullCalendar

            } else {
                // External UI based

                const duration = (this.new_event_modal_data.start_time.hour * 24) + this.new_event_modal_data.start_time.minute; // Duration in hours

                const job = {
                    id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                    title: this.new_event_modal_data.title,
                    allDay: false,
                    className: this.new_event_modal_data.selected_choices_Job_Type.className || '',
                    editable: true,
                    duration: duration + ':' + (this.new_event_modal_data.start_time.second ? '30' : '00'),
                    duration_num: duration,
                    tags: this.my_event_selected_Tag_chips(),
                };
                console.log('External new job: ', job);

                const Prop_Draggable = this.new_event_modal_data.selected_choices_Job_Type.Prop_Draggable;
                this.APP['Data'].Draggable[Prop_Draggable].events.push(job);
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

    dropdown_filter_clicked(item, option) {
        if (option.enabled) {
            // Set 'selected' flag on a single item only
            item.data.forEach(function myFunction(data_item, index) {
                data_item.selected = data_item.Id === option.Id;
            });

            item.value[0] = option;
        }
    }

    new_event_dropdown_Job_Type_clicked(item) {
        // Set 'selected' flag on a single item only
        this.new_event_modal_data.choices_Job_Type.forEach(function (data_item, index) {
            data_item.selected = data_item.Id === item.Id;
        });

        this.new_event_modal_data.selected_choices_Job_Type = item
    }

    my_event_selected_Tag_chips() {
        let data: any = [];
        this.new_event_modal_data.choices_Tag_Type.forEach(function (item, index) {
            if (item.selected && item.value.length) {
                data.push({
                    Id: item.Id,
                    label: item.label,
                    value: { Id: item.value[0].Id, label: item.value[0].label },
                });
            }
        });
        return data;
    }

    new_event_set_duration(days, hours, minutes) {
        this.new_event_modal_data.start_time = { hour: days, minute: hours, second: minutes }; // IMPORTANT: keep mapping as it
    }

    new_event_set_range(h_start, h_end) {
        this.new_event_modal_data.start_time = { hour: h_start, minute: 0, second: 0 };
        this.new_event_modal_data.end_time = { hour: h_end, minute: 0, second: 0 };
    }

    new_event_duration_changed() {
        // console.log('new event: duration changed');
    }

    new_event_time_changed() {
        // console.log('new event: date changed');
    }

    new_event_form_inValid() {
        let disabled = false;
        const d = this.new_event_modal_data;
        disabled = disabled || d.title.length < 2;
        disabled = disabled || d.selected_choices_Job_Type.label === null;
        disabled = disabled || d.fromDate_isValid !== true;
        // disabled = disabled || d.toDate_isValid !== true;
        return disabled;
    }


    ngOnInit() {

    }

    ngOnDestroy() {

    }
}




// angular core
import {
    Component,
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
        const demoDATA: any = {

            Draggable: {
                SubContractor: {
                    Id: '1',
                    label: 'SubContractor',
                    default_className: 'event-red',
                    events: [
                        { enabled: false, label: 'drag me Event 1', title: 'my event 1', duration: '24:00', className: 'event-red' },
                        { enabled: true, label: 'drag me Event 2', title: 'my event 2', duration: '24:00', className: 'event-red' },
                        { enabled: true, label: 'drag me Event 3', title: 'my event 3', duration: '24:00', className: 'event-red' },
                    ]
                },
                Scheduler: {
                    Id: '2',
                    label: 'Scheduler',
                    default_className: 'event-green',
                    events: [
                        { enabled: true, label: 'drag me Event 1', title: 'my event 1', duration: '12:00', className: 'event-green' },
                        { enabled: true, label: 'drag me Event 2', title: 'my event 2', duration: '04:00', className: 'event-green' },
                        { enabled: true, label: 'drag me Event 3', title: 'my event 3', duration: '01:00', className: 'event-green' },
                    ]
                },
                Employee: {
                    Id: '3',
                    label: 'Employee',
                    default_className: 'event-azure',
                    events: [
                        { enabled: true, label: 'drag me Event 1', title: 'my event 1', duration: '12:00', className: 'event-azure' },
                        { enabled: false, label: 'drag me Event 2', title: 'my event 2', duration: '04:00', className: 'event-azure' },
                        { enabled: true, label: 'drag me Event 3', title: 'my event 3', duration: '01:00', className: 'event-azure' },
                    ]
                },
                Jobs: {
                    Id: '4',
                    label: 'Jobs (Unscheduled)',
                    default_className: 'event-orange',
                    events: [
                        { enabled: true, label: 'drag me Event 1', title: 'my event 1', duration: '12:00', className: 'event-orange' },
                        { enabled: true, label: 'drag me Event 2', title: 'my event 2', duration: '04:00', className: 'event-orange' },
                        { enabled: false, label: 'drag me Event 3', title: 'my event 3', duration: '01:00', className: 'event-orange' },
                    ]
                },
            },

            Dropdown_filters: [
                {
                    Id: '1',
                    label: 'Employees',
                    value: null,
                    data: [
                        { disabled: true, label: 'Ellesha Alvarado' },
                        { disabled: false, label: 'Jorja Kirby' },
                        { disabled: false, label: 'Thomas Barker' },
                        { disabled: false, label: 'Rafe Hines' },
                        { disabled: false, label: 'Wren Haworth' },
                        { disabled: false, label: 'Rahim Kent' },
                    ],
                },
                {
                    Id: '2',
                    label: 'Scheduler',
                    value: null,
                    data: [
                        { disabled: false, label: 'Scheduler 1' },
                        { disabled: false, label: 'Scheduler 2' },
                        { disabled: false, label: 'Scheduler 3' },
                    ],
                },
                {
                    Id: '3',
                    label: 'Fixer',
                    value: null,
                    data: [
                        { disabled: false, label: 'Fixer 1' },
                        { disabled: false, label: 'Fixer 2' },
                        { disabled: false, label: 'Fixer 3' },
                    ],
                },
                {
                    Id: '4',
                    label: 'Customer',
                    value: null,
                    data: [
                        { disabled: false, label: 'Accord Homes' },
                        { disabled: false, label: 'A B Freese' },
                        { disabled: false, label: 'Cameron Daff' },
                        { disabled: false, label: 'Rawcorp Pty Ltd' },
                        { disabled: false, label: 'Urban Building Services' },
                        { disabled: false, label: 'East Coast Designer Builders Pty Ltd' },
                        { disabled: false, label: 'Eddie Blaiklock Builder' },
                        { disabled: false, label: 'Nerek Construction' },
                        { disabled: false, label: 'Lauder Jeff' },
                        { disabled: false, label: 'Saurus Contracting' },
                        { disabled: false, label: 'Dalponte Building Services' },
                        { disabled: false, label: 'Dave Baldwin' },
                        { disabled: false, label: 'O\'Loan Build' },
                        { disabled: false, label: 'Ray Mahoney Builder' },
                        { disabled: false, label: 'Bale Constructions' },
                        { disabled: false, label: 'Vivid Home Builders' },
                        { disabled: false, label: 'Leisure Living Homes, Mackay' },
                        { disabled: false, label: 'Galaxi Homes' },
                        { disabled: false, label: 'Lamb Gary Building Contractor' },
                        { disabled: false, label: 'Fergus Builders' },
                    ],
                },
                {
                    Id: '5',
                    label: 'Division',
                    value: null,
                    data: [
                        { disabled: false, label: 'Construction' },
                        { disabled: false, label: 'Plumbing' },
                        { disabled: false, label: 'Electrical' },
                    ],
                },
                {
                    Id: '6',
                    label: 'Branch',
                    value: null,
                    data: [
                        { disabled: false, label: 'QLD' },
                        { disabled: false, label: 'NSW' },
                        { disabled: false, label: 'VIC' },
                        { disabled: false, label: 'WA' },
                        { disabled: false, label: 'NT' },
                    ],
                },
                {
                    Id: '7',
                    label: 'Product',
                    value: null,
                    data: [
                        { disabled: false, label: 'Product 1' },
                        { disabled: false, label: 'Product 2' },
                        { disabled: false, label: 'Product 3' },
                        { disabled: false, label: 'Product 4' },
                    ],
                },
                {
                    Id: '8',
                    label: 'Stage',
                    value: null,
                    data: [
                        { disabled: false, label: 'Stage 1' },
                        { disabled: false, label: 'Stage 2' },
                        { disabled: false, label: 'Stage 3' },
                    ],
                },
                {
                    Id: '9',
                    label: 'Health',
                    value: null,
                    data: [
                        { disabled: false, label: 'Good' },
                        { disabled: false, label: 'Average' },
                        { disabled: false, label: 'Bad' },
                    ],
                },
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

    new_event(selectionInfo) {
        let type, fromDate, toDate, start_time, end_time;

        if (selectionInfo) {
            // A date context was provided

            type = selectionInfo.view.type;

            if (type === 'dayGridMonth') {
                fromDate = {
                    year: new Date(selectionInfo.start).getFullYear(),
                    month: new Date(selectionInfo.start).getMonth() + 1,
                    day: new Date(selectionInfo.start).getDate()
                };
                toDate = fromDate;
                start_time = { hour: 8, minute: 0, second: 0 };
                end_time = { hour: 9, minute: 0, second: 0 };

            } else if (type === 'timeGridWeek') {
                fromDate = {
                    year: new Date(selectionInfo.start).getFullYear(),
                    month: new Date(selectionInfo.start).getMonth() + 1,
                    day: new Date(selectionInfo.start).getDate()
                };
                toDate = fromDate;
                start_time = {
                    hour: new Date(selectionInfo.start).getHours(),
                    minute: new Date(selectionInfo.start).getMinutes(),
                    second: 0
                };
                end_time = {
                    hour: new Date(selectionInfo.start).getHours() + 1,
                    minute: new Date(selectionInfo.start).getMinutes(),
                    second: 0
                };

            } else if (type === 'timeGridDay') {
                fromDate = {
                    year: new Date(selectionInfo.start).getFullYear(),
                    month: new Date(selectionInfo.start).getMonth() + 1,
                    day: new Date(selectionInfo.start).getDate()
                };
                toDate = fromDate;
                start_time = {
                    hour: new Date(selectionInfo.start).getHours(),
                    minute: new Date(selectionInfo.start).getMinutes(),
                    second: 0
                };
                end_time = {
                    hour: new Date(selectionInfo.start).getHours() + 1,
                    minute: new Date(selectionInfo.start).getMinutes(),
                    second: 0
                };
            }

        } else {
            // No date context was provided

            type = null;
            fromDate = {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                day: new Date().getDate()
            };
            toDate = fromDate;
            start_time = { hour: 8, minute: 0, second: 0 };
            end_time = { hour: 9, minute: 0, second: 0 };
        }

        this.new_event_modal_data = {
            type: type,
            title: 'New event title',
            fromDate: fromDate,
            fromDate_isValid: true,
            toDate: toDate,
            toDate_isValid: true,
            start_time: start_time,
            end_time: end_time,
            selected_choices_types: {
                label: null,
                className: 'event-red'
            },
            choices_types: [],
        };

        // Built list of available event type
        // tslint:disable-next-line:forin
        for (const property in this.APP['Data'].Draggable) {
            this.new_event_modal_data.choices_types.push({
                label: this.APP['Data'].Draggable[property].label,
                className: this.APP['Data'].Draggable[property].default_className
            });
        }
        // console.log('choices_types = ', this.new_event_modal_data.choices_types);

        const AddEvent_modal = this.modalService.open(this.add_event_modal, {
            ariaLabelledBy: 'modal-basic-title',
            centered: true,
            scrollable: true,
            size: 'lg',

        }).result.then((result) => {
            // Modal was closed
            // console.log('Closed by ' + result);

            const end = this.new_event_modal_data.toDate ? new Date(
                (this.new_event_modal_data.toDate.year),
                this.new_event_modal_data.toDate.month -1,
                this.new_event_modal_data.toDate.day,
                this.new_event_modal_data.end_time.hour,
                this.new_event_modal_data.end_time.minute,
                0) : null;

            const calendar_event = {
                id: (Math.floor(1000 + Math.random() * 1000000)).toString(),
                title: this.new_event_modal_data.title,
                start: new Date(
                    this.new_event_modal_data.fromDate.year,
                    this.new_event_modal_data.fromDate.month -1,
                    this.new_event_modal_data.fromDate.day,
                    this.new_event_modal_data.start_time.hour,
                    this.new_event_modal_data.start_time.minute,
                    0
                ),
                end: end,
                allDay: false,
                classNames: [this.new_event_modal_data.selected_choices_types.className],
                editable: true,
            };
            // console.log('Calendar new event: ', calendar_event);

            this.calendar.addEvent(calendar_event);

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

    new_event_set_all_day() {
        // console.log('new event: set all day');
        this.new_event_modal_data.start_time = { hour: 8, minute: 0, second: 0 };
        this.new_event_modal_data.end_time = { hour: 18, minute: 0, second: 0 };
    }

    new_event_time_changed() {
        // console.log('new event: date changed');

    }

    new_event_form_inValid() {

        let disabled = false;
        const d = this.new_event_modal_data;
        disabled = disabled || d.title.length < 2;
        disabled = disabled || d.selected_choices_types.label === null;
        disabled = disabled || d.fromDate_isValid !== true;
        // disabled = disabled || d.toDate_isValid !== true;

        return disabled;
    }

    object_to_JSON(item) {
        return JSON.stringify(item);
    }


    ngOnInit() {

        const that = this;

    }

    ngAfterViewInit() {

        const that = this;

        const today = new Date();
        const y = today.getFullYear();
        const m = today.getMonth();
        const d = today.getDate();


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
            plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin ],
            themeSystem: 'bootstrap',
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            defaultDate: today,
            selectable: true,
            navLinks: true, // can click day/week names to navigate views

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

                if (info.view.type !== 'dayGridMonth') {

                }
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

            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
            events: [
                {
                    id: '1',
                    title: 'All Day Event',
                    start: new Date(y, m, 1),
                    allDay: true,
                    className: 'event-azure'
                },
                {
                    id: '2',
                    title: 'Repeating Event',
                    start: new Date(y, m, d - 4, 6, 0),
                    allDay: false,
                    className: 'event-azure',
                    editable: true,
                },
                {
                    id: '3',
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 3, 6, 0),
                    allDay: false,
                    className: 'event-azure',
                    editable: true,
                },
                {
                    id: '5',
                    title: 'Meeting',
                    start: new Date(y, m, d - 1, 10, 30),
                    allDay: false,
                    className: 'event-green',
                    editable: true,
                },
                {
                    id: '6',
                    title: 'Lunch',
                    start: new Date(y, m, d + 7, 12, 0),
                    end: new Date(y, m, d + 7, 14, 0),
                    allDay: false,
                    className: 'event-red',
                    editable: true,
                },
                {
                    id: '7',
                    title: 'Md-pro Launch',
                    start: new Date(y, m, d - 2, 12, 0),
                    allDay: true,
                    className: 'event-azure',
                    editable: true,
                },
                {
                    id: '8',
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    allDay: false,
                    className: 'event-azure',
                    editable: true,
                },
                {
                    id: '9',
                    title: 'Click for Creative Tim',
                    start: new Date(y, m, 21),
                    end: new Date(y, m, 22),
                    allDay: false,
                    className: 'event-orange',
                    editable: true,
                },
                {
                    id: '10',
                    title: 'Click for Google',
                    start: new Date(y, m, 21),
                    end: new Date(y, m, 22),
                    allDay: false,
                    className: 'event-orange',
                    editable: true,
                }
            ]
        });
        that.calendar.render();

    }

    ngOnDestroy() {

    }
}




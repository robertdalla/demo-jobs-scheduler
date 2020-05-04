// angular core
import { Component, Type, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation, Inject, Input } from '@angular/core';

// third parties
import { SimpleGlobal } from 'ng2-simple-global';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { AddEventModalComponent } from './add-event.component';

import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

// config
import { global_IS_LOCALDEV } from '../app-config';
import { global_TODAY_DATE } from '../app-config';

declare var $: any; // Support for Jquery


const MODALS: {[name: string]: Type<any>} = {
    AddEventModal: AddEventModalComponent,
};


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

    constructor(

        public APP: SimpleGlobal,
        private modalService: NgbModal,

    ) {

        // Demo data
        const demoDATA: any = {

            Draggable: {
                SubContractor: {
                    Id: '1',
                    label: 'SubContractor',
                    events: [
                        { label: 'drag me Event 1', create: true, title: 'my event 1', duration: '24:00', className: 'event-red' },
                        { label: 'drag me Event 2', create: true, title: 'my event 2', duration: '24:00', className: 'event-red' },
                        { label: 'drag me Event 3', create: true, title: 'my event 3', duration: '24:00', className: 'event-red' },
                    ]
                },
                Scheduler: {
                    Id: '2',
                    label: 'Scheduler',
                    events: [
                        { label: 'drag me Event 1', create: true, title: 'my event 1', duration: '12:00', className: 'event-green' },
                        { label: 'drag me Event 2', create: true, title: 'my event 2', duration: '04:00', className: 'event-green' },
                        { label: 'drag me Event 3', create: true, title: 'my event 3', duration: '01:00', className: 'event-green' },
                    ]
                },
                Employee: {
                    Id: '3',
                    label: 'Employee',
                    events: [
                        { label: 'drag me Event 1', create: true, title: 'my event 1', duration: '12:00', className: 'event-azure' },
                        { label: 'drag me Event 2', create: true, title: 'my event 2', duration: '04:00', className: 'event-azure' },
                        { label: 'drag me Event 3', create: true, title: 'my event 3', duration: '01:00', className: 'event-azure' },
                    ]
                },
                Jobs: {
                    Id: '4',
                    label: 'Jobs (Unscheduled)',
                    events: [
                        { label: 'drag me Event 1', create: true, title: 'my event 1', duration: '12:00', className: 'event-orange' },
                        { label: 'drag me Event 2', create: true, title: 'my event 2', duration: '04:00', className: 'event-orange' },
                        { label: 'drag me Event 3', create: true, title: 'my event 3', duration: '01:00', className: 'event-orange' },
                    ]
                },
            },

            Dropdown_filters: {
                Employees: {
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
                Scheduler: {
                    Id: '2',
                    label: 'Scheduler',
                    value: null,
                    data: [
                        { disabled: false, label: 'Scheduler 1' },
                        { disabled: false, label: 'Scheduler 2' },
                        { disabled: false, label: 'Scheduler 3' },
                    ],
                },
                Fixer: {
                    Id: '3',
                    label: 'Fixer',
                    value: null,
                    data: [
                        { disabled: false, label: 'Fixer 1' },
                        { disabled: false, label: 'Fixer 2' },
                        { disabled: false, label: 'Fixer 3' },
                    ],
                },
                Customer: {
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
                Division: {
                    Id: '5',
                    label: 'Division',
                    value: null,
                    data: [
                        { disabled: false, label: 'Construction' },
                        { disabled: false, label: 'Plumbing' },
                        { disabled: false, label: 'Electrical' },
                    ],
                },
                Branch: {
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
                Product: {
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
                Stage: {
                    Id: '8',
                    label: 'Stage',
                    value: null,
                    data: [
                        { disabled: false, label: 'Stage 1' },
                        { disabled: false, label: 'Stage 2' },
                        { disabled: false, label: 'Stage 3' },
                    ],
                },
                Health: {
                    Id: '9',
                    label: 'Health',
                    value: null,
                    data: [
                        { disabled: false, label: 'Good' },
                        { disabled: false, label: 'Average' },
                        { disabled: false, label: 'Bad' },
                    ],
                },
            }
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

        // const $calendar = $('#jobs_Scheduler');

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
        const calendar = new Calendar(calendarEl, {
            plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin ],
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            defaultDate: today,
            selectable: true,
            navLinks: true, // can click day/week names to navigate views

            droppable: true,
            drop: function(info) {
                // console.log(info);
            },

            viewSkeletonRender: function(info) {
                // console.log(info);

                // if (info.view.type !== 'dayGridMonth') {
                // }
            },

            header: {
                left: 'title',
                center: 'dayGridMonth, timeGridWeek, timeGridDay',
                right: 'prev, next, today'
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
                that.modalService.open(MODALS.AddEventModal, {
                    ariaLabelledBy: 'modal-basic-title',
                    centered: true
                }).result.then((result) => {
                    // Modal was closed
                    console.log('Closed by ' + result);

                }, (reason) => {
                    // Modal was dismissed
                    if (reason === ModalDismissReasons.ESC) {
                        console.log('Dismissed by pressing ESC');
                    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
                        console.log('Dismissed by clicking on a backdrop');
                    } else {
                        console.log('Dismissed with: ' + reason);
                    }
                });

            },

            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
            events: [
                {
                    title: 'All Day Event',
                    start: new Date(y, m, 1),
                    className: 'event-azure'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d - 4, 6, 0),
                    allDay: false,
                    className: 'event-azure'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 3, 6, 0),
                    allDay: false,
                    className: 'event-azure'
                },
                {
                    title: 'Meeting',
                    start: new Date(y, m, d - 1, 10, 30),
                    allDay: false,
                    className: 'event-green'
                },
                {
                    title: 'Lunch',
                    start: new Date(y, m, d + 7, 12, 0),
                    end: new Date(y, m, d + 7, 14, 0),
                    allDay: false,
                    className: 'event-red'
                },
                {
                    title: 'Md-pro Launch',
                    start: new Date(y, m, d - 2, 12, 0),
                    allDay: true,
                    className: 'event-azure'
                },
                {
                    title: 'Birthday Party',
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    allDay: false,
                    className: 'event-azure'
                },
                {
                    title: 'Click for Creative Tim',
                    start: new Date(y, m, 21),
                    end: new Date(y, m, 22),
                    className: 'event-orange'
                },
                {
                    title: 'Click for Google',
                    start: new Date(y, m, 21),
                    end: new Date(y, m, 22),
                    className: 'event-orange'
                }
            ]
        });
        calendar.render();

    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}




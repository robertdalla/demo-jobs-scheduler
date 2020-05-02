// angular core
import { Component, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation, Inject, Input } from '@angular/core';

// third parties
import { SimpleGlobal } from 'ng2-simple-global';
import Swal from 'sweetalert2'
import PerfectScrollbar from 'perfect-scrollbar';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

// config
import { global_IS_LOCALDEV } from '../app-config';
import { global_TODAY_DATE } from '../app-config';

declare var $: any;

@Component({

    moduleId: module.id,
    selector: 'app-jobsscheduler',
    // template: '',
    templateUrl: 'jobs-scheduler-demo.component.html',
    // styles: [''],
    // styleUrls: [''],
    encapsulation: ViewEncapsulation.None
})

export class JobsSchedulerDemoComponent implements OnInit, OnDestroy, AfterViewInit {

    constructor(

        public APP: SimpleGlobal,

    ) {

        // Demo data  Draggable.SubContractor.Id  Draggable.Scheduler.Id  Draggable.Employee.Id  Draggable.Jobs.Id
        const demoDATA: any = {

            Draggable: {
                SubContractor: {
                    Id: '1',
                    label: 'SubContractor',
                    events: [
                        { label: 'drag me Event 1', create: true, title: 'my event 1', duration: '12:00' },
                        { label: 'drag me Event 2', create: true, title: 'my event 2', duration: '04:00' },
                        { label: 'drag me Event 3', create: true, title: 'my event 3', duration: '01:00' },
                    ]
                },
                Scheduler: {
                    Id: '2',
                    label: 'Scheduler',
                    events: [
                        { label: 'drag me Event 1', create: true, title: 'my event 1', duration: '12:00' },
                        { label: 'drag me Event 2', create: true, title: 'my event 2', duration: '04:00' },
                        { label: 'drag me Event 3', create: true, title: 'my event 3', duration: '01:00' },
                    ]
                },
                Employee: {
                    Id: '3',
                    label: 'Employee',
                    events: [
                        { label: 'drag me Event 1', create: true, title: 'my event 1', duration: '12:00' },
                        { label: 'drag me Event 2', create: true, title: 'my event 2', duration: '04:00' },
                        { label: 'drag me Event 3', create: true, title: 'my event 3', duration: '01:00' },
                    ]
                },
                Jobs: {
                    Id: '4',
                    label: 'Jobs (Unscheduled)',
                    events: [
                        { label: 'drag me Event 1', create: true, title: 'my event 1', duration: '12:00' },
                        { label: 'drag me Event 2', create: true, title: 'my event 2', duration: '04:00' },
                        { label: 'drag me Event 3', create: true, title: 'my event 3', duration: '01:00' },
                    ]
                },
            },

            Dropdown_filters: {
                Employees: {
                    Id: '1',
                    label: 'Employees',
                    data: [
                        { label: 'Ellesha Alvarado' },
                        { label: 'Jorja Kirby' },
                        { label: 'Thomas Barker' },
                        { label: 'Rafe Hines' },
                        { label: 'Wren Haworth' },
                        { label: 'Rahim Kent' },
                    ],
                },
                Scheduler: {
                    Id: '2',
                    label: 'Scheduler',
                    data: [
                        { label: 'Scheduler 1' },
                        { label: 'Scheduler 2' },
                        { label: 'Scheduler 3' },
                    ],
                },
                Fixer: {
                    Id: '3',
                    label: 'Fixer',
                    data: [
                        { label: 'Fixer 1' },
                        { label: 'Fixer 2' },
                        { label: 'Fixer 3' },
                    ],
                },
                Customer: {
                    Id: '4',
                    label: 'Customer',
                    data: [
                        { label: 'Accord Homes' },
                        { label: 'A B Freese' },
                        { label: 'Cameron Daff' },
                        { label: 'Rawcorp Pty Ltd' },
                        { label: 'Urban Building Services' },
                        { label: 'East Coast Designer Builders Pty Ltd' },
                        { label: 'Eddie Blaiklock Builder' },
                        { label: 'Nerek Construction' },
                        { label: 'Lauder Jeff' },
                        { label: 'Saurus Contracting' },
                        { label: 'Dalponte Building Services' },
                        { label: 'Dave Baldwin' },
                        { label: 'O\'Loan Build' },
                        { label: 'Ray Mahoney Builder' },
                        { label: 'Bale Constructions' },
                        { label: 'Vivid Home Builders' },
                        { label: 'Leisure Living Homes, Mackay' },
                        { label: 'Galaxi Homes' },
                        { label: 'Lamb Gary Building Contractor' },
                        { label: 'Fergus Builders' },
                    ],
                },
                Division: {
                    Id: '5',
                    label: 'Division',
                    data: [
                        { label: 'Construction' },
                        { label: 'Plumbing' },
                        { label: 'Electrical' },
                    ],
                },
                Branch: {
                    Id: '6',
                    label: 'Branch',
                    data: [
                        { label: 'QLD' },
                        { label: 'NSW' },
                        { label: 'VIC' },
                        { label: 'WA' },
                        { label: 'NT' },
                    ],
                },
                Product: {
                    Id: '7',
                    label: 'Product',
                    data: [
                        { label: 'Product 1' },
                        { label: 'Product 2' },
                        { label: 'Product 3' },
                        { label: 'Product 4' },
                    ],
                },
                Stage: {
                    Id: '8',
                    label: 'Stage',
                    data: [
                        { label: 'Stage 1' },
                        { label: 'Stage 2' },
                        { label: 'Stage 3' },
                    ],
                },
                Health: {
                    Id: '9',
                    label: 'Health',
                    data: [
                        { label: 'Good' },
                        { label: 'Average' },
                        { label: 'Bad' },
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
        const draggable_El = document.getElementById('collapse_1');
        new Draggable(draggable_El, {
            itemSelector: '.fc-draggable',
            // eventData: function(eventEl) {
            //     // console.log('Draggable element data-event = ', eventEl);
            //     const data = JSON.parse(eventEl.getAttribute('data-event'));
            //     // console.log('data = ', data);
            //     return {
            //         create: data.create,
            //         title: data.title,
            //         duration: data.duration,
            //     };
            // }
        });
        const draggable_E2 = document.getElementById('collapse_2');
        new Draggable(draggable_E2, {
            itemSelector: '.fc-draggable',
        });
        const draggable_E3 = document.getElementById('collapse_3');
        new Draggable(draggable_E3, {
            itemSelector: '.fc-draggable',
        });
        const draggable_E4 = document.getElementById('collapse_4');
        new Draggable(draggable_E4, {
            itemSelector: '.fc-draggable',
        });

        // Instantiate the FullCalenndar DOM element
        const calendarEl = document.getElementById('jobsScheduler');
        const calendar = new Calendar(calendarEl, {
            plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin ],
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            defaultDate: today,
            selectable: true,
            navLinks: true, // can click day/week names to navigate views
            // selectHelper: true,

            droppable: true,
            drop: function(info) {
            },

/*            viewRender: function(view: any, element: any) {
                // We make sure that we activate the perfect scrollbar when the view isn't on Month
                if (view.name !== 'month') {
                    const elem = $(element).find('.fc-scroller')[0];
                    let ps = new PerfectScrollbar(elem);
                }
            },*/

            header: {
                left: 'title',
                center: 'dayGridMonth, timeGridWeek, timeGridDay',
                right: 'prev, next, today'
            },

/*                views: {
                month: { // name of view
                    titleFormat: 'MMMM YYYY'
                    // other view-specific options here
                },
                week: {
                    titleFormat: ' MMMM D YYYY'
                },
                day: {
                    titleFormat: 'D MMM, YYYY'
                }
            },*/

/*            select: function(start: any, end: any) {

                // on select we show the Sweet Alert modal with an input
                Swal.fire({
                    title: 'Create an Event',
                    html: '<div class="form-group">' +
                        '<input class="form-control" placeholder="Event Title" id="input-field">' +
                        '</div>',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function(result: any) {

                    let eventData;
                    const event_title = $('#input-field').val();

                    if (event_title) {
                        eventData = {
                            title: event_title,
                            start: start,
                            end: end
                        };
                        // $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
                        calendar('renderEvent', eventData, true); // stick? = true
                    }

                    // $calendar.fullCalendar('unselect');
                    calendar('unselect');

                });
            },*/

            // color classes: [ event-blue | event-azure | event-green | event-orange | event-red ]
            events: [
                {
                    title: 'All Day Event',
                    start: new Date(y, m, 1),
                    className: 'event-default'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d - 4, 6, 0),
                    allDay: false,
                    className: 'event-rose'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: new Date(y, m, d + 3, 6, 0),
                    allDay: false,
                    className: 'event-rose'
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


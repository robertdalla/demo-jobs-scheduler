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

        // Demo data
        const demoDATA: any = {
            Draggable: {
                SubContractor: [
                    { label: 'drag me Event 1', create: true, title: 'my event 1', duration: '12:00' },
                    { label: 'drag me Event 2', create: true, title: 'my event 2', duration: '04:00' },
                    { label: 'drag me Event 3', create: true, title: 'my event 3', duration: '01:00' },
                ],
                Scheduler: [
                    { label: 'drag me Event 1', create: true, title: 'my event 1', duration: '12:00' },
                    { label: 'drag me Event 2', create: true, title: 'my event 2', duration: '04:00' },
                    { label: 'drag me Event 3', create: true, title: 'my event 3', duration: '01:00' },
                ],
                Employee: [
                    { label: 'drag me Event 1', create: true, title: 'my event 1', duration: '12:00' },
                    { label: 'drag me Event 2', create: true, title: 'my event 2', duration: '04:00' },
                    { label: 'drag me Event 3', create: true, title: 'my event 3', duration: '01:00' },
                ],
                Jobs: [
                    { label: 'drag me Event 1', create: true, title: 'my event 1', duration: '12:00' },
                    { label: 'drag me Event 2', create: true, title: 'my event 2', duration: '04:00' },
                    { label: 'drag me Event 3', create: true, title: 'my event 3', duration: '01:00' },
                ],
            },
            Employees: [
                { Name: 'Ellesha Alvarado'},
                { Name: 'Jorja Kirby'},
                { Name: 'Thomas Barker'},
                { Name: 'Rafe Hines'},
                { Name: 'Wren Haworth'},
                { Name: 'Rahim Kent'},
            ],
            Scheduler: [
                { Name: 'Scheduler 1'},
                { Name: 'Scheduler 2'},
                { Name: 'Scheduler 3'},
            ],
            Fixer: [
                { Name: 'Fixer 1'},
                { Name: 'Fixer 2'},
                { Name: 'Fixer 3'},
            ],
            Customer: [
                { Name: 'Accord Homes'},
                { Name: 'A B Freese'},
                { Name: 'Cameron Daff'},
                { Name: 'Rawcorp Pty Ltd'},
                { Name: 'Urban Building Services'},
                { Name: 'East Coast Designer Builders Pty Ltd'},
                { Name: 'Eddie Blaiklock Builder'},
                { Name: 'Nerek Construction'},
                { Name: 'Lauder Jeff'},
                { Name: 'Saurus Contracting'},
                { Name: 'Dalponte Building Services'},
                { Name: 'Dave Baldwin'},
                { Name: 'O\'Loan Build'},
                { Name: 'Ray Mahoney Builder'},
                { Name: 'Bale Constructions'},
                { Name: 'Vivid Home Builders'},
                { Name: 'Leisure Living Homes, Mackay'},
                { Name: 'Galaxi Homes'},
                { Name: 'Lamb Gary Building Contractor'},
                { Name: 'Fergus Builders'},
            ],
            Division: [
                { Name: 'Construction'},
                { Name: 'Plumbing'},
                { Name: 'Electrical'},
            ],
            Branch: [
                { Name: 'QLD'},
                { Name: 'NSW'},
                { Name: 'VIC'},
                { Name: 'WA'},
                { Name: 'NT'},
            ],
            Product: [
                { Name: 'Product 1'},
                { Name: 'Product 2'},
                { Name: 'Product 3'},
                { Name: 'Product 4'},
            ],
            Stage: [
                { Name: 'Stage 1'},
                { Name: 'Stage 2'},
                { Name: 'Stage 3'},
            ],
            Health: [
                { Name: 'Good'},
                { Name: 'Average'},
                { Name: 'Bad'},
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

        // const $calendar = $('#jobs_Scheduler');

        const today = new Date();
        const y = today.getFullYear();
        const m = today.getMonth();
        const d = today.getDate();

        const draggableEl = document.getElementById('collapse1');
        const draggableE2 = document.getElementById('collapse2');
        const draggableE3 = document.getElementById('collapse3');
        const draggableE4 = document.getElementById('collapse4');
        new Draggable(draggableEl, {
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
        new Draggable(draggableE2, {
            itemSelector: '.fc-draggable',
        });
        new Draggable(draggableE3, {
            itemSelector: '.fc-draggable',
        });
        new Draggable(draggableE4, {
            itemSelector: '.fc-draggable',
        });

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
                    url: 'https://www.creative-tim.com/',
                    className: 'event-orange'
                },
                {
                    title: 'Click for Google',
                    start: new Date(y, m, 21),
                    end: new Date(y, m, 22),
                    url: 'https://www.creative-tim.com/',
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


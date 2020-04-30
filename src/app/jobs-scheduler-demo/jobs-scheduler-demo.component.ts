// angular core
import { Component, OnInit } from '@angular/core';

// third parties
import { SimpleGlobal } from 'ng2-simple-global';
import Swal from 'sweetalert2'
import PerfectScrollbar from 'perfect-scrollbar';

// config
import { global_IS_LOCALDEV } from '../app-config';
import { global_TODAY_DATE } from '../app-config';

declare var $: any;

@Component({

    moduleId: module.id,
    selector: 'app-jobsscheduler',
    templateUrl: 'jobs-scheduler-demo.component.html'
})

export class JobsSchedulerDemoComponent implements OnInit {

    constructor(

        public APP: SimpleGlobal,

    ) {

        // Demo data
        const demoDATA: any = {
            Employees: [
                {
                    Id: 1,
                    Name: 'Ellesha Alvarado',
                },
                {
                    Id: 2,
                    Name: 'Jorja Kirby',
                },
                {
                    Id: 3,
                    Name: 'Thomas Barker',
                },
                {
                    Id: 4,
                    Name: 'Rafe Hines',
                },
                {
                    Id: 5,
                    Name: 'Wren Haworth',
                },
                {
                    Id: 6,
                    Name: 'Rahim Kent',
                },
            ],
            Scheduler: [
                {
                    Id: 1,
                    Name: 'Scheduler 1',
                },
                {
                    Id: 2,
                    Name: 'Scheduler 2',
                },
                {
                    Id: 3,
                    Name: 'Scheduler 3',
                },
            ],
            Fixer: [
                {
                    Id: 1,
                    Name: 'Fixer 1',
                },
                {
                    Id: 2,
                    Name: 'Fixer 2',
                },
                {
                    Id: 3,
                    Name: 'Fixer 3',
                },
            ],
            Customer: [
                {
                    Id: 1,
                    Name: 'Accord Homes',
                },
                {
                    Id: 2,
                    Name: 'A B Freese',
                },
                {
                    Id: 3,
                    Name: 'Cameron Daff',
                },
                {
                    Id: 4,
                    Name: 'Rawcorp Pty Ltd',
                },
                {
                    Id: 5,
                    Name: 'Urban Building Services',
                },
                {
                    Id: 6,
                    Name: 'East Coast Designer Builders Pty Ltd',
                },
                {
                    Id: 7,
                    Name: 'Eddie Blaiklock Builder',
                },
                {
                    Id: 8,
                    Name: 'Nerek Construction',
                },
                {
                    Id: 9,
                    Name: 'Lauder Jeff',
                },
                {
                    Id: 10,
                    Name: 'Saurus Contracting',
                },
                {
                    Id: 11,
                    Name: 'Dalponte Building Services',
                },
                {
                    Id: 12,
                    Name: 'Dave Baldwin',
                },
                {
                    Id: 13,
                    Name: 'O\'Loan Build',
                },
                {
                    Id: 14,
                    Name: 'Ray Mahoney Builder',
                },
                {
                    Id: 15,
                    Name: 'Bale Constructions',
                },
                {
                    Id: 16,
                    Name: 'Vivid Home Builders',
                },
                {
                    Id: 17,
                    Name: 'Leisure Living Homes, Mackay',
                },
                {
                    Id: 18,
                    Name: 'Galaxi Homes',
                },
                {
                    Id: 19,
                    Name: 'Lamb Gary Building Contractor',
                },
                {
                    Id: 20,
                    Name: 'Fergus Builders',
                },
            ],
            Division: [
                {
                    Id: 1,
                    Name: 'Construction',
                },
                {
                    Id: 2,
                    Name: 'Plumbing',
                },
                {
                    Id: 3,
                    Name: 'Electrical',
                },
            ],
            Branch: [
                {
                    Id: 1,
                    Name: 'QLD',
                },
                {
                    Id: 2,
                    Name: 'NSW',
                },
                {
                    Id: 3,
                    Name: 'VIC',
                },
                {
                    Id: 3,
                    Name: 'WA',
                },
                {
                    Id: 3,
                    Name: 'NT',
                },
            ],
            Product: [
                {
                    Id: 1,
                    Name: 'Product 1',
                },
                {
                    Id: 2,
                    Name: 'Product 2',
                },
                {
                    Id: 3,
                    Name: 'Product 3',
                },
                {
                    Id: 4,
                    Name: 'Product 4',
                },
            ],
            Stage: [
                {
                    Id: 1,
                    Name: 'Stage 1',
                },
                {
                    Id: 2,
                    Name: 'Stage 2',
                },
                {
                    Id: 3,
                    Name: 'Stage 3',
                },
            ],
            Health: [
                {
                    Id: 1,
                    Name: 'Good',
                },
                {
                    Id: 2,
                    Name: 'Average',
                },
                {
                    Id: 3,
                    Name: 'Bad',
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



    ngOnInit() {

        const $calendar = $('#jobs-Scheduler');

        const today = new Date();
        const y = today.getFullYear();
        const m = today.getMonth();
        const d = today.getDate();

        $calendar.fullCalendar({
            viewRender: function(view: any, element: any) {
                // We make sure that we activate the perfect scrollbar when the view isn't on Month
                if (view.name != 'month') {
                    var elem = $(element).find('.fc-scroller')[0];
                    let ps = new PerfectScrollbar(elem);
                }
            },
            header: {
                left: 'title',
                center: 'month, agendaWeek, agendaDay',
                right: 'prev, next, today'
            },
            defaultDate: today,
            selectable: true,
            selectHelper: true,
            views: {
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
            },

            select: function(start: any, end: any) {

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
                        $calendar.fullCalendar('renderEvent', eventData, true); // stick? = true
                    }

                    $calendar.fullCalendar('unselect');

                });
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events


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
    }
}


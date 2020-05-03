// angular core
import { Component, Type, ElementRef, ViewChild, OnInit, OnDestroy, AfterViewInit, ViewEncapsulation, Inject, Input } from '@angular/core';

// third parties
import { SimpleGlobal } from 'ng2-simple-global';
import Swal from 'sweetalert2'
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import PerfectScrollbar from 'perfect-scrollbar';
import { Calendar } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

// config
import { global_IS_LOCALDEV } from '../app-config';
import { global_TODAY_DATE } from '../app-config';

declare var $: any; // Support for Jquery


@Component({
    selector: 'app-ngbd-modal-confirm',
    template: `
        <div class="modal-header">
            <h4 class="modal-title" id="modal-title">Profile deletion</h4>
        </div>
        <div class="modal-body">
            <p><strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong></p>
            <p>All information associated to this user profile will be permanently deleted.
                <span class="text-danger">This operation can not be undone.</span>
            </p>
            <div>{{this.APP['Data'].Draggable.SubContractor.label}}</div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
            <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
        </div>
  `,
})
export class AddEventModalComponent {
    constructor(
        public modal: NgbActiveModal,
        public APP: SimpleGlobal,
    ) {}
}

const MODALS: {[name: string]: Type<any>} = {
    AddEventModal: AddEventModalComponent,
};


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

            viewSkeletonRender: function(info) {
                // console.log(info);
                // We make sure that we activate the perfect scrollbar when the view isn't on Month
                if (info.view.type !== 'dayGridMonth') {
                    console.log('perfect scrollbar activated');
                    const elem = $(info.el).find('.fc-scroller')[0];
                    let ps = new PerfectScrollbar(elem);
                }

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

                // on select we show the Sweet Alert modal with an input
                Swal.fire({
                    title: 'Create an Event',
                    html: '<div class="form-group">{{this.APP[\'Data\'].Draggable.SubContractor.label}}' +
                        '<input class="form-control" placeholder="Event Title" id="create_event_input">' +
                        '</div>',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    cancelButtonClass: 'btn btn-danger',
                    buttonsStyling: false
                }).then(function(result: any) {

                    const event_title = $('#create_event_input').val();
                    if (event_title) {
                        calendar.addEvent({
                            title: event_title,
                            start: selectionInfo.start,
                            end: selectionInfo.end
                        });
                    }
                });

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




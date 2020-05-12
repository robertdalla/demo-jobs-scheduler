// angular core
import {
    Component,
    ElementRef,
    ViewEncapsulation,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy, ViewChild, TemplateRef
} from '@angular/core';

// third parties
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'datepicker-range-popup',
    // template: '',
    templateUrl: './datepicker-rangePopup.component.html',
    styles: [`
        .form-group.hidden {
            width: 0;
            margin: 0;
            border: none;
            padding: 0;
        }

        .custom-day {
            text-align: center;
            padding: 0.185rem 0.25rem;
            display: inline-block;
            height: 2rem;
            width: 2rem;
        }

        .custom-day.focused {
            background-color: #e6e6e6;
        }

        .custom-day.range, .custom-day:hover {
            background-color: rgb(2, 117, 216);
            color: white;
        }

        .custom-day.faded {
            background-color: rgba(2, 117, 216, 0.5);
        }
    `],
    // styleUrls: [''],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DatepickerRangePopupComponent {

    @ViewChild('dpFromDate') public dpFromDate: ElementRef;
    @ViewChild('dpToDate') public dpToDate: ElementRef;

    @Input() fromDate: NgbDate | null;
    @Output() fromDateChange = new EventEmitter();
    @Input() fromDate_isValid: boolean;
    @Output() fromDate_isValidChange = new EventEmitter();

    @Input() toDate: NgbDate | null;
    @Output() toDateChange = new EventEmitter();
    @Input() toDate_isValid: boolean;
    @Output() toDate_isValidChange = new EventEmitter();

    @Input() labelEnabled: boolean;
    @Input() placement: string;

    hoveredDate: NgbDate | null = null;


    constructor(
        private calendar: NgbCalendar,
        public formatter: NgbDateParserFormatter
    ) {
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }


    onDateSelection(date: NgbDate) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
            this.toDate = date;
        } else {
            this.toDate = null;
            this.fromDate = date;
        }

        this.dpFromDate.nativeElement.value = this.formatter.format(this.fromDate); // update the template input element value
        this.fromDateChange.emit(this.fromDate);
        this.fromDate_isValidChange.emit(this.fromDate !== null);

        this.dpToDate.nativeElement.value = this.formatter.format(this.toDate); // update the template input element value
        this.toDateChange.emit(this.toDate);
        this.toDate_isValidChange.emit(this.toDate !== null);
    }

    isHovered(date: NgbDate) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
    }

    isInside(date: NgbDate) {
        return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
    }

    isRange(date: NgbDate) {
        return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
    }

    validateFromDateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
        const parsed = this.formatter.parse(input);
        const isValid = parsed && this.calendar.isValid(NgbDate.from(parsed));
        let new_value = currentValue;
        if (isValid) new_value = NgbDate.from(parsed);
        this.fromDateChange.emit(new_value);
        this.fromDate_isValidChange.emit(isValid);
        return new_value;
    }

    validateToDateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
        const parsed = this.formatter.parse(input);
        const isValid = parsed && this.calendar.isValid(NgbDate.from(parsed));
        let new_value = currentValue;
        if (isValid) new_value = NgbDate.from(parsed);
        this.toDateChange.emit(new_value);
        this.toDate_isValidChange.emit(isValid);
        return new_value;
    }
}

import {Component} from '@angular/core';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'app-sweetalert-cmp',
    templateUrl: 'sweetalert.component.html'
})

export class SweetAlertComponent {

    showSwal(type) {
        if (type === 'basic') {
            Swal.fire({
                title: 'Here\'s a message!',
                buttonsStyling: false,
            })

        } else if (type === 'title-and-text') {
            Swal.fire({
                title: 'Here\'s a message!',
                text: 'It\'s pretty, isn\'t it?',
                customClass: {
                    confirmButton: 'btn btn-info'
                },
                buttonsStyling: false,
            })

        } else if (type === 'success-message') {
            Swal.fire({
                title: 'Good job!',
                text: 'You clicked the button!',
                icon: 'success',
                customClass: {
                    confirmButton: 'btn btn-success',
                },
                buttonsStyling: false,
            })

        } else if (type === 'warning-message-and-confirmation') {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                customClass: {
                    confirmButton: 'btn btn-danger',
                    cancelButton: 'btn btn-success',
                },
                confirmButtonText: 'Yes, delete it!',
                buttonsStyling: false,

            }).then((result) => {
                if (result.value) {
                    Swal.fire(
                        {
                            title: 'Deleted!',
                            text: 'Your file has been deleted.',
                            icon: 'success',
                            customClass: {
                                confirmButton: 'btn btn-success',
                            },
                            buttonsStyling: false,
                        }
                    )
                }
            })

        } else if (type === 'warning-message-and-cancel') {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this imaginary file!',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it',
                customClass: {
                    confirmButton: 'btn btn-danger',
                    cancelButton: 'btn btn-success',
                },
                buttonsStyling: false,

            }).then((result) => {
                if (result.value) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your imaginary file has been deleted.',
                        icon: 'success',
                        customClass: {
                            confirmButton: 'btn btn-success',
                        },
                        buttonsStyling: false,
                    })

                } else {
                    Swal.fire({
                        title: 'Cancelled',
                        text: 'Your imaginary file is safe :)',
                        icon: 'info',
                        customClass: {
                            confirmButton: 'btn btn-info',
                        },
                        buttonsStyling: false,
                    })
                }
            })

        } else if (type === 'custom-html') {
            Swal.fire({
                title: 'HTML example',
                customClass: {
                    confirmButton: 'btn btn-success',
                },
                html: 'You can use <b>bold text</b>, ' +
                    '<a href="https://github.com">links</a> ' +
                    'and other HTML tags'
                ,
                buttonsStyling: false,
            })

        } else if (type === 'auto-close') {
            Swal.fire({
                title: 'Auto close alert!',
                text: 'I will close in 2 seconds.',
                timer: 2000,
                icon: 'warning',
                showConfirmButton: false,
            })

        } else if (type === 'input-field') {
            Swal.fire({
                title: 'Input something',
                html: '<div class="form-group">' +
                    '<input id="input-field" type="text" class="form-control" />' +
                    '</div>',
                showCancelButton: true,
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger',
                },
                buttonsStyling: false,

            }).then(function (result) {
                Swal.fire({
                    html: 'You entered: <strong>' +
                        $('#input-field').val() +
                        '</strong>',
                    icon: 'success',
                    customClass: {
                        confirmButton: 'btn btn-success',
                    },
                    buttonsStyling: false,
                })
            })
        }
    }
}

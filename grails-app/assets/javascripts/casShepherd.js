/**
 *  * http://github.hubspot.com/shepherd/docs/welcome/
 * This file will be  used for all shepherd related js
 */
var tour;

function professorHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: ['Grade Data Entry displays all of the Assessment Forms for <br /> which you may enter grade data.'],
        attachTo: '.pView bottom',
        classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }, {
                text: 'Next',
                action: tour.next,
                classes: 'shepherd-button-example-primary'
            }
        ]
    });

    tour.addStep('step2', {
        text: 'Select an assessment item from the table <br /> and click the input button (keyboard icon)',
        attachTo: 'tr right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function gradeEntryHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: ['Grade Entry allows you to submit your grade data for this assessment form.'],
        attachTo: '.card-header bottom',
        classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }, {
                text: 'Next',
                action: tour.next,
                classes: 'shepherd-button-example-primary'
            }
        ]
    });

    tour.addStep('step2', {
        text: 'This is the Course name and Section title for which you need to input data.',
        attachTo: 'h3 bottom',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step3', {
        text: 'This is the Grading item for which you need to input data.',
        attachTo: 'h4 bottom',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step4', {
        text: 'Grade threshold is the maximum number of points <br /> for the grades you are entering.',
        attachTo: '.input-group-addon bottom',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step5', {
        text: 'You can enter multiple grades by pasting your grades here<br /> and clicking the Parse button. This button creates individual grades<br /> so you can examine them before finally submitting them.',
        attachTo: '.multipleGradesHelp bottom',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step6', {
        text: 'You can add or remove individual grades by clicking the "+" or "-" icons.',
        attachTo: '.individualGradesHelp bottom',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step7', {
        text: 'Once you are satisfied with the grades you can submit them here.',
        attachTo: '.saveGrades bottom',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function analysisHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: ['Here you can see Analysis of grade data which was stored for Assessment Forms.'],
        attachTo: '.analysis bottom',
        classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }, {
                text: 'Next',
                action: tour.next,
                classes: 'shepherd-button-example-primary'
            }
        ]
    });

    tour.addStep('step2', {
        text: 'Here you can see previously used Analsis\' and<br /> dnowload them by clicking the download button.',
        attachTo: 'tr right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step3', {
        text: 'This button lets you create a new Analysis for an Assessment Form.',
        attachTo: '.newAnalysisButton right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function facultyHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: ['Here you can manage Faculty accounts.'],
        attachTo: '#faculty-help bottom',
        classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }, {
                text: 'Next',
                action: tour.next,
                classes: 'shepherd-button-example-primary'
            }
        ]
    });

    tour.addStep('step2', {
        text: 'The table shows all existing Faculty accounts and they can be<br /> edited, enabled or disabled. Disabled accounts don\'t have access to CAS.',
        attachTo: 'tr right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function sectionHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: ['Here you can manage Course Sections.'],
        attachTo: '#section-help bottom',
        classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }, {
                text: 'Next',
                action: tour.next,
                classes: 'shepherd-button-example-primary'
            }
        ]
    });

    tour.addStep('step2', {
        text: 'The table shows all existing Sections and they can be edited, enabled <br />or disabled. Disabled sections can\'t have get an Assessment Form assigned to them.',
        attachTo: 'tr right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function courseHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: ['Here you can manage Course Sections.'],
        attachTo: '#courses-help bottom',
        classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }, {
                text: 'Next',
                action: tour.next,
                classes: 'shepherd-button-example-primary'
            }
        ]
    });

    tour.addStep('step2', {
        text: 'The table shows all existing Courses and they can be edited, enabled or disabled.<br /> Disabled courses can\'t have an Assessment Form published for them.',
        attachTo: 'tr right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function departmentHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: ['Here you can manage Departments.'],
        attachTo: '#department-help bottom',
        classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }, {
                text: 'Next',
                action: tour.next,
                classes: 'shepherd-button-example-primary'
            }
        ]
    });

    tour.addStep('step2', {
        text: 'The table shows all existing Departments<br /> and they can be edited, enabled or disabled.<br /> Disabled departments can\'t have an <br />Assessment Form published for them.',
        attachTo: 'tr right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function formsHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: ['This page lets you manage or create Assessment Forms used to collect grade data.'],
        attachTo: '.forms bottom',
        classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }, {
                text: 'Next',
                action: tour.next,
                classes: 'shepherd-button-example-primary'
            }
        ]
    });

    tour.addStep('step2', {
        text: 'Here you can see the list <br />of created Assessment Forms.',
        attachTo: 'tr right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step3', {
        text: 'This button lets you create a new Assessment Form.',
        attachTo: '.newFormButton right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step4', {
        text: 'You can publish, unpublish, edit, <br />copy or delete Assessment Forms.<br /> Here you can also download all <br />grade data that was entered for <br />an Assessment Form',
        attachTo: 'tr right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function formsCreationHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: ['Select the month in which this Assessment Form will be automatically republished.'],
        attachTo: '#automationDate bottom',
        classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }, {
                text: 'Next',
                action: tour.next,
                classes: 'shepherd-button-example-primary'
            }
        ]
    });

    tour.addStep('step2', {
        text: 'The title is used to distinguish different Assessment Forms.',
        attachTo: '.titleInput bottom',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step3', {
        text: 'The question of the Assessment Form is the grading item for which <br /> the grades are collected by this form.',
        attachTo: '.questionInput bottom',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step4', {
        text: 'This description is not visible to faculty members  <br /> who are entering grade data.',
        attachTo: '.descriptionTextArea right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function facultyCreationHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: 'The username is used to log into CAS and it has to be unique.',
        attachTo: '.usernameInput right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step2', {
        text: 'The email is used to notify this user about Assessment Forms and his <br />password and it has to be unique.',
        attachTo: '.emailInput right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step3', {
        text: 'Roles control this user\'s privileges when using CAS',
        attachTo: '#option_box right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step4', {
        text: 'Admin role can manage Departments, Courses, Sections, and Faculty.',
        attachTo: '#option_box right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step5', {
        text: 'Course Coordinator role can manage Assessment Forms, Analysis, and enter Grade Data.',
        attachTo: '#option_box right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step6', {
        text: 'Professor role can only add Grade Data.',
        attachTo: '#option_box right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step7', {
        text: 'Clicking this button will create the Faculty account and send<br /> them their connection information via email.',
        attachTo: '.saveNewFaculty right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function sectionCreationHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: 'The title is used to distinguish this section and it has to be<br /> unique.',
        attachTo: '.sectionTitleInput right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step2', {
        text: 'The Section must have a Faculty account connected to it as a professor.',
        attachTo: '#option_box right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step3', {
        text: 'A Section has to belong to a course.',
        attachTo: '#option_boxBelongsTo right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function courseCreationHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: 'The name is used to distinguish this course and it has to be unique.',
        attachTo: '.courseNameInput right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step2', {
        text: 'The Course must have a Faculty account connected<br /> to it as a Course Coordinator.',
        attachTo: '#option_box right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step3', {
        text: 'A Course has to belong to a department.',
        attachTo: '#option_boxBelongsTo right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function departmentCreationHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: 'The name is used to distinguish this department and it has to be unique.',
        attachTo: '.departmentNameInput right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step2', {
        text: 'The Department must have a Faculty account connected to it as a<br /> Department Coordinator.',
        attachTo: '#option_box right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function analysisCreationHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: ['The title is used to distinguish different Analysis.'],
        attachTo: '.titleInput bottom',
        classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }, {
                text: 'Next',
                action: tour.next,
                classes: 'shepherd-button-example-primary'
            }
        ]
    });

    tour.addStep('step2', {
        text: 'Target benchmark is the grade that has to <br />be scored in order for the course to <br />be considered successful.',
        attachTo: '.benchmarkInput right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step3', {
        text: 'Select the Assessment Form that you wish to analyse and click Load Stored<br /> Grades to load grades connected to it.',
        attachTo: '#formSelect right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step4', {
        text: 'Select the grades you wish to analyse from the table below and click the<br /> Save button to create analysis.',
        attachTo: '#formSelect bottom',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function editFormHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: ['Select the month in which this Assessment Form will be automatically republished.'],
        attachTo: '#automationDate bottom',
        classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }, {
                text: 'Next',
                action: tour.next,
                classes: 'shepherd-button-example-primary'
            }
        ]
    });

    tour.addStep('step2', {
        text: 'The title is used to distinguish different Assessment Forms.',
        attachTo: '.titleInput right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step3', {
        text: 'The question of the Assessment Form is the grading item for which the grades<br /> are collected by this form.',
        attachTo: '.questionInput right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step4', {
        text: 'This description is not visible to faculty members who are entering grade data.',
        attachTo: '.descriptionTextArea right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function editFacultyHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: 'The username is used to log into CAS and it has to be unique.',
        attachTo: '.usernameInput right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step2', {
        text: 'The email is used to notify this user about Assessment Forms and his password<br /> and it has to be unique.',
        attachTo: '.emailInput right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step3', {
        text: 'Roles control this user\'s privileges when using CAS',
        attachTo: '#option_box right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step4', {
        text: 'Admin role can manage Departments, Courses, Sections, and Faculty.',
        attachTo: '#option_box right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step5', {
        text: 'Course Coordinator role can manage Assessment Forms, Analysis, and enter Grade Data.',
        attachTo: '#option_box right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step6', {
        text: 'Professor role can only add Grade Data.',
        attachTo: '#option_box right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step7', {
        text: 'Clicking this button will create the Faculty account and send them their <br />connection information via email.',
        attachTo: '.saveEditFaculty right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function editSectionHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: 'The title is used to distinguish this section and it has to be unique.',
        attachTo: '.sectionTitleInput right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step2', {
        text: 'The Section must have a Faculty account connected to it as a professor.',
        attachTo: '#option_box right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step3', {
        text: 'A Section has to belong to a course.',
        attachTo: '#option_boxBelongsTo right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function editCourseHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: 'The name is used to distinguish this course and it has to be unique.',
        attachTo: '.courseNameInput right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step2', {
        text: 'The Course must have a Faculty account connected to it as a Course Coordinator.',
        attachTo: '#option_box right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step3', {
        text: 'A Course has to belong to a department.',
        attachTo: '#option_boxBelongsTo right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function editDepartmentHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: 'The name is used to distinguish <br/>this department and it has to be unique.',
        attachTo: '.departmentNameInput right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

    tour.addStep('step2', {
        text: 'The Department must have a Faculty account connected to it as a Department Coordinator.',
        attachTo: '#option_box right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function passwdHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: false
        }
    });

    tour.addStep('welcome', {
        text: 'Here you can change your password.',
        attachTo: '#passwd-help bottom',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
            }
        ]
    });

    tour.start();
}

function endTours(){
    if(tour){
        tour.complete()
    }
}
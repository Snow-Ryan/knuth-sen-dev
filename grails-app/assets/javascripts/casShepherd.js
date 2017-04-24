/**
 * Created by Ryan on 4/22/2017.
 * http://github.hubspot.com/shepherd/docs/welcome/
 * This file will be  used for all shepherd related js
 */
var tour;

function professorHelp(){

    tour = new Shepherd.Tour({
        defaults: {
            classes: 'shepherd-theme-arrows',
            scrollTo: true
        }
    });

    tour.addStep('welcome', {
        text: ['Welcome to the Course Assessment System, this will show you how to interact with the interface!'],
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
        text: 'Select a assessment item from the table below',
        attachTo: 'tr right',
        classes: 'example-step-extra-class',
        buttons: [
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });
    tour.start();

}


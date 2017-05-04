package cas

import grails.transaction.Transactional

/**
 * Job that runs every 24 hours to check if any forms need to be republished
 */
@Transactional
class AutoPublishingJob {
    static triggers = {
        simple repeatInterval: 86400000 // execute job once in 24 hours
    }

    def execute() {
        // execute job

        MainController.findFormsToRepublish()
    }
}

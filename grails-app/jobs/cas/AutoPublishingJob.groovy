package cas

import grails.transaction.Transactional

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

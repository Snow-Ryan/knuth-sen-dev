package cas

class CompletedForm {
    int completedFormId
    String content
    int formId
    long completionDate

    static constraints = {
        completedFormId nullable: false
        content nullable: true
        formId nullable: true
        completionDate nullable: true
    }
}

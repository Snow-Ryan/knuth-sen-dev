package cas

class CompletedForm {

    String content
    Long completionDate
    Form form

    static belongsTo = [Form]

    static mapping = {
        version false
    }

    static constraints = {
        content nullable: true
        completionDate nullable: true
    }
}

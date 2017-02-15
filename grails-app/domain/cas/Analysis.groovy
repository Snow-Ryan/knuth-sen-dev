package cas

class Analysis {

    Long creationDate
    String name
    String feedback
    Form form
    Faculty faculty

    static hasMany = [secondaryAnalysises: SecondaryAnalysis]
    static belongsTo = [Faculty, Form]

    static mapping = {
        version false
    }

    static constraints = {
        creationDate nullable: true
        name nullable: true, maxSize: 45
        feedback nullable: true, maxSize: 45
    }
}


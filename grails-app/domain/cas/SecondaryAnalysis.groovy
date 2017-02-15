package cas

class SecondaryAnalysis {

    String name
    String feedback
    Faculty faculty
    Analysis analysis

    static belongsTo = [Analysis, Faculty]

    static mapping = {
        version false
    }

    static constraints = {
        name nullable: true, maxSize: 45
        feedback nullable: true
    }
}


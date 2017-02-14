package cas

class Analysis {
    int analysisId
    long creationDate
    int formId
    int facultyId
    String name
    String feedback

    static constraints = {
        analysisId nullable: false
        creationDate nullable: true
        formId nullable: true
        facultyId nullable: true
        name nullable: true
        feedback nullable: true
    }
}

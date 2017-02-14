package cas

class SecondaryAnalysis {
    int secondaryAnalysisId
    int analysisId
    String name
    String feedback
    int facultyId

    static constraints = {
        secondaryAnalysisId nullable: false
        analysisId nullable: true
        name nullable: true
        feedback nullable: true
        facultyId nullable: true
    }
}

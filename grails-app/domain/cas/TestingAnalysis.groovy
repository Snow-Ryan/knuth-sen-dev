package cas

class TestingAnalysis {
    String name
    TestingFaculty madeBy
    TestingComment comment
    String gradeItem
    static hasMany = [grades: TestingGradeStore]
    String createdOn
    Integer benchmark
    TestingForm forForm

    static constraints = {
        name nullable: true
        grades nullable: true
        comment nullable: true
        madeBy nullable: true
        gradeItem nullable: true
        createdOn nullable: true
        benchmark nullable: true
        forForm nullable: true
    }
}

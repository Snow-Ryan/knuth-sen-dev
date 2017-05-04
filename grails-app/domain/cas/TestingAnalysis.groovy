package cas

/**
 * GORM class for interacting with the TestingAnalysis table
 */
class TestingAnalysis {
    Integer id
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

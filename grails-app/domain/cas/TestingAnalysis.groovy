package cas

class TestingAnalysis {
    String name
    TestingFaculty madeBy
    TestingComment comment
    Integer summary
    String gradeItem
    static hasMany = [grades: TestingGradeStore]
    String createdOn

    static constraints = {
        name nullable: true
        grades nullable: true
        comment nullable: true
        madeBy nullable: true
        summary nullable: true
        gradeItem nullable: true
        createdOn nullable: true
    }
}

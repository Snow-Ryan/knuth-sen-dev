package cas

class TestingGradeStore {
    Integer id
    String grades
    TestingForm forForm
    TestingFaculty storedBy
    String storeDate
    Integer gradeRange
    TestingSection forSection
    static constraints = {
        grades nullable: true
        gradeRange nullable: true
        forForm nullable: true
        forSection nullable: true
        storedBy nullable: true
        storeDate nullable: true, maxSize: 100
    }
}

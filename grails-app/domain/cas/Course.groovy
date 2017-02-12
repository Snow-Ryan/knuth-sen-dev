package cas

class Course {
    int courseId
    String name
    int departmentId
    int sectionId

    static constraints = {
        courseId nullable: false
        name nullable: true
        departmentId nullable: true
        sectionId nullable: true
    }
}

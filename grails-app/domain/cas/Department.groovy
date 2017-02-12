package cas

class Department {
    int departmentId
    String name
    int coordinatorId
    int courseId

    static constraints = {
        departmentId nullable: false
        name nullable: true
        coordinatorId nullable: true
        courseId nullable: true
    }
}

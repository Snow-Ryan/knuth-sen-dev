package cas

class Section {

    String title
    Integer courseId
    Integer facultyId

    static hasMany = [courses: Course,
                      faculties: Faculty,
                      forms: Form]

    static mapping = {
        version false
    }

    static constraints = {
        title nullable: true, maxSize: 45
        courseId nullable: true
        facultyId nullable: true
    }
}

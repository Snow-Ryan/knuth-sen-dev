package cas

class Department {

    String name
    Course course
    Faculty faculty

    static belongsTo = [Course, Faculty]

    static mapping = {
        version false
    }

    static constraints = {
        name nullable: true, maxSize: 45
    }
}

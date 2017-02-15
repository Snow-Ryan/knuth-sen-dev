package cas

class Course {

    String name
    Integer departmentId
    Section section

    static hasMany = [departments: Department]
    static belongsTo = [Section]

    static mapping = {
        version false
    }

    static constraints = {
        name nullable: true, maxSize: 45
        departmentId nullable: true
    }
}


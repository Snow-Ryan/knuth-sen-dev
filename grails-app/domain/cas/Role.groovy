package cas

class Role {

    String role

    static hasMany = [faculties: Faculty]

    static mapping = {
        version false
    }

    static constraints = {
        role nullable: true
    }
}

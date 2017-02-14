package cas

class TestingRole {

    String role

    static hasMany = [testingUsers: TestingUser]

    static mapping = {
        version false
        version defaultValue:0
    }

    static constraints = {
        role nullable: false
    }
}

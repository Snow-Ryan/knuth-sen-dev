package cas

class TestingRole {
    Integer id
    String role

    static constraints = {
        role nullable: false
    }
}

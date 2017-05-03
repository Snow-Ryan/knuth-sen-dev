package cas

/**
 * GORM class for interacting with the TestingRole table
 */
class TestingRole {
    Integer id
    String role

    static constraints = {
        role nullable: false
    }
}

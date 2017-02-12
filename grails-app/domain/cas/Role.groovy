package cas

class Role {
    int roleId
    String role

    static constraints = {
        roleId nullable: false
        role nullable: true
    }
}

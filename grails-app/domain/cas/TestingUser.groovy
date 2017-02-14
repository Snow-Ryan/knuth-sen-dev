package cas

class TestingUser {
    String fname
    String lname
    String mname
    String username
    String password
    TestingRole role
//    int version

    static belongsTo = [TestingRole]

    static mapping = {
        version false
        version defaultValue:0
    }

    static constraints = {
        fname nullable: true, maxSize: 45
        lname nullable: true, maxSize: 45
        mname nullable: true, maxSize: 45
        username nullable: false
//        version defaultValue:0
        password nullable: false
    }
}

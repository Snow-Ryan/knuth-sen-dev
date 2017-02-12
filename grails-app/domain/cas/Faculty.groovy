package cas

class Faculty {
    int facultyId
    String fName
    String lName
    String mName
    String username
    int sectionId
    int roleId
    String facultyCol

    static constraints = {
        facultyId nullable: false
        fName nullable: true
        lName nullable: true
        mName nullable: true
        username nullable: true
        sectionId nullable: true
        roleId nullable: true
        facultyCol nullable: true
    }
}

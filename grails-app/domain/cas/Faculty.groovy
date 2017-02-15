package cas

class Faculty {

    String fname
    String lname
    String mname
    String username
    String facultycol
    Role role
    Section section

    static hasMany = [analysises: Analysis,
                      departments: Department,
                      secondaryAnalysises: SecondaryAnalysis]
    static belongsTo = [Role, Section]

    static mapping = {
        version false
    }

    static constraints = {
        fname nullable: true, maxSize: 45
        lname nullable: true, maxSize: 45
        mname nullable: true, maxSize: 45
        username nullable: true
        facultycol nullable: true, maxSize: 45
    }
}

package cas

class Section {
    int sectionId
    String title
    int courseId
    int facultyId

    static constraints = {
        sectionId nullable: false
        title nullable: true
        courseId nullable: true
        facultyId nullable: true
    }
}

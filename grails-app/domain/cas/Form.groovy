package cas

class Form {
    int formId
    String title
    String content
    int published
    long publishDate
    long creationDate
    int sectionId

    static constraints = {
        formId nullable: false
        title nullable: true
        content nullable: true
        published nullable: true
        publishDate nullable: true
        creationDate nullable: true
        sectionId nullable: true
    }
}

package cas

class TestingForm {
    Integer id
    String title
    String content
    Integer published
    String publishDate
    String creationDate


    static constraints = {
        publishDate nullable: true, maxSize: 100
        creationDate nullable: true, maxSize: 100
        title nullable: true
        content nullable: true
        published nullable: true
    }
}

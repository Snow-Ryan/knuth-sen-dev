package cas

class Faculty {
    String username
    String name
    String tagline
    String imagePath
    String title
    String interestArea
    String office
    String website
    String phone
    String email
    String twitter
    String facebook

    static constraints = {
        username nullable: false
        name nullable: true
        tagline nullable: true
        imagePath nullable: true
        title nullable: true
        interestArea nullable: true
        office nullable: true
        website nullable: true
        phone nullable: true
        email nullable: true
        twitter nullable: true
        facebook nullable: true
    }
}

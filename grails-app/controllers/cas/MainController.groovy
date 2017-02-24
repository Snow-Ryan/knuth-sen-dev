package cas

import grails.converters.JSON

class MainController {
    Md5passService md5passService
    TokenProviderService tokenProviderService

    def index() {
    }

    def loadForms(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else{
            expandExpiration(request.getHeader('Authorization'))
            def forms = TestingForm.findAll()
            render (template: "formsPage", model: [forms: forms])
        }
    };

    def loadPeopleForms(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else{
            expandExpiration(request.getHeader('Authorization'))
            def forms = TestingFaculty.findAll();
            render (template: "formsPage", model: [forms: forms])
        }
    };

    def loadFormCreation(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            render(template: "formCreation")
        }
    }

    def saveNewForm(String title, String question, String description, String creationDate){
        JSON resultJson
        TestingForm testingForm;
        testingForm = TestingForm.findByTitle(title);

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (!testingForm) {
                testingForm = new TestingForm(title: title, question: question, description: description, creationDate: creationDate, published: 0);
                if (testingForm.save(flush: true)) {
                    resultJson = [status: 0, message: "Success"] as JSON
                } else {
                    resultJson = [status: 1, message: "Error"] as JSON
                }
            } else {
                resultJson = [status: 2, message: "Error"] as JSON
            }
        }
        render(resultJson)

    }

    def loadFormEdit(int id){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            render(template: 'formEdit', model: [form: TestingForm.findById(id)]);
        }
    }
    def loadExpiredSession(){
        render template: "expiredSession"
    }

    def saveEditForm(String title, String question, String description, int id){
        JSON resultJson
        TestingForm testingForm;
        testingForm = TestingForm.findByTitle(title);

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (testingForm) {
                if (testingForm.id == id) {
                    testingForm.question = question;
                    testingForm.description = description;

                    if (testingForm.save(flush: true)) {
                        resultJson = [status: 0, message: "Success"] as JSON
                    } else {
                        resultJson = [status: 1, message: "Error"] as JSON
                    }
                } else {
                    resultJson = [status: 2, message: "Error"] as JSON
                }
            } else {
                testingForm = TestingForm.findById(id);

                testingForm.title = title;
                testingForm.question = question;
                testingForm.description = description;
                if (testingForm.save(flush: true)) {
                    resultJson = [status: 0, message: "Success"] as JSON
                } else {
                    resultJson = [status: 1, message: "Error"] as JSON
                }
            }
        }
        render(resultJson)
    }

    def deleteForm(int id){
        TestingForm testingForm = TestingForm.findById(id);

        JSON resultJson

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (testingForm.delete(flush: true)) {
                resultJson = [status: 0, message: "Success"] as JSON
            } else {
                resultJson = [status: 1, message: "Error"] as JSON
            }
        }

        render resultJson
    }

    def loadingScreen(){
        render template: "loadingScreen"
    }

    def loadLogIn(){

        TestingFaculty testingUser

        testingUser = TestingFaculty.findByUsername("admin@admin.com")

        if(!testingUser){
            TestingRole testingRole = new TestingRole(role: "Wizard");
            testingRole.save(flush: true)

            testingUser = new TestingFaculty(fname: "Admin", lname: "Admin", username: "admin@admin.com", password: md5passService.getEncryptedPass("testing"), role: TestingRole.findById(1).id)

            testingUser.save(flush: true)
        }
        render template: 'loginPage'
    }

    def login(String username, String password){

        TestingFaculty testingFaculty = TestingFaculty.findByUsernameAndPassword(username, md5passService.getEncryptedPass(password))

        if(testingFaculty){
            String token = tokenProviderService.getToken()
            testingFaculty.token = token
            testingFaculty.expiration = System.currentTimeMillis() + 600000 //current time + 10 minutes

            testingFaculty.save(flush: true)

            render([role:(testingFaculty.role).role, token:token] as JSON)
        }
        else{
            render("fail")
        }
    }

    def getRole(){

        JSON resultJson

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status:0, message:"Expired"] as JSON
        }
        else{
            TestingFaculty testingFaculty = TestingFaculty.findByToken(request.getHeader('Authorization'))

            expandExpiration(request.getHeader('Authorization'))

            resultJson = [status:1, message:"Valid", role: (testingFaculty.role).role] as JSON
        }

        render resultJson
    }

    private expandExpiration(String token){
        TestingFaculty testingFaculty = TestingFaculty.findByToken(token)

        testingFaculty.expiration = System.currentTimeMillis() + 600000 //current time + 10 minutes

        testingFaculty.save(flush: true)
    }

    private checkExpiration(String token){
        TestingFaculty testingFaculty = TestingFaculty.findByToken(token)

        if(!testingFaculty){
            return true
        }

        if(testingFaculty.expiration < System.currentTimeMillis()){
            return true
        }
        else {
            return false
        }
    }

    private notifyUser(String username){
        sendMail {
            to username
            subject "CAS SENTIENCE"
            body 'SOON '
        }
    }
}

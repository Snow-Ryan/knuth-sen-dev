package cas

import grails.converters.JSON

class MainController {
    Md5passService md5passService
    TokenProviderService tokenProviderService
    PasswordRandomizerService passwordRandomizerService

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

    def loadFaculty(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else{
            expandExpiration(request.getHeader('Authorization'))
            def faculty = TestingFaculty.findAll()
            render (template: "adminFaculty", model: [faculty: faculty])
        }
    };

    def loadSections(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else{
            expandExpiration(request.getHeader('Authorization'))
            render (template: "adminSections", model: [sections: TestingSection.findAll()])
        }
    };

    def loadFacultyCreation(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            render(template: "adminCreateFaculty", model: [roles: TestingRole.findAll()])
        }
    }

    def loadSectionCreation(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            render(template: "adminCreateSection", model: [faculty: TestingFaculty.findAll()])
        }
    }

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

    def saveNewSection(String title, String faculty){
        JSON resultJson
        TestingSection testingSection;
        testingSection = TestingSection.findByTitle(title);

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (!testingSection) {
                testingSection = new TestingSection(title: title, professor:TestingFaculty.findByUsername(faculty));

                if (testingSection.save(flush: true)) {
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

    def saveNewFaculty(String fName, String mName, String lName, String username, String email, String role){
        JSON resultJson
        TestingFaculty testingFaculty;
        testingFaculty = TestingFaculty.findByUsername(username);

        String password = passwordRandomizerService.getRandomPass()

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (!testingFaculty) {
                testingFaculty = new TestingFaculty(fname: fName, mname: mName, lname: lName, username: username, email: email, role: TestingRole.findByRole(role), password: md5passService.getEncryptedPass(password));

                if (testingFaculty.save(flush: true)) {
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

    def loadFacultyEdit(int id){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            render(template: 'adminEditFaculty', model: [faculty: TestingFaculty.findById(id), roles: TestingRole.findAll()]);
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

    def saveEditFaculty(String fName, String mName, String lName, String username, String email, String role, int id){
        JSON resultJson
        TestingFaculty testingFaculty;
        testingFaculty = TestingFaculty.findByUsername(username);

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (testingFaculty) {
                if (testingFaculty.id == id) {
                    testingFaculty.fname = fName;
                    testingFaculty.mname = mName;
                    testingFaculty.lname = lName;
                    testingFaculty.username = username;
                    testingFaculty.email = email;
                    testingFaculty.role = TestingRole.findByRole(role);

                    if (testingFaculty.save(flush: true)) {
                        resultJson = [status: 0, message: "Success"] as JSON
                    } else {
                        resultJson = [status: 1, message: "Error"] as JSON
                    }
                } else {
                    resultJson = [status: 2, message: "Error"] as JSON
                }
            } else {
                testingFaculty = TestingFaculty.findById(id);

                testingFaculty.fname = fName;
                testingFaculty.mname = mName;
                testingFaculty.lname = lName;
                testingFaculty.username = username;
                testingFaculty.email = email;
                testingFaculty.role = TestingRole.findByRole(role)
                if (testingFaculty.save(flush: true)) {
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
            TestingRole testingRole2 = new TestingRole(role: "Coordinator");
            TestingRole testingRole3 = new TestingRole(role: "Professor");

            testingRole.save(flush: true)
            testingRole2.save(flush: true)
            testingRole3.save(flush: true)

            testingUser = new TestingFaculty(fname: "Admin", lname: "Admin", username: "admin@admin.com", password: md5passService.getEncryptedPass("testing"), role: TestingRole.findById(1))
            TestingFaculty testingUser2 = new TestingFaculty(fname: "CourseCoord", lname: "CourseCoord", username: "coursecoord@coordinator.com", password: md5passService.getEncryptedPass("testing"), role: TestingRole.findById(2))
            TestingFaculty testingUser3 = new TestingFaculty(fname: "Professor", lname: "Professor", username: "professor@professor.com", password: md5passService.getEncryptedPass("testing"), role: TestingRole.findById(3))
            TestingFaculty testingUser4 = new TestingFaculty(fname: "Professor2", lname: "Professor2", username: "professor2@professor.com", password: md5passService.getEncryptedPass("testing"), role: TestingRole.findById(3))
            TestingFaculty testingUser5 = new TestingFaculty(fname: "Professor3", lname: "Professor3", username: "professor3@professor.com", password: md5passService.getEncryptedPass("testing"), role: TestingRole.findById(3))
            TestingFaculty testingUser6 = new TestingFaculty(fname: "DeptCoord", lname: "DeptCoord", username: "deptcoord@coordinator.com", password: md5passService.getEncryptedPass("testing"), role: TestingRole.findById(2))
            TestingFaculty testingUser7 = new TestingFaculty(fname: "DeptCoord2", lname: "DeptCoord2", username: "deptcoord2@coordinator.com", password: md5passService.getEncryptedPass("testing"), role: TestingRole.findById(2))

            testingUser.save(flush: true)
            testingUser2.save(flush: true)
            testingUser3.save(flush: true)
            testingUser4.save(flush: true)
            testingUser5.save(flush: true)
            testingUser6.save(flush: true)
            testingUser7.save(flush: true)

            TestingSection testingSection = new TestingSection(professor: testingUser3, title: "testSec1");
            TestingSection testingSection2 = new TestingSection(professor: testingUser4, title: "testSec2");
            TestingSection testingSection3 = new TestingSection(professor: testingUser5, title: "testSec1");

            testingSection.save(flush: true)
            testingSection2.save(flush: true)
            testingSection3.save(flush: true)

            TestingCourse testingCourse = new TestingCourse(name: "TestCourse1", courseCoordinator: testingUser2, sections: [testingSection, testingSection2]);
            TestingCourse testingCourse2 = new TestingCourse(name: "TestCourse2", courseCoordinator: testingUser2, sections: [testingSection3]);
            TestingCourse testingCourse3 = new TestingCourse(name: "TestCourse3");
            TestingCourse testingCourse4 = new TestingCourse(name: "TestCourse4");

            testingCourse.save(flush: true)
            testingCourse2.save(flush: true)
            testingCourse3.save(flush: true)
            testingCourse4.save(flush: true)

            TestingDepartment testingDepartment = new TestingDepartment(name: "TestDept1", courses: [testingCourse, testingCourse2], departmentCoordinator: testingUser6);
            TestingDepartment testingDepartment2 = new TestingDepartment(name: "TestDept2", courses: [testingCourse3, testingCourse4], departmentCoordinator: testingUser7);

            testingDepartment.save(flush: true)
            testingDepartment2.save(flush: true)
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

            render([role:(testingFaculty.role).role, token:token, name: testingFaculty.fname + " " + testingFaculty.lname] as JSON)
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

            resultJson = [status:1, message:"Valid", role: (testingFaculty.role).role, name: testingFaculty.fname + " " + testingFaculty.lname] as JSON
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

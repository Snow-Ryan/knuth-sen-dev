package cas

import grails.converters.JSON

/**
 * Main controller for the CAS project
 * This controller hosts all of the endpoints used by the front end
 * And it handles data and template loading
 */
class MainController {
    Md5passService md5passService   //service for hashing passwords
    TokenProviderService tokenProviderService   //service for token creation
    PasswordRandomizerService passwordRandomizerService     //service for creation of random passwords for new accounts

    /**
     * Endpoint loads the index page
     * /main/index
     */
    def index() {
    }

    /**
     * /main/loadForms
     * @return either expired session template or the forms page filled with created assessment forms
     */
    def loadForms(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else{
            expandExpiration(request.getHeader('Authorization'))
            def forms = TestingForm.findAll()
            render (template: "formsPage", model: [forms: forms])
        }
    }

    /**
     * /main/loadAnalysis
     * @return either expired session template or the analysis page filled with created analysis
     */
    def loadAnalysis(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else{
            expandExpiration(request.getHeader('Authorization'))
            def analysis = TestingAnalysis.findAll()
            render (template: "analysisPage", model: [analysis: analysis])
        }
    }

    /**
     * /main/loadFaculty
     * @return either expired session template or the faculty page filled with created accounts
     */
    def loadFaculty(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else{
            expandExpiration(request.getHeader('Authorization'))
            def faculty = TestingFaculty.findAll()
            render (template: "adminFaculty", model: [faculty: faculty])
        }
    }

    /**
     * /main/loadDepartment
     * @return either expired session template or the departments page filled with created departments
     */
    def loadDepartment(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else{
            expandExpiration(request.getHeader('Authorization'))
            def department = TestingDepartment.findAll()
            render (template: "adminDepartment", model: [department: department])
        }
    }

    /**
     * /main/loadCourses
     * @return either expired session template or the courses page filled with created courses
     */
    def loadCourses(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else{
            expandExpiration(request.getHeader('Authorization'))
            def courses = TestingCourse.findAll()
            render (template: "adminCourses", model: [courses: courses])
        }
    }

    /**
     * /main/loadSections
     * @return either expired session template or the sections page filled with created sections
     */
    def loadSections(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else{
            expandExpiration(request.getHeader('Authorization'))
            render (template: "adminSections", model: [sections: TestingSection.findAll()])
        }
    }

    /**
     * /main/loadFacultyCreation
     * @return either expired session template or the faculty creation page
     */
    def loadFacultyCreation(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            render(template: "adminCreateFaculty", model: [roles: TestingRole.findAll()])
        }
    }

    /**
     * /main/loadDepartmentCreation
     * @return either expired session template or the admin creation page
     */
    def loadDepartmentCreation(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            render(template: "adminCreateDepartment", model: [faculty: TestingFaculty.findAll()])
        }
    }

    /**
     * /main/loadCourseCreation
     * @return either expired session template or the course creation page
     */
    def loadCourseCreation(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            render(template: "adminCreateCourse", model: [faculty: TestingFaculty.findAll(), departments: TestingDepartment.findAll()])
        }
    }

    /**
     * /main/loadSectionCreation
     * @return either expired session template or the section creation page
     */
    def loadSectionCreation(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            render(template: "adminCreateSection", model: [faculty: TestingFaculty.findAll(), courses: TestingCourse.findAll()])
        }
    }

    /**
     * /main/loadFormCreation
     * @return either expired session template or the form creation page
     */
    def loadFormCreation(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            render(template: "formCreation")
        }
    }

    /**
     * /main/loadAnalysisCreation
     * @return either expired session template or the analysis creation page
     */
    def loadAnalysisCreation(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))

            def forms = []
            def grades = TestingGradeStore.findAll() //list of stored grades in the database

            //get list of forms from stored grades
            grades.each {
                forms.add(it.forForm)
            }
            render(template: "analysisCreation", model: [forms: forms.unique(false)])
        }
    }

    /**
     * /main/saveNewForm
     * Endpoint creates a new assessment form
     * @param title - name for the form
     * @param question - graded item
     * @param description - description of the form
     * @param automationDate - date on which the form is republished
     * @return a value denoting weather or not a new form was saved successfully or not
     */
    def saveNewForm(String title, String question, String description, Integer automationDate){
        JSON resultJson
        TestingForm testingForm
        testingForm = TestingForm.findByTitle(title) //used to check if a form with the same title exists already

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (!testingForm) { //check if a form with the same title exists already
                //create new form
                testingForm = new TestingForm(title: title, question: question, description: description, creationDate: new Date().getDateString(), published: 0, automationDate: automationDate)
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

    /**
     * /main/saveNewSection
     * Endpoint saves new sections
     * @param title - name for the section
     * @param faculty - name of the professor teaching it
     * @param course - name of the course to which this section belongs
     * @return a value denoting weather or not a new form was saved successfully or not
     */
    def saveNewSection(String title, String faculty, String course){
        JSON resultJson
        TestingSection testingSection = TestingSection.findByTitle(title) //used to check if a section with the same title exists already
        TestingCourse testingCourse = TestingCourse.findByName(course) //used to check if a valid course name was received
        TestingFaculty testingFaculty = TestingFaculty.findByUsername(faculty) //used to check if a valid professor name was received

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (!testingSection && testingCourse && testingFaculty) { //check if this section exists already and if professor and courses are valid
                //new section
                testingSection = new TestingSection(title: title, professor: testingFaculty)

                if (testingSection.save(flush: true)) {
                    //update list of sections belonging to this course
                    def sections = testingCourse.sections
                    sections.add(testingSection)

                    testingCourse.sections = sections
                    if (testingCourse.save(flush: true)) {
                        resultJson = [status: 0, message: "Success"] as JSON
                    } else {
                        resultJson = [status: 1, message: "Error"] as JSON
                    }
                } else {
                    resultJson = [status: 1, message: "Error"] as JSON
                }
            } else {
                if(!testingCourse){
                    resultJson = [status: 3, message: "Error"] as JSON
                }
                    else if(!testingFaculty){
                    resultJson = [status: 4, message: "Error"] as JSON
                }
                else{
                    resultJson = [status: 2, message: "Error"] as JSON
                }
            }
        }
        render(resultJson)
    }

    /**
     *
     * @param name
     * @param benchmark
     * @param formId
     * @param grades
     * @return
     */
    def saveNewAnalysis(String name, Integer benchmark, Integer formId, Integer grades){
        JSON resultJson
        TestingAnalysis testingAnalysis
        testingAnalysis = TestingAnalysis.findByName(name)

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (!testingAnalysis) {
                TestingForm form = TestingForm.findById(formId)
                def gradesList = []

                if (grades == 0){
                    TestingGradeStore.findAllByForForm(form).each {
                        gradesList.add(it)
                    }
                }
                else {
                    gradesList.add(TestingGradeStore.findById(grades))
                }

                testingAnalysis = new TestingAnalysis(benchmark: benchmark, name: name, madeBy: TestingFaculty.findByToken(request.getHeader('Authorization')), gradeItem: form.question, forForm: form, grades: gradesList, createdOn: new Date().getDateString())

                if (testingAnalysis.save(flush: true)) {
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

    def saveNewCourse(String faculty, String name, String department, String description){
        JSON resultJson
        TestingCourse testingCourse = TestingCourse.findByName(name)
        TestingDepartment testingDepartment = TestingDepartment.findByName(department)
        TestingFaculty testingFaculty = TestingFaculty.findByUsername(faculty)

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (!testingCourse && testingFaculty && testingDepartment) {
                testingCourse = new TestingCourse(name: name, courseCoordinator: testingFaculty, description: description)

                if (testingCourse.save(flush: true)) {
                    def courses = testingDepartment.courses
                    courses.add(testingCourse)

                    testingDepartment.courses = courses
                    if (testingDepartment.save(flush: true)) {
                        resultJson = [status: 0, message: "Success"] as JSON
                    } else {
                        resultJson = [status: 1, message: "Error"] as JSON
                    }
                } else {
                    resultJson = [status: 1, message: "Error"] as JSON
                }
            } else {
                if(testingCourse){
                    resultJson = [status: 2, message: "Error"] as JSON
                }
                else if(!testingFaculty){
                    resultJson = [status: 3, message: "Error"] as JSON
                }
                else{
                    resultJson = [status: 4, message: "Error"] as JSON
                }
            }
        }
        render(resultJson)
    }

    def saveNewFaculty(String fName, String mName, String lName, String username, String email, String role){
        JSON resultJson
        TestingFaculty testingFaculty = TestingFaculty.findByUsername(username)
        TestingFaculty testingFaculty2 = TestingFaculty.findByEmail(email)
        TestingRole testingRole = TestingRole.findByRole(role)

        String password = passwordRandomizerService.getRandomPass()

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (!testingFaculty && !testingFaculty2) {
                if(testingRole){
                    testingFaculty = new TestingFaculty(fname: fName, mname: mName, lname: lName, username: username, email: email, role: testingRole, password: md5passService.getEncryptedPass(password))

                    if (testingFaculty.save(flush: true)) {

                        notifyUser(testingFaculty, password)

                        resultJson = [status: 0, message: "Success"] as JSON
                    } else {
                        resultJson = [status: 1, message: "Error"] as JSON
                    }
                }
                else{
                    resultJson = [status: 3, message: "Error"] as JSON
                }

            } else {
                if(!testingFaculty){
                    resultJson = [status: 4, message: "Error"] as JSON
                }
                else{
                    resultJson = [status: 2, message: "Error"] as JSON
                }
            }
        }
        render(resultJson)
    }

    def saveNewDepartment(String name, String faculty){
        JSON resultJson
        TestingDepartment testingDepartment
        testingDepartment = TestingDepartment.findByName(name)
        TestingFaculty testingFaculty = TestingFaculty.findByUsername(faculty)

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (!testingDepartment && testingFaculty) {
                testingDepartment = new TestingDepartment(name: name, departmentCoordinator: testingFaculty)

                if (testingDepartment.save(flush: true)) {
                    resultJson = [status: 0, message: "Success"] as JSON
                } else {
                    resultJson = [status: 1, message: "Error"] as JSON
                }
            } else {
                if(!testingFaculty){
                    resultJson = [status: 3, message: "Error"] as JSON
                }
                else{
                    resultJson = [status: 2, message: "Error"] as JSON
                }
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
            render(template: 'formEdit', model: [form: TestingForm.findById(id)])
        }
    }

    def loadFacultyEdit(int id){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            render(template: 'adminEditFaculty', model: [faculty: TestingFaculty.findById(id), roles: TestingRole.findAll()])
        }
    }

    def loadDepartmentEdit(int id){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            render(template: 'adminEditDepartment', model: [department: TestingDepartment.findById(id), faculty: TestingFaculty.findAll()])
        }
    }

    def loadSectionEdit(int id){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            TestingSection testingSection = TestingSection.findById(id)

            def courses = TestingCourse.executeQuery("FROM TestingCourse as tc WHERE :section in elements(tc.sections)", [section : testingSection])
            render(template: 'adminEditSection', model: [section: testingSection, faculty: TestingFaculty.findAll(), course:courses[0], courses: TestingCourse.findAll()])
        }
    }

    def loadCourseEdit(int id){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            TestingCourse testingCourse = TestingCourse.findById(id)

            def departments = TestingDepartment.executeQuery("FROM TestingDepartment as td WHERE :course in elements(td.courses)", [course : testingCourse])
            render(template: 'adminEditCourse', model: [course: testingCourse, faculty: TestingFaculty.findAll(), department:departments[0], departments: TestingDepartment.findAll()])
        }
    }

    def loadExpiredSession(){
        render template: "expiredSession"
    }

    def disableFaculty(int id){
        JSON resultJson = [status: 1, message: "Error"] as JSON
        TestingFaculty testingFaculty
        testingFaculty = TestingFaculty.findById(id)

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (testingFaculty) {
                testingFaculty.active = 0
                if (testingFaculty.save(flush: true)) {
                    resultJson = [status: 0, message: "Success"] as JSON
                } else {
                    resultJson = [status: 1, message: "Error"] as JSON
                }
            }
        }
        render(resultJson)
    }

    def enableDepartment(int id){
        JSON resultJson = [status: 1, message: "Error"] as JSON
        TestingDepartment testingDepartment
        testingDepartment = TestingDepartment.findById(id)

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (testingDepartment) {
                testingDepartment.active = 1
                if (testingDepartment.save(flush: true)) {
                    resultJson = [status: 0, message: "Success"] as JSON
                } else {
                    resultJson = [status: 1, message: "Error"] as JSON
                }
            }
        }
        render(resultJson)
    }

    def disableDepartment(int id){
        JSON resultJson = [status: 1, message: "Error"] as JSON
        TestingDepartment testingDepartment
        testingDepartment = TestingDepartment.findById(id)

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (testingDepartment) {
                testingDepartment.active = 0
                if (testingDepartment.save(flush: true)) {
                    resultJson = [status: 0, message: "Success"] as JSON
                } else {
                    resultJson = [status: 1, message: "Error"] as JSON
                }
            }
        }
        render(resultJson)
    }

    def enableCourse(int id){
        JSON resultJson = [status: 1, message: "Error"] as JSON
        TestingCourse testingCourse
        testingCourse = TestingCourse.findById(id)

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (testingCourse) {
                testingCourse.active = 1
                if (testingCourse.save(flush: true)) {
                    resultJson = [status: 0, message: "Success"] as JSON
                } else {
                    resultJson = [status: 1, message: "Error"] as JSON
                }
            }
        }
        render(resultJson)
    }

    def disableCourse(int id){
        JSON resultJson = [status: 1, message: "Error"] as JSON
        TestingCourse testingCourse
        testingCourse = TestingCourse.findById(id)

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (testingCourse) {
                testingCourse.active = 0
                if (testingCourse.save(flush: true)) {
                    resultJson = [status: 0, message: "Success"] as JSON
                } else {
                    resultJson = [status: 1, message: "Error"] as JSON
                }
            }
        }
        render(resultJson)
    }

    def enableFaculty(int id){
        JSON resultJson = [status: 1, message: "Error"] as JSON
        TestingFaculty testingFaculty
        testingFaculty = TestingFaculty.findById(id)

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (testingFaculty) {
                testingFaculty.active = 1
                if (testingFaculty.save(flush: true)) {
                    resultJson = [status: 0, message: "Success"] as JSON
                } else {
                    resultJson = [status: 1, message: "Error"] as JSON
                }
            }
        }
        render(resultJson)
    }

    def disableSection(int id){
        JSON resultJson = [status: 1, message: "Error"] as JSON
        TestingSection testingSection
        testingSection = TestingSection.findById(id)

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (testingSection) {
                testingSection.active = 0
                if (testingSection.save(flush: true)) {
                    resultJson = [status: 0, message: "Success"] as JSON
                } else {
                    resultJson = [status: 1, message: "Error"] as JSON
                }
            }
        }
        render(resultJson)
    }

    def enableSection(int id){
        JSON resultJson = [status: 1, message: "Error"] as JSON
        TestingSection testingSection
        testingSection = TestingSection.findById(id)

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (testingSection) {
                testingSection.active = 1
                if (testingSection.save(flush: true)) {
                    resultJson = [status: 0, message: "Success"] as JSON
                } else {
                    resultJson = [status: 1, message: "Error"] as JSON
                }
            }
        }
        render(resultJson)
    }

    def saveEditForm(String title, String question, String description, int id, Integer automationDate){
        JSON resultJson
        TestingForm testingForm
        testingForm = TestingForm.findByTitle(title)

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (testingForm) {
                if (testingForm.id == id) {
                    testingForm.question = question
                    testingForm.description = description
                    testingForm.automationDate = automationDate

                    if (testingForm.save(flush: true)) {
                        resultJson = [status: 0, message: "Success"] as JSON
                    } else {
                        resultJson = [status: 1, message: "Error"] as JSON
                    }
                } else {
                    resultJson = [status: 2, message: "Error"] as JSON
                }
            } else {
                testingForm = TestingForm.findById(id)

                testingForm.title = title
                testingForm.question = question
                testingForm.description = description
                testingForm.automationDate = automationDate
                if (testingForm.save(flush: true)) {
                    resultJson = [status: 0, message: "Success"] as JSON
                } else {
                    resultJson = [status: 1, message: "Error"] as JSON
                }
            }
        }
        render(resultJson)
    }

    def saveEditCourse(String name, String faculty, String department, String description, int id){
        JSON resultJson
        TestingCourse testingCourse = TestingCourse.findByName(name)
        TestingDepartment testingDepartment = TestingDepartment.findByName(department)
        TestingFaculty testingFaculty = TestingFaculty.findByUsername(faculty)

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if(testingFaculty && testingDepartment){
                if (testingCourse) {
                    if (testingCourse.id == id) {
                        testingCourse.name = name
                        testingCourse.courseCoordinator = testingFaculty
                        testingCourse.description = description

                        if (testingCourse.save(flush: true)) {
                            def departments = TestingDepartment.executeQuery("FROM TestingDepartment as td WHERE :course in elements(td.courses)", [course : testingCourse])
                            def departmentCourses = departments[0].courses

                            departmentCourses.remove(testingCourse)

                            departments[0].courses = departmentCourses

                            if (departments[0].save(flush: true)) {


                                def courses = testingDepartment.courses
                                courses.add(testingCourse)

                                testingDepartment.courses = courses

                                if (testingDepartment.save(flush: true)) {
                                    resultJson = [status: 0, message: "Success"] as JSON
                                } else {
                                    resultJson = [status: 1, message: "Error"] as JSON
                                }
                            } else {
                                resultJson = [status: 1, message: "Error"] as JSON
                            }
                        } else {
                            resultJson = [status: 1, message: "Error"] as JSON
                        }
                    } else {
                        resultJson = [status: 2, message: "Error"] as JSON
                    }
                } else {
                    testingCourse = TestingCourse.findById(id)

                    testingCourse.name = name
                    testingCourse.courseCoordinator = testingFaculty
                    testingCourse.description = description
                    if (testingCourse.save(flush: true)) {
                        def departments = TestingDepartment.executeQuery("FROM TestingDepartment as td WHERE :course in elements(td.courses)", [course : testingCourse])
                        def departmentCourses = departments[0].courses

                        departmentCourses.remove(testingCourse)

                        departments[0].courses = departmentCourses

                        if (departments[0].save(flush: true)) {

                            def courses = testingDepartment.courses
                            courses.add(testingCourse)

                            testingDepartment.courses = courses

                            if (testingDepartment.save(flush: true)) {
                                resultJson = [status: 0, message: "Success"] as JSON
                            } else {
                                resultJson = [status: 1, message: "Error"] as JSON
                            }
                        } else {
                            resultJson = [status: 1, message: "Error"] as JSON
                        }
                    } else {
                        resultJson = [status: 1, message: "Error"] as JSON
                    }
                }
            }
            else{
                if(!testingFaculty){
                    resultJson = [status: 3, message: "Error"] as JSON
                }
                else{
                    resultJson = [status: 4, message: "Error"] as JSON
                }
            }
        }
        render(resultJson)
    }

    def saveEditSection(String title, String faculty, String course, int id){
        JSON resultJson
        TestingSection testingSection
        testingSection = TestingSection.findByTitle(title)
        TestingFaculty testingFaculty = TestingFaculty.findByUsername(faculty)
        TestingCourse testingCourse = TestingCourse.findByName(course)
        if (!testingFaculty || !testingCourse){
            if(!testingFaculty){
                resultJson = [status: 3] as JSON
            }
            else{
                resultJson = [status: 4] as JSON
            }
        }
        else {
            if (checkExpiration(request.getHeader('Authorization'))) {
                resultJson = [status: 5, message: "Expired"] as JSON
            } else {
                expandExpiration(request.getHeader('Authorization'))
                if (testingSection) {
                    if (testingSection.id == id) {
                        testingSection.title = title
                        testingSection.professor = testingFaculty

                        if (testingSection.save(flush: true)) {
                            def courses = TestingCourse.executeQuery("FROM TestingCourse as tc WHERE :section in elements(tc.sections)", [section: testingSection])
                            def courseSections = courses[0].sections

                            courseSections.remove(testingSection)

                            courses[0].sections = courseSections

                            if (courses[0].save(flush: true)) {
                                def sections = testingCourse.sections
                                sections.add(testingSection)

                                testingCourse.sections = sections

                                if (testingCourse.save(flush: true)) {
                                    resultJson = [status: 0, message: "Success"] as JSON
                                } else {
                                    resultJson = [status: 1, message: "Error"] as JSON
                                }
                            } else {
                                resultJson = [status: 1, message: "Error"] as JSON
                            }
                        } else {
                            resultJson = [status: 1, message: "Error"] as JSON
                        }
                    } else {
                        resultJson = [status: 2, message: "Error"] as JSON
                    }
                } else {
                    testingSection = TestingSection.findById(id)

                    testingSection.title = title
                    testingSection.professor = testingFaculty
                    if (testingSection.save(flush: true)) {
                        def courses = TestingCourse.executeQuery("FROM TestingCourse as tc WHERE :section in elements(tc.sections)", [section: testingSection])
                        def courseSections = courses[0].sections

                        courseSections.remove(testingSection)

                        courses[0].sections = courseSections

                        if (courses[0].save(flush: true)) {
                            def sections = testingCourse.sections
                            sections.add(testingSection)

                            testingCourse.sections = sections

                            if (testingCourse.save(flush: true)) {
                                resultJson = [status: 0, message: "Success"] as JSON
                            } else {
                                resultJson = [status: 1, message: "Error"] as JSON
                            }
                        } else {
                            resultJson = [status: 1, message: "Error"] as JSON
                        }
                    } else {
                        resultJson = [status: 1, message: "Error"] as JSON
                    }
                }
            }
        }
        render(resultJson)
    }

    def saveEditDepartment(String name, String faculty, int id){
        JSON resultJson
        TestingDepartment testingDepartment = TestingDepartment.findByName(name)
        TestingFaculty testingFaculty = TestingFaculty.findByUsername(faculty)
        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if(testingFaculty){
                if (testingDepartment) {
                    if (testingDepartment.id == id) {
                        testingDepartment.name = name
                        testingDepartment.departmentCoordinator = testingFaculty

                        if (testingDepartment.save(flush: true)) {
                            resultJson = [status: 0, message: "Success"] as JSON
                        } else {
                            resultJson = [status: 1, message: "Error"] as JSON
                        }
                    } else {
                        resultJson = [status: 2, message: "Error"] as JSON
                    }
                } else {
                    testingDepartment = TestingDepartment.findById(id)

                    testingDepartment.name = name
                    testingDepartment.departmentCoordinator = testingFaculty
                    if (testingDepartment.save(flush: true)) {
                        resultJson = [status: 0, message: "Success"] as JSON
                    } else {
                        resultJson = [status: 1, message: "Error"] as JSON
                    }
                }
            }
            else{
                resultJson = [status: 3, message: "Error"] as JSON
            }
        }
        render(resultJson)
    }

    def saveEditFaculty(String fName, String mName, String lName, String username, String email, String role, int id){
        JSON resultJson
        TestingFaculty testingFaculty = TestingFaculty.findByUsername(username)
        TestingFaculty testingFaculty1 = TestingFaculty.findByEmail(email)
        TestingRole testingRole = TestingRole.findByRole(role)


        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if(testingRole) {
                if (testingFaculty) {
                    if (testingFaculty.id == id) {
                        if(testingFaculty1 && testingFaculty1.id!=id){
                            resultJson = [status: 4, message: "Error"] as JSON
                        }else {
                            testingFaculty.fname = fName
                            testingFaculty.mname = mName
                            testingFaculty.lname = lName
                            testingFaculty.username = username
                            testingFaculty.email = email
                            testingFaculty.role = TestingRole.findByRole(role)

                            if (testingFaculty.save(flush: true)) {
                                resultJson = [status: 0, message: "Success"] as JSON
                            } else {
                                resultJson = [status: 1, message: "Error"] as JSON
                            }
                        }
                    } else {
                        resultJson = [status: 2, message: "Error"] as JSON
                    }
                } else {
                    if(testingFaculty1 && testingFaculty1.id!=id){
                        resultJson = [status: 4, message: "Error"] as JSON
                    }
                    else{
                        testingFaculty = TestingFaculty.findById(id)
                        testingFaculty.fname = fName
                        testingFaculty.mname = mName
                        testingFaculty.lname = lName
                        testingFaculty.username = username
                        testingFaculty.email = email
                        testingFaculty.role = TestingRole.findByRole(role)
                        if (testingFaculty.save(flush: true)) {
                            resultJson = [status: 0, message: "Success"] as JSON
                        } else {
                            resultJson = [status: 1, message: "Error"] as JSON
                        }
                    }
                }
            }
            else{
                resultJson = [status: 3, message: "Error"] as JSON
            }
        }
        render(resultJson)
    }

    def deleteForm(int id){
        TestingForm testingForm = TestingForm.findById(id)

        JSON resultJson

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if(!TestingGradeStore.findByForForm(testingForm)){
                if (testingForm.delete(flush: true)) {
                    resultJson = [status: 0, message: "Success"] as JSON
                } else {
                    resultJson = [status: 1, message: "Error"] as JSON
                }
            }
            else{
                resultJson = [status: 2, message: "Error"] as JSON
            }
        }
        render resultJson
    }

    def loadingScreen(){
        render template: "loadingScreen"
    }

    def resetPasswordScreen(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else{
            expandExpiration(request.getHeader('Authorization'))
            render (template: "resetPassword")
        }
    }

    def resetPassword(String oldpassword, String newpassword, String confirmpassword){
        JSON resultJson

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message:"Expired"] as JSON
        }
        else{
            expandExpiration(request.getHeader('Authorization'))
            TestingFaculty testingFaculty = TestingFaculty.findByUsernameAndPassword(TestingFaculty.findByToken(request.getHeader('Authorization')).username, md5passService.getEncryptedPass(oldpassword))

            if(testingFaculty){
                if(newpassword==confirmpassword){
                    testingFaculty.password = md5passService.getEncryptedPass(newpassword)

                    if(testingFaculty.save(flush: true)){
                        resultJson = [status: 1, message: "confirmed"] as JSON
                    }
                    else{
                        resultJson = [status: 4, message: "failed"] as JSON
                    }

                }
                else{
                    resultJson = [status: 3, message: "missmatch"] as JSON
                }
            }
            else{
                resultJson = [status: 2, message: "old"] as JSON
            }
        }

        render resultJson
    }

    def loadLogIn(){
        TestingFaculty testingUser

        testingUser = TestingFaculty.findByUsername("admin")

        if(!testingUser){
            TestingRole testingRole = new TestingRole(role: "Assessment Coordinator")
            TestingRole testingRole2 = new TestingRole(role: "Admin")
            TestingRole testingRole3 = new TestingRole(role: "Professor")

            testingRole.save(flush: true)
            testingRole2.save(flush: true)
            testingRole3.save(flush: true)

            testingUser = new TestingFaculty(fname: "Admin", lname: "Admin", username: "admin", password: md5passService.getEncryptedPass("testing"), role: TestingRole.findById(2))
            testingUser.save(flush: true)
        }
        render template: 'loginPage'
    }

    def login(String username, String password){
        TestingFaculty testingFaculty = TestingFaculty.findByUsernameAndPassword(username, md5passService.getEncryptedPass(password))

        if(testingFaculty){
            if(testingFaculty.active==0){
                render("fail")
            }
            else {
                String token = tokenProviderService.getToken()
                testingFaculty.token = token
                testingFaculty.expiration = System.currentTimeMillis() + 600000 //current time + 10 minutes

                testingFaculty.save(flush: true)

                render([role:(testingFaculty.role).role, token:token, name: testingFaculty.fname + " " + testingFaculty.lname] as JSON)
            }
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

    def loadFormPublishing(int id) {
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else{
            expandExpiration(request.getHeader('Authorization'))
            def departments = TestingDepartment.findAll()
            render (template: "formPublish", model: [departments: departments, id: id])
        }
    }

    private notifyUser(TestingFaculty user, pass){
        sendMail {
            to user.email
            subject "Account Created for CAS"
            html g.render(template:'/mail/newFacultyMail', model:[user:user, pass:pass])
        }
    }

    private sendPublishMail(TestingFaculty user, TestingForm form){
        sendMail {
            to user.email
            subject "Assessment Form Published"
            html g.render(template:'/mail/publishedForm', model:[user:user, form:form])
        }
    }

    def loadDepartmentCourses(String departmentName) {
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            TestingDepartment testingDepartment = TestingDepartment.findByName(departmentName)
            if(testingDepartment){
                render(template: 'formPublishingCourses', model: [courses: testingDepartment.courses])
            }
            else{
                render "fail"
            }

        }
    }

    def loadStoredGrades(Integer id) {
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            render(template: 'analysisCreationStoredGrades', model: [storedGradeItem: TestingGradeStore.findAllByForForm(TestingForm.findById(id))])
        }
    }

    def publishForm(String courseName, int id) {

        JSON resultJson

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))

            TestingForm testingForm = TestingForm.findById(id)
            TestingCourse testingCourse = TestingCourse.findByName(courseName)

            Date d
            if(testingForm.publishDate){
                d = new Date(testingForm.publishDate)
            }
            else{
                d = new Date()
            }
            Date currentD = new Date()

            if (testingForm && testingCourse) {
                testingForm.published = 1
                testingForm.course = testingCourse
                if((currentD.getYear()>=d.getYear())&&(currentD.getMonth()+1>=testingForm.automationDate)){
                    testingForm.publishDate = new Date().getDateString()

                    if (testingForm.save(flush: true)) {
                        testingForm.course.sections.each{
                            sendPublishMail(it.professor, testingForm)
                        }
                        resultJson = [status: 0, message: "Success"] as JSON
                    } else {
                        resultJson = [status: 1, message: "Error"] as JSON
                    }
                } else {
                    if (testingForm.save(flush: true)) {
                        resultJson = [status: 0, message: "Success"] as JSON
                    } else {
                        resultJson = [status: 1, message: "Error"] as JSON
                    }
                }
            } else {
                resultJson = [status: 1, message: "Error"] as JSON
            }
        }
        render(resultJson)
    }

    def unpublishForm(Integer id){
        JSON resultJson = [status: 1, message: "Error"] as JSON
        TestingForm testingForm
        testingForm = TestingForm.findById(id)

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            if (testingForm) {
                testingForm.published = 0
                testingForm.course = null
                testingForm.publishDate = null
                if (testingForm.save(flush: true)) {
                    resultJson = [status: 0, message: "Success"] as JSON
                } else {
                    resultJson = [status: 1, message: "Error"] as JSON
                }
            }
        }
        render(resultJson)
    }

    def copyFormEdit(int id){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {
            expandExpiration(request.getHeader('Authorization'))
            render(template: 'formCopy', model: [form: TestingForm.findById(id)])
        }
    }

    def loadUserForms(){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else{
            expandExpiration(request.getHeader('Authorization'))

            TestingFaculty currentUser = TestingFaculty.findByToken(request.getHeader('Authorization'))

            def allForms = TestingForm.findAllByPublished(1)
            def forms = []
            def sections = []

            for(TestingForm tf in allForms){
                if(tf.publishDate){
                    for(TestingSection ts in tf.course.sections){
                        if(ts.professor == currentUser && !(ts.active==0)){
                            def allGradesForForm = TestingGradeStore.findAllByForFormAndForSectionAndStoredBy(tf,ts,currentUser)
                            if(allGradesForForm){
                                TestingGradeStore testingGradeStore = allGradesForForm.last()

                                Date storageDate = new Date(testingGradeStore.storeDate)
                                Date publishDate = new Date(tf.publishDate)

                                if (publishDate>storageDate){
                                    forms.add(tf)
                                    sections.add(ts)
                                }
                            }
                            else{
                                forms.add(tf)
                                sections.add(ts)
                            }
                        }
                    }
                }
            }

            def users = []
            def assessmentCoordinators = TestingFaculty.findAllByRole(TestingRole.findById(1))

            assessmentCoordinators.each{
                users.add(it)
            }

            render (template: "listAvailableForms", model: [forms: forms, sections: sections, assessmentCoordinators:assessmentCoordinators])
        }
    }

    def loadDataInput(int id, int sectionId){
        if(checkExpiration(request.getHeader('Authorization'))){
            render template: "expiredSession"
        }
        else {

            expandExpiration(request.getHeader('Authorization'))
            TestingForm form = TestingForm.findById(id)
            render(template: 'dataInput', model: [id: id, sectionId: sectionId, cName:form.course.name, sTitle:TestingSection.findById(sectionId).title, question:form.question])
        }
    }

    def saveGradeData(Integer id, String grades, Integer sectionId, Integer gradeRange){

        JSON resultJson
        TestingForm testingForm
        testingForm = TestingForm.findById(id)
        TestingFaculty testingFaculty = TestingFaculty.findByToken(request.getHeader('Authorization'))
        TestingGradeStore testingGradeStore
        Date now = new Date()

        if(checkExpiration(request.getHeader('Authorization'))){
            resultJson = [status: 5, message: "Expired"] as JSON
        }
        else {
            expandExpiration(request.getHeader('Authorization'))

            testingGradeStore = new TestingGradeStore(grades: grades, forForm: testingForm, forSection: TestingSection.findById(sectionId), storedBy: testingFaculty, storeDate: now.getDateString(), gradeRange: gradeRange)

            if (testingGradeStore.save(flush: true)) {
                resultJson = [status: 0, message: "Success"] as JSON
            } else {
                resultJson = [status: 1, message: "Error"] as JSON
            }
        }
        render(resultJson)
    }

    protected static findFormsToRepublish(){

        def allPublishedForms = TestingForm.findAllByPublished(1)
        def toRepublish = []

        allPublishedForms.each {

            Date d
            if(it.publishDate){
                d= new Date(it.publishDate)
            }
            else{
                d = new Date()
            }

            Date currentD = new Date()

            if((currentD.getYear()>d.getYear())&&(currentD.getMonth()+1>=it.automationDate)){
                toRepublish.push(it)
            }
        }

        republishForms(toRepublish)
    }

    protected static republishForms(toRepublish){
        toRepublish.each {
            TestingForm form = it
            it.publishDate = new Date().getDateString()
            it.save(flush: true)

            for(TestingSection ts in form.course.sections) {

                sendPublishMail(ts.professor, form)
            }
        }
    }

    protected static republishEmail(TestingFaculty user, TestingForm form){
        sendMail {
            to user.email
            subject "Assessment Form Published"
            html g.render(template:'/mail/publishedForm', model:[user:user, form:form])
        }
    }

}


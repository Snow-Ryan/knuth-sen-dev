package cas

import grails.converters.JSON

class MainController {

    def index() { }

    def loadForms(){
        def forms = TestingForm.findAll()
        render (template: "formsPage", model: [forms: forms])
    };

    def loadFormCreation(){
        render (template: "formCreation")
    }

    def saveNewForm(String title, String content, String creationDate, String description){
        JSON resultJson
        TestingForm testingForm;

        testingForm = new TestingForm(title: title, content: content, creationDate: creationDate, published: 0, description: description);
        if(testingForm.save(flush: true)){
            resultJson = [status:0, message:"Success"] as JSON
        } else {
            resultJson = [status:1, message:"Error"] as JSON
        }

        render(resultJson)

    }
}

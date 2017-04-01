package cas

import jxl.Workbook
import jxl.write.Label
import jxl.write.WritableSheet
import jxl.write.WritableWorkbook
import jxl.write.WritableFont
import jxl.write.Number;
import jxl.write.WritableCellFormat
import org.codehaus.groovy.grails.web.json.JSONObject

class DataDownloadController {
    def index() {}

    def downloadAllData(Integer id){

        TestingForm testingForm = TestingForm.findById(id)
        def allGradeData = TestingGradeStore.findAllByForForm(testingForm)

        String formQuestion = testingForm.question
        String formTitle = testingForm.title
        String courseName
        if(testingForm.course){
            courseName = testingForm.course.name
        }
        else{
            courseName = "Form never published"
        }
        String fileName = "All grade data for " + testingForm.title + ".xls"

        WritableFont cellFont = new WritableFont(WritableFont.ARIAL, 10);
        cellFont.setBoldStyle(WritableFont.BOLD);
        WritableCellFormat cellFormatBold = new WritableCellFormat(cellFont);

        response.setContentType('application/vnd.ms-excel')
        response.setHeader('Content-Disposition', 'Attachment;Filename='+fileName)

        WritableWorkbook workbook = Workbook.createWorkbook(response.outputStream)
        WritableSheet sheet1 = workbook.createSheet("AllGrades", 0)

        sheet1.setColumnView(0,20);
        sheet1.setColumnView(1,20);

        sheet1.addCell(new Label(0,0, "All data for: ", cellFormatBold))
        sheet1.addCell(new Label(1,0, formTitle))
        sheet1.addCell(new Label(0,1, "Grade item: ", cellFormatBold))
        sheet1.addCell(new Label(1,1, formQuestion))
        sheet1.addCell(new Label(0,2, "Course: ", cellFormatBold))
        sheet1.addCell(new Label(1,2, courseName))

        int y = 4
        int num = 0
        for(TestingGradeStore tgs in allGradeData){
            sheet1.addCell(new Label(0,y, "Section", cellFormatBold))
            sheet1.addCell(new Label(1,y, tgs.forSection.title))

            y++

            sheet1.addCell(new Label(0,y, "Student", cellFormatBold))
            sheet1.addCell(new Label(1,y, "Grade", cellFormatBold))

            y++

            JSONObject jsData = new JSONObject(tgs.grades);

            jsData.array.eachWithIndex { grade, index ->
                num = index+1

                sheet1.addCell(new Number(0,y, num))
                if(grade instanceof String){
                    sheet1.addCell(new Label(1,y, grade.toString()))
                }
                else {
                    sheet1.addCell(new Number(1,y, grade as int))
                }
                y++
            }
            y++
        }
        workbook.write();
        workbook.close();
    }

    def downloadSpecificData(){

    }
}






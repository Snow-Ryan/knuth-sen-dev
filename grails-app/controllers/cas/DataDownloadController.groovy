package cas

import grails.converters.JSON
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

    def downloadAnalysisData(Integer id){
        TestingAnalysis testingAnalysis = TestingAnalysis.findById(id)

        String date = testingAnalysis.createdOn
        String course = testingAnalysis.forForm.course.name
        String courseCoordinator = testingAnalysis.forForm.course.courseCoordinator.fname + " " + testingAnalysis.forForm.course.courseCoordinator.lname

        String instructor = ""
        String received = ""
        Integer benchmark = testingAnalysis.benchmark
        Integer gradesAboveBenchmark = 0
        Integer gradesCount = 0

        if(testingAnalysis.grades.size()>1){
            testingAnalysis.grades.each {
                instructor += it.forSection.professor.fname + " " + it.forSection.professor.lname + ", "
                received += it.storeDate + ", "

                JSONObject grades = JSON.parse(it.grades)
                grades.each { n, data ->
                    data.eachWithIndex { grade, index ->
                        gradesCount++
                        if ((grade as int)>benchmark-1){
                            gradesAboveBenchmark++
                        }
                    }
                }
            }
            instructor = instructor.substring(0, instructor.length()-2)
            received = received.substring(0, received.length()-2)
        }
        else{
            instructor = testingAnalysis.grades[0].forSection.professor.fname + " " + testingAnalysis.grades[0].forSection.professor.lname
            received = testingAnalysis.grades[0].storeDate

            JSONObject grades = JSON.parse(testingAnalysis.grades[0].grades)
            grades.each { n, data ->
                data.eachWithIndex { grade, index ->
                    gradesCount++
                    if ((grade as int)>benchmark-1){
                        gradesAboveBenchmark++
                    }
                }
            }
        }

        String assessmentInstrument = testingAnalysis.forForm.question

        Float percentage = gradesAboveBenchmark/gradesCount * 100

        String fileName = "Analysis data for " + testingAnalysis.name + ".xls"

        WritableFont cellFont = new WritableFont(WritableFont.ARIAL, 10);
        cellFont.setBoldStyle(WritableFont.BOLD);
        WritableCellFormat cellFormatBold = new WritableCellFormat(cellFont)

        response.setContentType('application/vnd.ms-excel')
        response.setHeader('Content-Disposition', 'Attachment;Filename='+fileName)

        WritableWorkbook workbook = Workbook.createWorkbook(response.outputStream)
        WritableSheet sheet1 = workbook.createSheet("Analysis", 0)

        sheet1.setColumnView(0,20);
        sheet1.setColumnView(1,20);
        sheet1.setColumnView(2,20);
        sheet1.setColumnView(3,20);
        sheet1.setColumnView(4,20);
        sheet1.setColumnView(5,20);
        sheet1.setColumnView(6,20);
        sheet1.setColumnView(7,20);

        sheet1.addCell(new Label(0,0, "Analyzed on: ", cellFormatBold))
        sheet1.addCell(new Label(1,0, date as String))

        sheet1.addCell(new Label(1,0, "Course: ", cellFormatBold))
        sheet1.addCell(new Label(1,1, course))

        sheet1.addCell(new Label(2,0, "Course coordinator: ", cellFormatBold))
        sheet1.addCell(new Label(2,1, courseCoordinator))

        sheet1.addCell(new Label(3,0, "Instructor: ", cellFormatBold))
        sheet1.addCell(new Label(3,1, instructor))

        sheet1.addCell(new Label(4,0, "Data received on: ", cellFormatBold))
        sheet1.addCell(new Label(4,1, received))

        sheet1.addCell(new Label(5,0, "Course assessment instrument: ", cellFormatBold))
        sheet1.addCell(new Label(5,1, assessmentInstrument))

        sheet1.addCell(new Label(6,0, "Benchmark: %", cellFormatBold))
        sheet1.addCell(new Number(6,1, benchmark))

        sheet1.addCell(new Label(7,0, "Over benchmark: %", cellFormatBold))
        sheet1.addCell(new Number(7,1, percentage))

        workbook.write();
        workbook.close();
    }

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
}






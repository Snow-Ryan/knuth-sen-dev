%{--
Main page of CAS
This file contains all of the event handling functions
--}%

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title></title>
    <meta name="layout" content="main"/>
</head>

<body >
%{--
This div is used to show all of the templates within the application.
They are loaded and removed based on which event was triggered.
--}%
<div id="mainContainer" class="container block-element-container"></div>



<script>
//    Variable is used to load the single grade items template which is displayed when parsing multiple grades or
//    adding a new single grade item. This display is handled by Dust.js
    var singleGradeItem = commentToHtml(function () {<g:render template="singleGradeItem"/>});
    var $body = $('body');

    $('.secondNav').css("visibility", "hidden"); //remove the navbar until user actually logs in

    //On load check if the user is already logged in by checking the cookies for a token
    $( document ).ready(function() {
        var token;
        token = Cookies.get('token');

        if(token){
            checkLoginStatus(token);
        }
        else{
            loadLoadingScreen();
        }
    });
    //-----------------------------------------------EVENTS---------------------------------------------------------------
    //Load Forms page
    $body.on('click', '.forms', function (event) {
        event.preventDefault();
        endTours(); //remove any currently active Shepherd tours
        loadForms();
    });

    //Load Analysis page
    $body.on('click', '.analysis', function (event) {
        event.preventDefault();
        endTours();
        loadAnalysis();
    });

    //Load Grade Data Entry page
    $body.on('click', '.pView', function (event) {
        event.preventDefault();
        endTours();
        loadProfView();
    });

    //Prevent action if the Admin option is selected in navigation
    //this option just serves to create a manu of Admin choices
    $body.on('click', '.admin', function (event) {
        event.preventDefault();
    });

   //Load Log in page
    $body.on('click', '.loginBtn', function (event) {
        event.preventDefault();
    });

    $body.on('click', '.loginBtn', function () {
        loadLogInPage();
    });

    //Load Password reset page
    $body.on('click', '.resetpassBtn', function () {
        loadresetPasswordScreen();
    });

    //Submit password change request
    $body.on('click', '.confirmPassword', function () {
        confirmPassword();
    });

    //Cancel grade data entry
    $body.on('click', '.cancelGradeInput', function () {
        endTours();
        loadProfView();
    });

    //Cancel login
    $body.on('click', '.cancelAttemptLogin', function () {
        location.reload();
    });

    //Cancel form editing
    $body.on('click', '.cancelEditForm', function ()
    {
        endTours();
        loadForms();
    });
    //Cancel form creation
    $body.on('click', '.cancelNewForm', function () {
        endTours();
        loadForms();
    });

    //Cancel department creation
    $body.on('click', '.cancelNewDepartment', function () {
        endTours();
        loadAdminDepartments();
    });

    //Publish a form
    $body.on('click', '.publishBtn', function () {
        endTours();
        $('.modal-body').empty();
        loadFormPublishing(this);
    });

    //Unpublish a form
    $body.on('click', '.unpublishButton', function () {
        unpublishForm(this);
    });

    //Load form creation
    $body.on('click', '.newFormButton', function () {
        endTours();
        loadFormCreation();
    });

    //Load analysis creation
    $body.on('click', '.newAnalysisButton', function () {
        endTours();
        loadAnalysisCreation();
    });

    //log in
    $body.on('click', '.attemptLogin', function () {
        attemptLogin();
    });

    //Load form editing
    $body.on('click', '.editBtn', function () {
        endTours();
        loadFormEdit(this);
    });

    //Load faculty editing
    $body.on('click', '.editFacultyBtn', function () {
        endTours();
        loadFacultyEdit(this);
    });

    //load department editing
    $body.on('click', '.editDepartmentBtn', function () {
        endTours();
        loadDepartmentEdit(this);
    });

    //Load section editing
    $body.on('click', '.editSectionBtn', function () {
        endTours();
        loadSectionEdit(this);
    });

    //Load course editing
    $body.on('click', '.editCourseBtn', function () {
        endTours();
        loadCourseEdit(this);
    });

    //Save edited form
    $body.on('click', '.saveEditForm', function () {
        endTours();
        saveEditForm();
    });

    //Save edited department
    $body.on('click', '.saveEditDepartment', function () {
        endTours();
        saveEditDepartment();
    });

    //Save edited section
    $body.on('click', '.saveEditSection', function () {
        endTours();
        saveEditSection();
    });

    //Save edited course
    $body.on('click', '.saveEditCourse', function () {
        endTours();
        saveEditCourse();
    });

    //Save edited faculty
    $body.on('click', '.saveEditFaculty', function () {
        endTours();
        saveEditFaculty();
    });

    //Save new form
    $body.on('click', '.saveNewForm', function () {
        endTours();
        saveNewForm();
    });

    //Delete a form
    $body.on('click', '.deleteBtn', function () {
        deleteForm(this);
    });

    //Log out
    $body.on('click', '.logoutBtn', function (event) {
        endTours();
        event.preventDefault();
        Cookies.remove('token');
        //Reset the main page to appear as if it was loaded for the first time
        showLoginBtn();
        loadLoadingScreen();
    });

    //Load Faculty page
    $body.on('click', '.facultyAdminBtn', function (event) {
        endTours();
        event.preventDefault();
        loadAdminFaculty();
    });

    //Load Departments page
    $body.on('click', '.departmentsAdminBtn', function (event) {
        endTours();
        event.preventDefault();
        loadAdminDepartments();
    });

    //Load Courses page
    $body.on('click', '.coursesAdminBtn', function (event) {
        endTours();
        event.preventDefault();
        loadAdminCourses();
    });

    //Load Sections page
    $body.on('click', '.sectionsAdminBtn', function (event) {
        endTours();
        event.preventDefault();
        loadAdminSections();
    });

    //Create new faculty
    $body.on('click', '.newFacultyButton', function () {
        endTours();
        loadFacultyCreation();
    });

    //Create new department
    $body.on('click', '.newDepartmentButton', function () {
        endTours();
        loadDepartmentCreation();
    });

    //Create new course
    $body.on('click', '.newCourseButton', function () {
        endTours();
        loadCourseCreation();
    });

    //Create new section
    $body.on('click', '.newSectionButton', function () {
        endTours();
        loadSectionCreation();
    });

    //Cancel Course creation
    $body.on('click', '.cancelNewCourse', function () {
        endTours();
        loadAdminCourses();
    });

    //Cancel analysis creation
    $body.on('click', '.cancelNewAnalysis', function () {
        endTours();
        loadAnalysis();
    });

    //Cancel faculty creation
    $body.on('click', '.cancelNewFaculty', function () {
        endTours();
        loadAdminFaculty();
    });

    //Cancel section creation
    $body.on('click', '.cancelNewSection', function () {
        endTours();
        loadAdminSections();
    });

    //Save new faculty
    $body.on('click', '.saveNewFaculty', function () {
        endTours();
        saveNewFaculty();
    });

    //Save new department
    $body.on('click', '.saveNewDepartment', function () {
        endTours();
        saveNewDepartment();
    });

    //Save new section
    $body.on('click', '.saveNewSection', function () {
        endTours();
        saveNewSection();
    });

    //Save new course
    $body.on('click', '.saveNewCourse', function () {
        endTours();
        saveNewCourse(this);
    });

    //Save new analysis
    $body.on('click', '.saveNewAnalysis', function () {
        endTours();
        saveNewAnalysis();
    });

    //Disable a faculty account
    $body.on('click', '.disableFacultyBtn', function () {
        disableFaculty(this);
    });

    //Enable a faculty account
    $body.on('click', '.enableFacultyBtn', function () {
        enableFaculty(this);
    });

    //Enable a department
    $body.on('click', '.enableDepartmentBtn', function () {
        enableDepartment(this);
    });

    //Disable a department
    $body.on('click', '.disableDepartmentBtn', function () {
        disableDepartment(this);
    });

    //Disable a section
    $body.on('click', '.disableSectionBtn', function () {
        disableSection(this);
    });

    //Enable a section
    $body.on('click', '.enableSectionBtn', function () {
        enableSection(this);
    });

    //Disable a course
    $body.on('click', '.disableCourseBtn', function () {
        disableCourse(this);
    });

    //Enable a course
    $body.on('click', '.enableCourseBtn', function () {
        enableCourse(this);
    });

    //Load list of courses based on selected department for form publishing
    $body.on('click', '.loadCourses', function () {
        endTours();
        loadDepartmentCourses();
    });

    //Load stored grades when creating an analysis based on selected form
    $body.on('click', '.loadStoredGrades', function () {
        endTours();
        loadStoredGrades();
    });

    //Publish a form
    $body.on('click', '.publishForm', function () {
        endTours();
        publishForm();
    });

    //Copy a form
    $body.on('click', '.copyFormButton', function () {
        copyForm(this);
    });

    //Start data input for a form
    $body.on('click', '.inputData', function () {
        endTours();
        loadDataInput(this, singleGradeItem);
    });

    //Add an empty single grade item when entering grades one by one
    $body.on('click', '.addGradeItem ', function () {
        addSingleGradeItem(singleGradeItem);
    });

    //Remove a single grade item when entering grades one by one
    $body.on('click', '.removeGradeItem ', function () {
        removeGradeItem(this);
    });

    //Parse pasted grades into single grade items
    $body.on('click', '.parseGrades ', function () {
        parseGrades(singleGradeItem);
    });

    //Submit grades
    $body.on('click', '.saveGrades ', function () {
        endTours();
        saveGrades();
    });

    //Download all data connected to a form
    $body.on('click', '.downloadBtn ', function () {
        downloadAllData(this);
    });

    //Download a specific analysis data
    $body.on('click', '.downloadAnalysisBtn ', function () {
        downloadAnalysis(this);
    });

    //-------------------------------------------------------------SHEPHERD EVENTS-------------------------------------------------
    //Load help on Grade Data Entry page
    $body.on('click', '#professor-help ', function () {
        endTours();
        professorHelp();
    });

    //Load help on grade entry page
    $body.on('click', '#gradeEntry-help ', function () {
        endTours();
        gradeEntryHelp();
    });

    //Load help on analysis page
    $body.on('click', '#analysis-help ', function () {
        endTours();
        analysisHelp();
    });

    //Load help on Forms page
    $body.on('click', '#asscoord-help ', function () {
        endTours();
        formsHelp();
    });

    //Load help on forms creation page
    $body.on('click', '#formCreation-help ', function () {
        endTours();
        formsCreationHelp();
    });

    //Load help on analysis creation page
    $body.on('click', '#analysisCreation-help ', function () {
        endTours();
        analysisCreationHelp();
    });

    //Load help on form editing page
    $body.on('click', '#editForm-help ', function () {
        endTours();
        editFormHelp();
    });

    //Load help on faculty page
    $body.on('click', '#faculty-help ', function () {
        endTours();
        facultyHelp();
    });

    //Load help on faculty creation page
    $body.on('click', '#facultyCreation-help ', function () {
        endTours();
        facultyCreationHelp();
    });

    //Load help on faculty editing page
    $body.on('click', '#facultyEdit-help ', function () {
        endTours();
        editFacultyHelp();
    });

    //Load help on sections page
    $body.on('click', '#section-help ', function () {
        endTours();
        sectionHelp();
    });

    //Load help on sections creation page
    $body.on('click', '#sectionCreate-help ', function () {
        endTours();
        sectionCreationHelp();
    });

    //Load help on sections editing page
    $body.on('click', '#sectionEdit-help ', function () {
        endTours();
        editSectionHelp();
    });

    //Load help on courses page
    $body.on('click', '#courses-help ', function () {
        endTours();
        courseHelp();
    });

    //Load help on course creation page
    $body.on('click', '#courseCreation-help ', function () {
        endTours();
        courseCreationHelp();
    });

    //Load help on course edit page
    $body.on('click', '#courseEdit-help ', function () {
        endTours();
        editCourseHelp();
    });

    //Load help on department page
    $body.on('click', '#department-help ', function () {
        endTours();
        departmentHelp();
    });

    //Load help on department creation page
    $body.on('click', '#departmentCreation-help ', function () {
        endTours();
        departmentCreationHelp();
    });

    //Load help on department editing page
    $body.on('click', '#departmentEdit-help ', function () {
        endTours();
        editDepartmentHelp();
    });

    //Load help on password reset page
    $body.on('click', '#passwd-help ', function () {
        endTours();
        passwdHelp();
    });

    //-------------------------------------------------------------------------------------------------------

    $(document).on({
        //Remove spinners from every AJAX call
        ajaxStop: function() { $body.removeClass("loading"); }
    });

    //UNUSED
    //Was meant to allow additional filtering on all pages
    $body.on('click', '.nav-pills>li>a', function (event) {
        event.preventDefault();
        $('.nav-pills>li.active').removeClass('active');
        //adds the active class to the selected tab
        $(this).parent("li").addClass( "active" );

        if(($(this).attr("class")) == "tab-filter-completed"){
            $('.fa-check').parent().parent().show();
            $('.fa-times').parent().parent().hide();
        }else if(($(this).attr("class")) == "tab-filter-uncompleted"){
            $('.fa-check').parent().parent().hide();
            $('.fa-times').parent().parent().show();
        }else{
            $('.fa-times').parent().parent().show();
            $('.fa-check').parent().parent().show();
        }
    });

    //Function used to download a specific analysis data
    function downloadAnalysis(that){
        var id = $(that).parent().find('.hiddenId').html(); //get analysis id

        $.ajax({
            url: "/knuth-sen-dev/main/getRole",
            type: "GET",
            headers: {
                'Authorization':Cookies.get('token')
            },
            success: function (data) {
                if(data.status===0){
                    Cookies.remove('token');
                }
                else if (data.status===1) {
                    var link = "${g.createLink(controller: 'dataDownload', action: 'downloadAnalysisData')}"+"?id=" + id;
                    window.location.replace(link); //initiate download
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                return false;
            }
        });
    }

    //function used to download all data related to a form
    function downloadAllData(that){
        var id = $(that).parent().find('.hiddenId').html();

        $.ajax({
            url: "/knuth-sen-dev/main/getRole",
            type: "GET",
            headers: {
                'Authorization':Cookies.get('token')
            },
            success: function (data) {
                if(data.status===0){
                    Cookies.remove('token');
                }
                else if (data.status===1) {
                    var link = "${g.createLink(controller: 'dataDownload', action: 'downloadAllData')}"+"?id=" + id;
                    window.location.replace(link); //initiate download
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                return false;
            }
        });
    }

</script>
</body>
</html>
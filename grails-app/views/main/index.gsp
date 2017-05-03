<%--
  Created by IntelliJ IDEA.
  User: Ryan
  Date: 2/10/2017
  Time: 11:12 AM
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title></title>
    <meta name="layout" content="main"/>
</head>

<body >
<div id="mainContainer" class="container block-element-container"></div>



<script>
    var singleGradeItem = commentToHtml(function () {<g:render template="singleGradeItem"/>});
    var $body = $('body');
    $('.secondNav').css("visibility", "hidden");

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

    $body.on('click', '.forms', function (event) {
        event.preventDefault();
        endTours();
        loadForms();
    });

    $body.on('click', '.analysis', function (event) {
        event.preventDefault();
        endTours();
        loadAnalysis();
    });

    $body.on('click', '.pView', function (event) {
        event.preventDefault();
        endTours();
        loadProfView();
    });

    $body.on('click', '.admin', function (event) {
        event.preventDefault();
    });

    $body.on('click', '.loginBtn', function (event) {
        event.preventDefault();
    });

    $body.on('click', '.loginBtn', function () {
        loadLogInPage();
    });

    $body.on('click', '.resetpassBtn', function () {
        loadresetPasswordScreen();
    });

    $body.on('click', '.confirmPassword', function () {
        confirmPassword();
    });

    $body.on('click', '.cancelGradeInput', function () {
        endTours();
        loadProfView();
    });

    $body.on('click', '.cancelAttemptLogin', function () {
        location.reload();
    });

    $body.on('click', '.cancelEditForm', function ()
    {
        endTours();
        loadForms();
    });

    $body.on('click', '.cancelNewForm', function () {
        endTours();
        loadForms();
    });

    $body.on('click', '.cancelNewDepartment', function () {
        endTours();
        loadAdminDepartments();
    });

    $body.on('click', '.publishBtn', function () {
        endTours();
        $('.modal-body').empty();
        loadFormPublishing(this);
    });

    $body.on('click', '.unpublishButton', function () {
        unpublishForm(this);
    });

    $body.on('click', '.newFormButton', function () {
        endTours();
        loadFormCreation();
    });

    $body.on('click', '.newAnalysisButton', function () {
        endTours();
        loadAnalysisCreation();
    });

    $body.on('click', '.attemptLogin', function () {
        attemptLogin();
    });

    $body.on('click', '.editBtn', function () {
        endTours();
        loadFormEdit(this);
    });

    $body.on('click', '.editFacultyBtn', function () {
        endTours();
        loadFacultyEdit(this);
    });

    $body.on('click', '.editDepartmentBtn', function () {
        endTours();
        loadDepartmentEdit(this);
    });

    $body.on('click', '.editSectionBtn', function () {
        endTours();
        loadSectionEdit(this);
    });

    $body.on('click', '.editCourseBtn', function () {
        endTours();
        loadCourseEdit(this);
    });

    $body.on('click', '.saveEditForm', function () {
        endTours();
        saveEditForm();
    });

    $body.on('click', '.saveEditDepartment', function () {
        endTours();
        saveEditDepartment();
    });

    $body.on('click', '.saveEditSection', function () {
        endTours();
        saveEditSection();
    });

    $body.on('click', '.saveEditCourse', function () {
        endTours();
        saveEditCourse();
    });

    $body.on('click', '.saveEditFaculty', function () {
        endTours();
        saveEditFaculty();
    });

    $body.on('click', '.saveNewForm', function () {
        endTours();
        saveNewForm();
    });

    $body.on('click', '.deleteBtn', function () {
        deleteForm(this);
    });

    $body.on('click', '.logoutBtn', function (event) {
        endTours();
        event.preventDefault();
        Cookies.remove('token');
        showLoginBtn();
        loadLoadingScreen();
    });

    $body.on('click', '.facultyAdminBtn', function (event) {
        endTours();
        event.preventDefault();
        loadAdminFaculty();
    });

    $body.on('click', '.departmentsAdminBtn', function (event) {
        endTours();
        event.preventDefault();
        loadAdminDepartments();
    });

    $body.on('click', '.coursesAdminBtn', function (event) {
        endTours();
        event.preventDefault();
        loadAdminCourses();
    });

    $body.on('click', '.sectionsAdminBtn', function (event) {
        endTours();
        event.preventDefault();
        loadAdminSections();
    });

    $body.on('click', '.newFacultyButton', function () {
        endTours();
        loadFacultyCreation();
    });

    $body.on('click', '.newDepartmentButton', function () {
        endTours();
        loadDepartmentCreation();
    });

    $body.on('click', '.newCourseButton', function () {
        endTours();
        loadCourseCreation();
    });

    $body.on('click', '.newSectionButton', function () {
        endTours();
        loadSectionCreation();
    });

    $body.on('click', '.cancelNewCourse', function () {
        endTours();
        loadAdminCourses();
    });

    $body.on('click', '.cancelNewAnalysis', function () {
        endTours();
        loadAnalysis();
    });

    $body.on('click', '.cancelNewFaculty', function () {
        endTours();
        loadAdminFaculty();
    });

    $body.on('click', '.cancelNewSection', function () {
        endTours();
        loadAdminSections();
    });

    $body.on('click', '.saveNewFaculty', function () {
        endTours();
        saveNewFaculty();
    });

    $body.on('click', '.saveNewDepartment', function () {
        endTours();
        saveNewDepartment();
    });

    $body.on('click', '.saveNewSection', function () {
        endTours();
        saveNewSection();
    });

    $body.on('click', '.saveNewCourse', function () {
        endTours();
        saveNewCourse(this);
    });

    $body.on('click', '.saveNewAnalysis', function () {
        endTours();
        saveNewAnalysis();
    });

    $body.on('click', '.disableFacultyBtn', function () {
        disableFaculty(this);
    });

    $body.on('click', '.enableFacultyBtn', function () {
        enableFaculty(this);
    });

    $body.on('click', '.enableDepartmentBtn', function () {
        enableDepartment(this);
    });

    $body.on('click', '.disableDepartmentBtn', function () {
        disableDepartment(this);
    });

    $body.on('click', '.disableSectionBtn', function () {
        disableSection(this);
    });

    $body.on('click', '.enableSectionBtn', function () {
        enableSection(this);
    });

    $body.on('click', '.disableCourseBtn', function () {
        disableCourse(this);
    });

    $body.on('click', '.enableCourseBtn', function () {
        enableCourse(this);
    });

    $body.on('click', '.loadCourses', function () {
        endTours();
        loadDepartmentCourses();
    });

    $body.on('click', '.loadStoredGrades', function () {
        endTours();
        loadStoredGrades();
    });

    $body.on('click', '.publishForm', function () {
        endTours();
        publishForm();
    });

    $body.on('click', '.copyFormButton', function () {
        copyForm(this);
    });

    $body.on('click', '.inputData', function () {
        endTours();
        loadDataInput(this, singleGradeItem);
    });

    $body.on('click', '.addGradeItem ', function () {
        addSingleGradeItem(singleGradeItem);
    });

    $body.on('click', '.removeGradeItem ', function () {
        removeGradeItem(this);
    });

    $body.on('click', '.parseGrades ', function () {
        parseGrades(singleGradeItem);
    });

    $body.on('click', '.saveGrades ', function () {
        endTours();
        saveGrades();
    });

    $body.on('click', '.downloadBtn ', function () {
        downloadAllData(this);
    });

    $body.on('click', '.downloadAnalysisBtn ', function () {
        downloadAnalysis(this);
    });

    $body.on('click', '#professor-help ', function () {
        endTours();
        professorHelp();
    });

    $body.on('click', '#gradeEntry-help ', function () {
        endTours();
        gradeEntryHelp();
    });

    $body.on('click', '#analysis-help ', function () {
        endTours();
        analysisHelp();
    });

    $body.on('click', '#asscoord-help ', function () {
        endTours();
        formsHelp();
    });

    $body.on('click', '#formCreation-help ', function () {
        endTours();
        formsCreationHelp();
    });

    $body.on('click', '#analysisCreation-help ', function () {
        endTours();
        analysisCreationHelp();
    });

    $body.on('click', '#editForm-help ', function () {
        endTours();
        editFormHelp();
    });

    $body.on('click', '#faculty-help ', function () {
        endTours();
        facultyHelp();
    });

    $body.on('click', '#facultyCreation-help ', function () {
        endTours();
        facultyCreationHelp();
    });

    $body.on('click', '#facultyEdit-help ', function () {
        endTours();
        editFacultyHelp();
    });

    $body.on('click', '#section-help ', function () {
        endTours();
        sectionHelp();
    });

    $body.on('click', '#sectionCreate-help ', function () {
        endTours();
        sectionCreationHelp();
    });

    $body.on('click', '#sectionEdit-help ', function () {
        endTours();
        editSectionHelp();
    });

    $body.on('click', '#courses-help ', function () {
        endTours();
        courseHelp();
    });

    $body.on('click', '#courseCreation-help ', function () {
        endTours();
        courseCreationHelp();
    });

    $body.on('click', '#courseEdit-help ', function () {
        endTours();
        editCourseHelp();
    });

    $body.on('click', '#department-help ', function () {
        endTours();
        departmentHelp();
    });

    $body.on('click', '#departmentCreation-help ', function () {
        endTours();
        departmentCreationHelp();
    });

    $body.on('click', '#departmentEdit-help ', function () {
        endTours();
        editDepartmentHelp();
    });

    $body.on('click', '#passwd-help ', function () {
        endTours();
        passwdHelp();
    });

    $(document).on({
//        ajaxStart: function() { $body.addClass("loading");    },
        ajaxStop: function() { $body.removeClass("loading"); }
    });

    $body.on('click', '.nav-pills>li>a', function (event) {
        event.preventDefault();
        console.log("hey nav-pill clicked");
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

    function downloadAnalysis(that){
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
                    var link = "${g.createLink(controller: 'dataDownload', action: 'downloadAnalysisData')}"+"?id=" + id;
                    window.location.replace(link);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                return false;
            }
        });
    }

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
                    window.location.replace(link);
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
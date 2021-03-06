/**
 * Created by Antonio Sutalo
 * Contributions by Ivan Ostojic, Matija Gjurin, Michael Hanson, Ryan Mason, Ryan Snow
 * CAS was developed by Team Knuth
 *
 * This file contains calls to all essential functions of The CAS
 * If there is an issue with functionality or a feature to be added it can be done here
 */

//Show login button and remove all navigation
function showLoginBtn(){
    Cookies.remove('token');
    $('.navbar-header').css("visibility", "");
    $('.userLocation').html("USERNAME");
    $('.userLocation').css("display", "none");
    $('.hideMe').css("display", "");

    //hides admin nav maintains height
    $('.secondNav li a ').css("display", "none");
    $('.secondNav').css("height", "36px");
}

/**
 * Reloads the session to display a login prompt
 */
function loadExpiredSession(){
    showLoadingSpinner();
    $('#mainContainer').empty();
    $.ajax({
        url: "/knuth-sen-dev/main/loadExpiredSession",
        success: function (data) {
            $('#mainContainer').append(data);
            showLoginBtn();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Displays the login page
 */
function loadLogInPage(){
    showLoadingSpinner();
    $('#mainContainer').empty();

    $('.secondNav').css("visibility", "hidden");
    Cookies.remove('token');

    $.ajax({
        url: "/knuth-sen-dev/main/loadLogIn",
        success: function (data) {
            $('#mainContainer').append(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Displays the reset password screen
 */
function loadresetPasswordScreen(){
    $('#mainContainer').empty();
    showLoadingSpinner();
    $.ajax({
        url: "/knuth-sen-dev/main/resetPasswordScreen",
        headers: {
            'Authorization':Cookies.get('token')
        },
        success: function (data) {
            $('#mainContainer').append(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Confirms the change of the users password
 */
function confirmPassword(){
    var oldpassword = $('.oldpasswordInput').val();
    var newpassword = $('.newpasswordInput').val();
    var confirmpassword = $('.confirmnewpasswordInput').val();

    if( oldpassword == "" || newpassword == "" || confirmpassword == ""){
        $.growl.warning({ message: "Please input all data" });
    }
    else {
        showLoadingSpinner();
        $.ajax({
            url: "/knuth-sen-dev/main/resetPassword",
            headers: {
                'Authorization': Cookies.get('token')
            },
            type: "POST",
            data: {
                oldpassword: oldpassword,
                newpassword: newpassword,
                confirmpassword: confirmpassword
            },
            success: function (data) {
                console.log(data)
                if(data.status===5){
                    loadExpiredSession();
                }
                else if(data.status===2){
                    $.growl.warning({ message: "Wrong old password" });
                }
                else if(data.status===3){
                    $.growl.warning({ message: "New password missmatch" });
                }
                else if(data.status===4){
                    $.growl.warning({ message: "Password reset failed" });
                }
                else if(data.status===1){
                    $.growl.notice({ message: "Password changed" });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                $.growl.warning({ message: "Password reset failed" });
                loadresetPasswordScreen()
            }
        });
    }
}

/**
 * Deletes a form entry from the database
 */
function deleteForm(that){
    var id = $(that).parent().find('.hiddenId').html();
    var table = $('.formsDisplayTable').DataTable();
    $.ajax({
        url: "/knuth-sen-dev/main/deleteForm",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id
        },
        success: function (data) {
            if(data.status===5){
                loadExpiredSession();
            }
            else if(data.status===2){
                $.growl.error({ message: "Assessment form has data connected to it and cannot be deleted" });
            }
            else{
                table.row($(nthParent(that,1))).remove();
                $(nthParent(that,1)).tooltip('destroy');
                $(nthParent(that,1)).remove();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadForms();
        }
    });
}

/**
 * Writes the data pertaining to a form to the database
 */
function saveNewForm(){
    var title = $('.titleInput').val();
    var question = $('.questionInput').val();
    var description = $('.descriptionTextArea').val();
    var automationDate = $('#automationDate').val();

    title = cleanData(title);
    question = cleanData(question);
    description = cleanData(description);

    if(title == "" || question == "" || description == ""){
        $.growl.warning({ message: "Please input all data" });
    }
    else {
        $.ajax({
            url: "/knuth-sen-dev/main/saveNewForm",
            headers: {
                'Authorization': Cookies.get('token')
            },
            type: "POST",
            data: {
                title: title,
                question: question,
                description: description,
                automationDate:automationDate
            },
            success: function (data) {
                if (data.status === 2) {
                    $.growl.warning({message: "Assessment form with that title already exists"});
                }
                else if (data.status === 5) {
                    loadExpiredSession();
                }
                else {
                    loadForms();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                loadForms();
            }
        });
    }
}

/**
 * Writes the data to the database on the corresponding entry
 */
function saveEditForm(){
    var title = $('.titleInput').val();
    var question = $('.questionInput').val();
    var description = $('.descriptionTextArea').val();
    var automationDate = $('#automationDate').val();

    title = cleanData(title);
    question = cleanData(question);
    description = cleanData(description);

    if(title == "" || question == "" || description == ""){
        $.growl.warning({ message: "Please input all data" });
    }
    else {
        var id = $('.card-block').find('.hiddenId').html();
        $.ajax({
            url: "/knuth-sen-dev/main/saveEditForm",
            headers: {
                'Authorization': Cookies.get('token')
            },
            type: "POST",
            data: {
                title: title,
                question: question,
                description: description,
                id: id,
                automationDate:automationDate
            },
            success: function (data) {
                if (data.status === 2) {
                    $.growl.warning({message: "Assessment form with that title already exists"});
                }
                else if (data.status === 5) {
                    loadExpiredSession();
                }
                else {
                    loadForms();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                loadForms();
            }
        });
    }
}

/**
 * Writes the data to the database on the corresponding entry
 */
function saveEditCourse(){
    var name = null;
    var faculty = null;
    var department = null;
    var description = null;

    faculty = document.getElementById('option_box').value;
    department = document.getElementById('option_boxBelongsTo').value;
    name = $('.courseNameInput').val();
    description = $('.descriptionTextArea').val();

    name = cleanData(name);
    description = cleanData(description);

    if(faculty == "" || department == "" || name == "" || description == ""){
        $.growl.warning({ message: "Please input all data" });
    }
    else {
        var id = $('.card-block').find('.hiddenId').html();

        $.ajax({
            url: "/knuth-sen-dev/main/saveEditCourse",
            headers: {
                'Authorization': Cookies.get('token')
            },
            type: "POST",
            data: {
                name: name,
                faculty: faculty,
                department: department,
                description: description,
                id: id
            },
            success: function (data) {
                if (data.status === 2) {
                    $.growl.warning({message: "Course with that name already exists"});
                }
                else if (data.status === 5) {
                    loadExpiredSession();
                }
                else if (data.status === 3) {
                    $.growl.warning({message: "Invalid Course Coordinator selected"});
                }
                else if (data.status === 4) {
                    $.growl.warning({message: "Invalid department selected"});
                }
                else {
                    loadAdminCourses();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                loadAdminCourses();
            }
        });
    }
}

/**
 * Writes the data to the database on the corresponding entry
 */
function saveEditDepartment(){
    var name = null;
    var faculty = null;

    faculty = document.getElementById('option_box').value;
    name = $('.departmentNameInput').val();

    name = cleanData(name);

    if(faculty == "" || name == ""){
        $.growl.warning({ message: "Please input all data" });
    }
    else {
        var id = $('.card-block').find('.hiddenId').html();

        $.ajax({
            url: "/knuth-sen-dev/main/saveEditDepartment",
            headers: {
                'Authorization': Cookies.get('token')
            },
            type: "POST",
            data: {
                name: name,
                faculty: faculty,
                id: id
            },
            success: function (data) {
                if (data.status === 2) {
                    $.growl.warning({message: "Department with that name already exists"});
                }
                else if (data.status === 5) {
                    loadExpiredSession();
                }
                else if (data.status === 3) {
                    $.growl.warning({message: "Invalid Department Coordinator selected"});
                }
                else {
                    loadAdminDepartments();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                loadAdminDepartments();
            }
        });
    }
}

/**
 * Writes the data to the database on the corresponding entry
 */
function saveEditSection(){
    var title = null;
    var faculty = null;
    var course = null;

    course = document.getElementById('option_boxBelongsTo').value;
    faculty = document.getElementById('option_box').value;
    title = $('.sectionTitleInput').val();
    title = cleanData(title);

    if(faculty == "" || course == "" || title == ""){
        $.growl.warning({ message: "Please input all data" });
    }
    else {
        var id = $('.card-block').find('.hiddenId').html();

        $.ajax({
            url: "/knuth-sen-dev/main/saveEditSection",
            headers: {
                'Authorization': Cookies.get('token')
            },
            type: "POST",
            data: {
                title: title,
                faculty: faculty,
                course: course,
                id: id
            },
            success: function (data) {
                if (data.status === 2) {
                    $.growl.warning({message: "Section with that title already exists"});
                }
                else if (data.status === 5) {
                    loadExpiredSession();
                }
                else if (data.status === 3) {
                    $.growl.warning({message: "Invalid Professor selected"})
                }
                else if (data.status === 4) {
                    $.growl.warning({message: "Invalid Course selected"})
                }
                else {
                    loadAdminSections();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                loadAdminSections();
            }
        });
    }
}

/**
 * Writes the data to the database on the corresponding entry
 */
function saveEditFaculty(){
    var fName = null;
    var mName = null;
    var lName = null;
    var username = null;
    var email = null;

    var role = null;

    role = document.getElementById('option_box').value;
    fName = $('.firstNameInput').val();
    mName = $('.middleNameInput').val();
    lName = $('.lastNameInput').val();
    username = $('.usernameInput').val();
    email = $('.emailInput').val();

    fName = cleanData(fName);
    mName = cleanData(mName);
    lName = cleanData(lName);
    username = cleanData(username);
    email = cleanData(email);

    if(role == "" || fName == "" || lName == "" || username == "" || email == ""){
        $.growl.warning({ message: "Please input all data" });
        console.log(role)
    }
    else {
        var id = $('.card-block').find('.hiddenId').html();

        $.ajax({
            url: "/knuth-sen-dev/main/saveEditFaculty",
            headers: {
                'Authorization': Cookies.get('token')
            },
            type: "POST",
            data: {
                fName: fName,
                mName: mName,
                lName: lName,
                username: username,
                email: email,
                role: role,
                id: id
            },
            success: function (data) {
                if (data.status === 2) {
                    $.growl.warning({message: "Faculty member with that username already exists"});
                }
                else if (data.status === 5) {
                    loadExpiredSession();
                }
                else if (data.status === 3) {
                    $.growl.warning({message: "Invalid role selected"});
                }
                else if (data.status === 4) {
                    $.growl.warning({message: "Faculty member with that email already exists"});
                }
                else {
                    loadAdminFaculty();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                loadAdminFaculty();
            }
        });
    }
}

/**
 * Displays the form edit page and populates it with current data
 */
function loadFormEdit(that){
    $('#mainContainer').empty();

    var id = $(that).parent().find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/loadFormEdit",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id
        },
        success: function (data) {
            $('#mainContainer').append(data);
            if(document.getElementsByTagName("h2")[0].innerHTML==="Session Expired"){
                showLoginBtn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadForms();
        }
    });
}

/**
 * Displays the course edit page and populates it with current data
 */
function loadCourseEdit(that){
    $('#mainContainer').empty();

    var id = $(that).parent().find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/loadCourseEdit",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id
        },
        success: function (data) {
            $('#mainContainer').append(data);
            if(document.getElementsByTagName("h2")[0].innerHTML==="Session Expired"){
                showLoginBtn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadAdminCourses();
        }
    });
}


/**
 * Displays the department edit page and populates it with current data
 */
function loadDepartmentEdit(that){
    $('#mainContainer').empty();

    var id = $(that).parent().find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/loadDepartmentEdit",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id
        },
        success: function (data) {
            $('#mainContainer').append(data);
            if(document.getElementsByTagName("h2")[0].innerHTML==="Session Expired"){
                showLoginBtn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadAdminDepartments();
        }
    });
}

/**
 * Displays the section edit page and populates it with current data
 */
function loadSectionEdit(that){
    $('#mainContainer').empty();

    var id = $(that).parent().find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/loadSectionEdit",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id
        },
        success: function (data) {
            $('#mainContainer').append(data);
            if(document.getElementsByTagName("h2")[0].innerHTML==="Session Expired"){
                showLoginBtn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadAdminSections();
        }
    });
}

/**
 * Displays the faculty edit page and populates it with current data
 */
function loadFacultyEdit(that){
    $('#mainContainer').empty();

    var id = $(that).parent().find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/loadFacultyEdit",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id
        },
        success: function (data) {
            $('#mainContainer').append(data);
            if(document.getElementsByTagName("h2")[0].innerHTML==="Session Expired"){
                showLoginBtn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadAdminFaculty();
        }
    });
}

/**
 * @param that - the course-section
 */
function disableSection(that){
    var id = $(that).parent().find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/disableSection",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id
        },
        success: function (data) {
            if(data.status===5){
                loadExpiredSession();
            }
            else{
                $(nthParent(that,1)).children().eq(1).children().removeClass("fa-check");
                $(nthParent(that,1)).children().eq(1).children().addClass("fa-times");
                $(nthParent(that,1)).children().eq(1).children().css("color", "red");
                $(that).removeClass("fa-toggle-on");
                $(that).addClass("fa-toggle-off");
                $(that).removeClass("disableSectionBtn");
                $(that).addClass("enableSectionBtn ");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadAdminSections();
        }
    });
}

/**
 * @param that - the course
 */
function enableCourse(that){
    var id = $(that).parent().find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/enableCourse",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id
        },
        success: function (data) {
            if(data.status===5){
                loadExpiredSession();
            }
            else{
                $(nthParent(that,1)).children().eq(1).children().removeClass("fa-times");
                $(nthParent(that,1)).children().eq(1).children().addClass("fa-check");
                $(nthParent(that,1)).children().eq(1).children().css("color", "green");
                $(that).removeClass("fa-toggle-off");
                $(that).addClass("fa-toggle-on");
                $(that).removeClass("enableCourseBtn");
                $(that).addClass("disableCourseBtn ");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadAdminCourses();
        }
    });
}

/**
 * @param that - the course
 */
function disableCourse(that){
    var id = $(that).parent().find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/disableCourse",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id
        },
        success: function (data) {
            if(data.status===5){
                loadExpiredSession();
            }
            else{
                $(nthParent(that,1)).children().eq(1).children().removeClass("fa-check");
                $(nthParent(that,1)).children().eq(1).children().addClass("fa-times");
                $(nthParent(that,1)).children().eq(1).children().css("color", "red");
                $(that).removeClass("fa-toggle-on");
                $(that).addClass("fa-toggle-off");
                $(that).removeClass("disableCourseBtn");
                $(that).addClass("enableCourseBtn ");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadAdminCourses();
        }
    });
}

/**
 * @param that - the course-section
 */
function enableSection(that){
    var id = $(that).parent().find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/enableSection",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id
        },
        success: function (data) {
            if(data.status===5){
                loadExpiredSession();
            }
            else{
                $(nthParent(that,1)).children().eq(1).children().removeClass("fa-times");
                $(nthParent(that,1)).children().eq(1).children().addClass("fa-check");
                $(nthParent(that,1)).children().eq(1).children().css("color", "green");

                $(that).removeClass("fa-toggle-off");
                $(that).addClass("fa-toggle-on");
                $(that).removeClass("enableSectionBtn");
                $(that).addClass("disableSectionBtn ");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadAdminSections();
        }
    });
}

/**
 * @param that - the faculty
 */
function disableFaculty(that){
    var id = $(that).parent().find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/disableFaculty",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id
        },
        success: function (data) {
            if(data.status===5){
                loadExpiredSession();
            }
            else{
                disableStatus(that);
                $(that).removeClass("fa-toggle-on");
                $(that).addClass("fa-toggle-off");
                $(that).removeClass("disableFacultyBtn");
                $(that).addClass("enableFacultyBtn");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadAdminFaculty();
        }
    });
}

/**
 * @param that - the department
 */
function enableDepartment(that){
    var id = $(that).parent().find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/enableDepartment",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id
        },
        success: function (data) {
            if(data.status===5){
                loadExpiredSession();
            }
            else{
                $(nthParent(that,1)).children().eq(1).children().removeClass("fa-times");
                $(nthParent(that,1)).children().eq(1).children().addClass("fa-check");
                $(nthParent(that,1)).children().eq(1).children().css("color", "green");
                $(that).removeClass("fa-toggle-off");
                $(that).addClass("fa-toggle-on");
                $(that).removeClass("enableDepartmentBtn");
                $(that).addClass("disableDepartmentBtn ");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadAdminDepartments();
        }
    });
}

/**
 * @param that - the department
 */
function disableDepartment(that){
    var id = $(that).parent().find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/disableDepartment",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id
        },
        success: function (data) {
            if(data.status===5){
                loadExpiredSession();
            }
            else{
                $(nthParent(that,1)).children().eq(1).children().removeClass("fa-check");
                $(nthParent(that,1)).children().eq(1).children().addClass("fa-times");
                $(nthParent(that,1)).children().eq(1).children().css("color", "red");
                $(that).removeClass("fa-toggle-on");
                $(that).addClass("fa-toggle-off");
                $(that).removeClass("disableDepartmentBtn");
                $(that).addClass("enableDepartmentBtn");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadAdminDepartments();
        }
    });
}

/**
 * @param that - the faculty member
 */
function enableFaculty(that){
    var id = $(that).parent().find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/enableFaculty",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id
        },
        success: function (data) {
            if(data.status===5){
                loadExpiredSession();
            }
            else{
                enableStatus(that);
                $(that).removeClass("fa-toggle-off");
                $(that).addClass("fa-toggle-on");
                $(that).removeClass("enableFacultyBtn");
                $(that).addClass("disableFacultyBtn ");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadAdminFaculty();
        }
    });
}

/**
 * Displays the list of sections for viewing by the admin
 */
function loadAdminSections(){
    $('#mainContainer').empty();

    $.ajax({
        url: "/knuth-sen-dev/main/loadSections",
        headers: {
            'Authorization':Cookies.get('token')
        },
        success: function (data) {
            $('#mainContainer').append(data);

            if($('#mainContainer').find('.formsDisplayTable')){
                if($('.sectionsDisplayTable').length){
                    $('.sectionsDisplayTable').DataTable();
                    // $('[data-toggle="tooltip"]').tooltip();
                }
                else{
                    showLoginBtn();
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Displays the list of courses for viewing by the admin
 */
function loadAdminCourses(){
    $('#mainContainer').empty();
    showLoadingSpinner();
    $.ajax({
        url: "/knuth-sen-dev/main/loadCourses",
        headers: {
            'Authorization':Cookies.get('token')
        },
        success: function (data) {
            $('#mainContainer').append(data);

            if($('#mainContainer').find('.formsDisplayTable')){
                if($('.coursesDisplayTable').length){
                    $('.coursesDisplayTable').DataTable();
                    $('[data-toggle="tooltip"]').tooltip();
                }
                else{
                    showLoginBtn();
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Displays the list of departments for viewing by the admin
 */
function loadAdminDepartments(){
    $('#mainContainer').empty();
    showLoadingSpinner();
    $.ajax({
        url: "/knuth-sen-dev/main/loadDepartment",
        headers: {
            'Authorization':Cookies.get('token')
        },
        success: function (data) {
            $('#mainContainer').append(data);

            if($('#mainContainer').find('.formsDisplayTable')){
                if($('.departmentDisplayTable').length){
                    $('.departmentDisplayTable').DataTable();
                    // $('[data-toggle="tooltip"]').tooltip();
                }
                else{
                    showLoginBtn();
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Displays the list of faculty for viewing by the admin
 */
function loadAdminFaculty(){
    $('#mainContainer').empty();
    showLoadingSpinner();
    $.ajax({
        url: "/knuth-sen-dev/main/loadFaculty",
        headers: {
            'Authorization':Cookies.get('token')
        },
        success: function (data) {
            $('#mainContainer').append(data);

            if($('#mainContainer').find('.formsDisplayTable')){
                if($('.formsDisplayTable').length){
                    $('.formsDisplayTable').DataTable();
                    // $('[data-toggle="tooltip"]').tooltip();
                }
                else{
                    showLoginBtn();
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Displays the section creation page
 */
function loadSectionCreation(){
    $('#mainContainer').empty();
    showLoadingSpinner();
    $.ajax({
        url: "/knuth-sen-dev/main/loadSectionCreation",
        headers: {
            'Authorization':Cookies.get('token')
        },
        success: function (data) {
            $('#mainContainer').append(data);

            if(document.getElementsByTagName("h2")[0].innerHTML==="Session Expired"){
                showLoginBtn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Displays the course creation page
 */
function loadCourseCreation(){
    $('#mainContainer').empty();
    showLoadingSpinner();
    $.ajax({
        url: "/knuth-sen-dev/main/loadCourseCreation",
        headers: {
            'Authorization':Cookies.get('token')
        },
        success: function (data) {
            $('#mainContainer').append(data);

            if(document.getElementsByTagName("h2")[0].innerHTML==="Session Expired"){
                showLoginBtn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Displays the faculty creation page
 */
function loadFacultyCreation(){
    $('#mainContainer').empty();
    showLoadingSpinner();
    $.ajax({
        url: "/knuth-sen-dev/main/loadFacultyCreation",
        headers: {
            'Authorization':Cookies.get('token')
        },
        success: function (data) {
            $('#mainContainer').append(data);

            if(document.getElementsByTagName("h2")[0].innerHTML==="Session Expired"){
                showLoginBtn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Displays the department creation page
 */
function loadDepartmentCreation(){
    $('#mainContainer').empty();
    showLoadingSpinner();
    $.ajax({
        url: "/knuth-sen-dev/main/loadDepartmentCreation",
        headers: {
            'Authorization':Cookies.get('token')
        },
        success: function (data) {
            $('#mainContainer').append(data);

            if(document.getElementsByTagName("h2")[0].innerHTML==="Session Expired"){
                showLoginBtn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Writes data pertaining to an analysis to the database
 */
function saveNewAnalysis() {
    var name = $('.titleInput').val();
    var benchmark =  $('.benchmarkInput').val();

    if(!(Math.floor(benchmark) == benchmark && $.isNumeric(benchmark))){
        $.growl.warning({ message: "The benchmark has to be a round number" });
        return
    }

    var formId = $( "select#formSelect option:checked" ).val();
    var checked = $("input[name='grades']:checked");

    if(checked.length>1){
        $.growl.warning({ message: "Select only one grade list for analysis" });
        return
    }

    var grades = null;
    $.each(checked, function(){
        grades = $(this).val();
    });

    if(grades==null){
        $.growl.warning({ message: "Please enter/select all data" });
        return
    }

    $.ajax({
        url: "/knuth-sen-dev/main/saveNewAnalysis",
        headers: {
            'Authorization': Cookies.get('token')
        },
        type: "POST",
        data: {
            name: name,
            benchmark: benchmark,
            formId: formId,
            grades: grades
        },
        success: function (data) {
            console.log(data)
            if (data.status === 2) {
                $.growl.warning({message: "Analysis with that title already exists"});
            }
            else if (data.status === 5) {
                loadExpiredSession();
            }
            else {
                loadAnalysis();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadAnalysis();
        }
    });
}

/**
 * Writes data pertaining to a course to the database
 */
function saveNewCourse() {
    var name = null;
    var faculty = null;
    var department = null;
    var description = null;

    faculty = document.getElementById('option_box').value;
    department = document.getElementById('option_boxBelongsTo').value;
    name = $('.courseNameInput').val();
    description = $('.descriptionTextArea').val();

    name = cleanData(name);
    description = cleanData(description);

    if(name == "" || faculty == "" || department == "" || description == ""){
        $.growl.warning({ message: "Please input all data" });
    }
    else {
        $.ajax({
            url: "/knuth-sen-dev/main/saveNewCourse",
            headers: {
                'Authorization': Cookies.get('token')
            },
            type: "POST",
            data: {
                faculty: faculty,
                name: name,
                department: department,
                description: description
            },
            success: function (data) {
                if (data.status === 2) {
                    $.growl.warning({message: "Course with that name already exists"});
                }
                else if (data.status === 5) {
                    loadExpiredSession();
                }
                else if (data.status === 4) {
                    $.growl.warning({message: "Invalid Department selected"});
                }
                else if (data.status === 3) {
                    $.growl.warning({message: "Invalid Course Coordinator selected"});
                }
                else {
                    loadAdminCourses();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                loadAdminCourses();
            }
        });
    }
}

/**
 * Writes data pertaining to a course section to the database
 */
function saveNewSection() {
    var title = null;
    var faculty = null;
    var course = null;

    faculty = document.getElementById('option_box').value;
    course = document.getElementById('option_boxBelongsTo').value;
    title = $('.sectionTitleInput').val();

    title = cleanData(title);

    if(title == "" || faculty == "" || course == ""){
        $.growl.warning({ message: "Please input all data" });
    }
    else {
        $.ajax({
            url: "/knuth-sen-dev/main/saveNewSection",
            headers: {
                'Authorization': Cookies.get('token')
            },
            type: "POST",
            data: {
                faculty: faculty,
                title: title,
                course: course
            },
            success: function (data) {
                if (data.status === 2) {
                    $.growl.warning({message: "Section with that title already exists"});
                }
                else if (data.status === 5) {
                    loadExpiredSession();
                }
                else if (data.status === 3) {
                    $.growl.warning({message: "Invalid course selected"});
                }
                else if (data.status === 4) {
                    $.growl.warning({message: "Invalid Professor selected"});
                }
                else {
                    loadAdminSections();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                loadAdminSections();
            }
        });
    }
}

/**
 * Writes data pertaining to a department to the database
 */
function saveNewDepartment() {
    var name = null;
    var faculty = null;

    faculty = document.getElementById('option_box').value;
    name = $('.departmentNameInput').val();

    name = cleanData(name);

    if(name == "" || faculty == ""){
        $.growl.warning({ message: "Please input all data" });
    }
    else {
        $.ajax({
            url: "/knuth-sen-dev/main/saveNewDepartment",
            headers: {
                'Authorization': Cookies.get('token')
            },
            type: "POST",
            data: {
                name: name,
                faculty: faculty,
            },
            success: function (data) {
                if (data.status === 2) {
                    $.growl.warning({message: "Department with that name already exists"});
                }
                else if (data.status === 5) {
                    loadExpiredSession();
                }
                else if (data.status === 3) {
                    $.growl.warning({message: "Invalid Department Coordinator selected"});
                }
                else {
                    loadAdminDepartments();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                loadAdminDepartments();
            }
        });
    }
}

/**
 * Writes data pertaining to faculty to the database
 */
function saveNewFaculty() {
    var fName = null;
    var mName = null;
    var lName = null;
    var username = null;
    var email = null;

    var role = null;

    role = document.getElementById('option_box').value;
    fName = $('.firstNameInput').val();
    mName = $('.middleNameInput').val();
    lName = $('.lastNameInput').val();
    username = $('.usernameInput').val();
    email = $('.emailInput').val();

    fName = cleanData(fName);
    mName = cleanData(mName);
    lName = cleanData(lName);
    username = cleanData(username);
    email = cleanData(email);

    if(role == "" || lName == "" || username == ""  || email == ""){
        $.growl.warning({ message: "Please input all data" });
    }
    else {
        $.ajax({
            url: "/knuth-sen-dev/main/saveNewFaculty",
            headers: {
                'Authorization': Cookies.get('token')
            },
            type: "POST",
            data: {
                fName: fName,
                mName: mName,
                lName: lName,
                username: username,
                email: email,
                role: role
            },
            success: function (data) {
                if (data.status === 2) {
                    $.growl.warning({message: "Faculty with that username already exists"});
                }
                else if (data.status === 5) {
                    loadExpiredSession();
                }
                else if (data.status === 3) {
                    $.growl.warning({message: "Invalid role selected"});
                }
                else if (data.status === 4) {
                    $.growl.warning({message: "Faculty with that email already exists"});
                }
                else {
                    loadAdminFaculty();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                loadAdminFaculty();
            }
        });
    }
}

/**
 * Attempts to perform a login
 */
function attemptLogin(){
    showLoadingSpinner();
    var username = $('.usernameInput').val();
    var password = $('.passwordInput').val();

    $('#mainContainer').empty();
    $.ajax({
        url: "/knuth-sen-dev/main/login",
        type: "POST",
        data:{
            username:username,
            password:password
        },
        success: function (data) {
            if(data.role) {
                Cookies.set('token', data.token, {expires: 1});
                displayOptions(data.role, data.name);
            }
            else{
                $.growl.warning({ message: "Login failed" });
                loadLogInPage()
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
        }
    });
}

/**
 * Displays the form creation page
 */
function loadFormCreation(){
    $('#mainContainer').empty();
    showLoadingSpinner();
    $.ajax({
        url: "/knuth-sen-dev/main/loadFormCreation",
        headers: {
            'Authorization':Cookies.get('token')
        },
        success: function (data) {
            $('#mainContainer').append(data);

            if(document.getElementsByTagName("h2")[0].innerHTML==="Session Expired"){
                showLoginBtn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Displays the analysis creation page
 */
function loadAnalysisCreation(){
    $('#mainContainer').empty();
    showLoadingSpinner();
    $.ajax({
        url: "/knuth-sen-dev/main/loadAnalysisCreation",
        headers: {
            'Authorization':Cookies.get('token')
        },
        success: function (data) {
            $('#mainContainer').append(data);

            if(document.getElementsByTagName("h2")[0].innerHTML==="Session Expired"){
                showLoginBtn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Displays the professor page and retrieves relevant data
 */
function loadProfView(){
    $('#mainContainer').empty();
    showLoadingSpinner();
    $.ajax({
        url: "/knuth-sen-dev/main/loadUserForms",
        headers: {
            'Authorization':Cookies.get('token')
        },
        success: function (data) {
            $('#mainContainer').append(data);

            if($('#mainContainer').find('.formsDisplayTable')){
                if($('.formsDisplayTable').length){
                    $('.formsDisplayTable').DataTable();
                    $('[data-toggle="tooltip"]').tooltip();
                    $('.popover-toggle').popover({
                        html: true,
                        content: function() {
                            return $('#popover-content').html();
                        }
                    });
                }
                else{
                    showLoginBtn();
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Displays the analysis page and retrieves analysis data
 */
function loadAnalysis(){
    showLoadingSpinner();
    $('#mainContainer').empty();

    $.ajax({
        url: "/knuth-sen-dev/main/loadAnalysis",
        headers: {
            'Authorization':Cookies.get('token')
        },
        success: function (data) {
            $('#mainContainer').append(data);

            if($('#mainContainer').find('.formsDisplayTable')){
                if($('.analysisDisplayTable').length){
                    $('.analysisDisplayTable').DataTable();
                }
                else{
                    showLoginBtn();
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Displays the forms page and retrieves all relevant forms
 */
function loadForms(){
    showLoadingSpinner();
    $('#mainContainer').empty();

    $.ajax({
        url: "/knuth-sen-dev/main/loadForms",
        headers: {
            'Authorization':Cookies.get('token')
        },
        success: function (data) {
            $('#mainContainer').append(data);

            if($('#mainContainer').find('.formsDisplayTable')){
                if($('.formsDisplayTable').length){
                    $('.formsDisplayTable').DataTable();
                    $('[data-toggle="tooltip"]').tooltip();
                }
                else{
                    showLoginBtn();
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Displays the loading screen pop-up
 */
function loadLoadingScreen(){
    $('#mainContainer').empty();
    showLoadingSpinner();
    $.ajax({
        url: "/knuth-sen-dev/main/loadingScreen",
        success: function (data) {
            $('#mainContainer').append(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * @param token - the token that is assigned when a user is logged in
 */
function checkLoginStatus(token){
    $.ajax({
        url: "/knuth-sen-dev/main/getRole",
        type: "GET",
        headers: {
            'Authorization':token
        },
        success: function (data) {
            if(data.status===0){
                Cookies.remove('token');
                loadExpiredSession();
            }
            else if (data.status===1) {
                displayOptions(data.role, data.name);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
        }
    });
}

/**
 * @param role - the role associated with the user
 * @param name - the username that was used to log in
 */
function displayOptions(role, name){
    console.log(role)
    console.log(name)
    $('.adminLi').css("display", "none");
    $('.formsLi').css("display", "none");
    $('.analysisLi').css("display", "none");
    $('.pViewLiv').css("display", "none");

    if(role==="Assessment Coordinator"){
         $('.secondNav').css("visibility", "");
        $('.userLocation').html(name);
        $('.userLocation').css("display", "");
        $('.hideMe').css("display", "none");
        $('.secondNav li a ').css("display", "block");

        $('.formsLi').css("display", "");
        $('.analysisLi').css("display", "");
        $('.pViewLiv').css("display", "");

        loadForms();
    }
    else if(role==="Professor"){
        $('.secondNav').css("visibility", "");
        $('.userLocation').html(name);
        $('.userLocation').css("display", "");
        $('.hideMe').css("display", "none");
        $('.secondNav li a ').css("display", "block");

        $('.pViewLiv').css("display", "");

        loadProfView();
    }
    else if(role==="Admin"){
        $('.secondNav').css("visibility", "");
        $('.userLocation').html(name);
        $('.userLocation').css("display", "");
        $('.hideMe').css("display", "none");
        $('.secondNav li a ').css("display", "block");

        $('.adminLi').css("display", "");

        loadAdminFaculty();
    }
    else{
        $.growl.warning({ message: "Unrecognized user" });
        Cookies.remove('token');
        loadLogInPage();
    }
}


/**
 * @param that - the specific form to be published
 */
function loadFormPublishing(that){
    $('.modal-body').empty();
    $('#myModalLabel').html("Publishing Forms");
    showLoadingSpinner();
    var id = $(that).parent().find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/loadFormPublishing",
        type: "POST",
        headers: {
            'Authorization': Cookies.get('token')
        },
        data:{
            id:id
        },
        success: function (data) {
            $('.modal-body').append(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}


/**
 * Retrieves a list of courses for a specific department from the database to populate an option box
 */
function loadDepartmentCourses(){
    var departmentName = document.getElementById('option_boxDepartments').value;

    $('#courseList').empty();
    $.ajax({
        url: "/knuth-sen-dev/main/loadDepartmentCourses",
        type: "POST",
        headers: {
            'Authorization': Cookies.get('token')
        },
        data:{
            departmentName: departmentName
        },
        success: function (data) {
            if(data==="fail"){
                $('#myModal').modal('toggle');
                $.growl.warning({ message: "Invalid Department selected" });
                loadForms();
            }
            else
            {
                $('#courseList').append(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}


/**
 * Retrieves grades from the database for a specific form
 */
function loadStoredGrades(){
    var id = $('#formSelect').val();

    $('#gradesList').empty();
    $.ajax({
        url: "/knuth-sen-dev/main/loadStoredGrades",
        type: "POST",
        headers: {
            'Authorization': Cookies.get('token')
        },
        data:{
            id: id
        },
        success: function (data) {
            $('#gradesList').append(data);
            if($('.storedGradeItemTable').length){
                $('.storedGradeItemTable').DataTable();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
        }
    });
}

/**
 * Initiate form publishing
 */
function publishForm() {
    var id = $('.modal-body').find('.hiddenId').html();
    var courseName = document.getElementById('option_boxCourses').value;

    $.ajax({
        url: "/knuth-sen-dev/main/publishForm",
        type: "POST",
        headers: {
            'Authorization': Cookies.get('token')
        },
        data: {
            courseName: courseName,
            id: id
        },
        success: function (data) {
            if(data.status===5){
                loadExpiredSession();
            }
            else{
                $('#myModal').modal('toggle');
                $.growl.warning({ message: "Invalid course selected" });
                loadForms();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
            loadForms();
        }
    });
}

/**
 * @param that - form that needs to be unpublished
 */
function unpublishForm(that) {
    var id = $(that).parent().find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/unpublishForm",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id
        },
        success: function (data) {
            if(data.status===5){
                loadExpiredSession();
            }
            else{
                //update the icons to reflect that the form was unpublished
                $(nthParent(that,1)).children().eq(2).children().removeClass("fa-check");
                $(nthParent(that,1)).children().eq(2).children().addClass("fa-times");
                $(nthParent(that,1)).children().eq(2).children().css("color", "red");

                $(nthParent(that,0)).find('.fa-download').remove();
                $(nthParent(that,0)).find('.fa-files-o').remove();

                $(nthParent(that,0)).append("<i style='padding-left: 15px' class='fa fa-paper-plane publishBtn fa-2x' aria-hidden='true' data-toggle='modal' data-target='#myModal'></i>");
                $(nthParent(that,0)).append("<i class='fa fa-download downloadBtn fa-2x' aria-hidden='true'></i>");
                $(nthParent(that,0)).append("<i class='fa fa-pencil editBtn fa-2x' aria-hidden='true'></i>");
                $(nthParent(that,0)).append("<i class='fa fa-files-o copyFormButton fa-2x' aria-hidden='true'></i>");
                $(nthParent(that,0)).append("<i class='fa fa-trash-o deleteBtn fa-2x' aria-hidden='true'></i>");

                $(nthParent(that,1)).children().eq(3).html("N/A");
                $(nthParent(that,1)).children().eq(4).html("N/A");
                $(nthParent(that,0)).find('.fa-ban').remove();

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadForms();
        }
    });
}
/**
 * @param that - selected form that will be copied
 */
function copyForm(that){

    $('#mainContainer').empty();
    showLoadingSpinner();
    var id = $(that).parent().find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/copyFormEdit",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id
        },
        success: function (data) {
            $('#mainContainer').append(data); //append received template
            //check session
            if(document.getElementsByTagName("h2")[0].innerHTML==="Session Expired"){
                showLoginBtn();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadForms();
        }
    });
}

/**
 * @param that - selected form for which grades will be entered
 * @param singleGradeItem - a loaded template of a single grade item
 */
function loadDataInput(that, singleGradeItem){
    $('#mainContainer').empty();

    var id = $(that).parent().find('.hiddenId').html();
    var sectionId = $(that).parent().find('.hiddenSectionId').html();
    $.ajax({
        url: "/knuth-sen-dev/main/loadDataInput",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            id:id,
            sectionId:sectionId
        },
        success: function (data) {
            $('#mainContainer').append(data); //append received template

            //check if session has expired
            if(document.getElementsByTagName("h2")[0].innerHTML==="Session Expired"){
                showLoginBtn();
            }
            else{
                dust.renderSource(singleGradeItem, {}, function (err, out) { //add a single grade item to the new template
                    $('#singleGradeItems').append(out);
                });
                $(".removeGradeItem").css("visibility", "hidden");
                $('.gradeItemLabel').last().html( $('.gradeItem').length);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadProfView();
        }
    });
}

/**
 * Saves all entered grades
 */
function saveGrades(){
    var grades = [];
    var x = 0;
    var f = false;

    $('.gradeItem').each(function() {
        if($.isNumeric($(this).val())){ //check if all grade items are numeric
            grades[x] = $(this).val();
            x = x + 1;
        }
        else{
            f = true;
        }
    });

    var json = {array:grades};

    var stringGrades = JSON.stringify(json);

    if(stringGrades == ""){
        $.growl.warning({ message: "Please input data" });
    }
    else if(f){
        $.growl.warning({message: "Grades must be numeric"});
    }
    else {
        var id = $('.hiddenId').html();
        var sectionId = $('.hiddenSectionId').html();

        var gradeRange = $('#gradeThreshold').val();

        $.ajax({
            url: "/knuth-sen-dev/main/saveGradeData",
            headers: {
                'Authorization': Cookies.get('token')
            },
            type: "POST",
            data: {
                id: id,
                grades: stringGrades,
                sectionId:sectionId,
                gradeRange:gradeRange
            },
            success: function (data) {
                if (data.status === 2) {
                    $.growl.warning({message: "Data entry failed"});
                }
                else if (data.status === 5) {
                    loadExpiredSession();
                }
                else {
                    loadProfView();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                loadProfView();
            }
        });
    }
}

/*
 Receives a loaded template of a single grade item
 Splits all pasted grades and initiates the process of displaying them as single grade items
 */
function parseGrades(singleGradeItem){
    var grades = $('.multipleGradeItems').val();
    grades = grades.split(/,|\t|\n|\r|;| /);
    
    addMultipleGradeItems(singleGradeItem, grades);
}

/**
 * @param singleGradeItem - a loaded template of a single grade item
 * @param grades - array of grades that are being parsed
 * Removes all existing single grade items and replaces them with new single grade items which contain parsed grades
 */
function addMultipleGradeItems(singleGradeItem, grades){
    removeAllGradeItems(singleGradeItem);
    $('.gradeItem').first().val(grades[0]);
    for (var i = 1; i < grades.length; i++) {
        addSingleGradeItem(singleGradeItem);
        $('.gradeItem').last().val(grades[i]);
    }
}

/**
 * @param singleGradeItem - a loaded template of a single grade item
 * Remove all single grade items when parsing multiple grades
 * Add new single grade items
 */
function removeAllGradeItems(singleGradeItem){
    $("#singleGradeItems").empty();
    addSingleGradeItem(singleGradeItem);
    $(".removeGradeItem").css("visibility", "hidden");
}

/**
 * @param singleGradeItem - a loaded template of a single grade item
 * Add a single grade item to grade entry
 */
function addSingleGradeItem(singleGradeItem){
    $(".addGradeItem").css("visibility", "hidden");

    dust.renderSource(singleGradeItem, {}, function (err, out) {
        $('#singleGradeItems').append(out);
    });
    $('.gradeItemLabel').last().html($('.gradeItem').length);
}

/**
 * @param that - the clicked grade item
 * Removes it from grade entry
 */
function removeGradeItem(that){
    $(nthParent(that, 1)).remove();

    if($(".addGradeItem").length>1){
        $(".addGradeItem").last().css("visibility", "");
        $(".removeGradeItem").last().css("visibility", "");
    }
    else {
        $(".addGradeItem").last().css("visibility", "");
    }
}

//Function used when loading templates with DUST.js
function commentToHtml(f) { // Multiline javascript string hack for templates
    return f.toString().
    replace(/^[^\/]+\/\*!?/, '').
    replace(/\*\/[^\/]+$/, '');
}

var $body = $('body');
//deprecated function, used to remove a spinner from AJAX calls
function hideLoadingSpinner(){
    // $(".loading").css("display", "none");
    $body.removeClass("loading");;
}

//display a spinner on the page during an AJAX call
function showLoadingSpinner(){
    $body.addClass("loading");;
}

//used to sanitize data
function cleanData(data){
    data = data.trim();
    data = data.replace(/\\"/g, '"');

    return data;
}

//function returns a specified parent of some element
function nthParent(element,n){
    for (var i = 0; i <= n; i++) {
        element = element.parentNode;
    }
    return element;
}

//Update icons once a form is unpublished
function disableStatus(ele){
    $(nthParent(ele,1)).children().eq(6).children().removeClass("fa-check");
    $(nthParent(ele,1)).children().eq(6).children().addClass("fa-times");
    $(nthParent(ele,1)).children().eq(6).children().css("color", "red");

}

//Update icons once a form is published
function enableStatus(ele){
    $(nthParent(ele,1)).children().eq(6).children().removeClass("fa-times");
    $(nthParent(ele,1)).children().eq(6).children().addClass("fa-check");
    $(nthParent(ele,1)).children().eq(6).children().css("color", "green");
}


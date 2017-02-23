/**
 * Created by asuta on 22-Feb-17.
 */
// /knuth-sen-dev/main/login
function showLoginBtn(){
    Cookies.remove('token');
    $('.secondNav').css("visibility", "");
    $('.userLocation').html("USERNAME");
    $('.userLocation').css("display", "none");
    $('.hideMe').css("display", "");
}

function loadExpiredSession(){
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

function loadLogInPage(){
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

function deleteForm(that){
    var id = $(that).parent().find('.hiddenId').html();

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
            else{
                loadForms();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadForms();
        }
    });
}

function saveNewForm(){
    var title = $('.titleInput').val();
    var creationDate = new Date()
    var question = $('.questionInput').val();
    var description = $('.descriptionTextArea').val();

    $.ajax({
        url: "/knuth-sen-dev/main/saveNewForm",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            title:title,
            question:question,
            description:description,
            creationDate:creationDate.getMonth() + 1 + ". " + creationDate.getDate() + ". " + creationDate.getFullYear()+ "."
        },
        success: function (data) {
            if(data.status===2){
                $.growl.warning({ message: "Assessment form with that title already exists" });
            }
            else if(data.status===5){
                loadExpiredSession();
            }
            else{
                loadForms();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadForms();
        }
    });
}

function saveEditForm(){
    var title = $('.titleInput').val();
    var question = $('.questionInput').val();
    var description = $('.descriptionTextArea').val();

    var id = $('.card-block').find('.hiddenId').html();
    $.ajax({
        url: "/knuth-sen-dev/main/saveEditForm",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            title:title,
            question:question,
            description:description,
            id:id
        },
        success: function (data) {
            if(data.status===2){
                $.growl.warning({ message: "Assessment form with that title already exists" });
            }
            else if(data.status===5){
                loadExpiredSession();
            }
            else{
                loadForms();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadForms();
        }
    });
}

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
    var id = $('.card-block').find('.hiddenId').html();

    $.ajax({
        url: "/knuth-sen-dev/main/saveEditFaculty",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            fName:fName,
            mName:mName,
            lName:lName,
            username:username,
            email:email,
            role:role,
            id:id
        },
        success: function (data) {
            if(data.status===2){
                $.growl.warning({ message: "Faculty member with that username already exists" });
            }
            else if(data.status===5){
                loadExpiredSession();
            }
            else{
                loadAdminFaculty();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadForms();
        }
    });
}

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

function loadAdminFaculty(){
    $('#mainContainer').empty();

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

function loadSectionCreation(){
    $('#mainContainer').empty();

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

function loadFacultyCreation(){
    $('#mainContainer').empty();

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

function saveNewSection() {
    var title = null;

    var faculty = null;

    faculty = document.getElementById('option_box').value;
    title = $('.sectiontitleinput').val();

    $.ajax({
        url: "/knuth-sen-dev/main/saveNewSection",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            faculty:faculty,
            title:title
        },
        success: function (data) {
            if(data.status===2){
                $.growl.warning({ message: "Section with that title already exists" });
            }
            else if(data.status===5){
                loadExpiredSession();
            }
            else{
                loadAdminSections();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadForms();
        }
    });
}

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

    $.ajax({
        url: "/knuth-sen-dev/main/saveNewFaculty",
        headers: {
            'Authorization':Cookies.get('token')
        },
        type: "POST",
        data:{
            fName:fName,
            mName:mName,
            lName:lName,
            username:username,
            email:email,
            role: role
        },
        success: function (data) {
            if(data.status===2){
                $.growl.warning({ message: "Faculty with that username already exists" });
            }
            else if(data.status===5){
                loadExpiredSession();
            }
            else{
                loadAdminFaculty();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            loadForms();
        }
    });
}

function attemptLogin(){
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

function loadFormCreation(){
    $('#mainContainer').empty();
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

function loadForms(){
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

function loadLoadingScreen(){
    $('#mainContainer').empty();

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

function displayOptions(role, name){
    if(role==="Wizard"){
        $('.secondNav').css("visibility", "");
        $('.userLocation').html(name);
        $('.userLocation').css("display", "");
        $('.hideMe').css("display", "none");
        loadForms();
    }
    else{
        $.growl.warning({ message: "Unrecognized user" });
        Cookies.remove('token');
        loadLogInPage();
    }
}
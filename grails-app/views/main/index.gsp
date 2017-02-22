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

    <div id="mainContainer" class="container block-element-container">


    </div>

<script>
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

    function checkLoginStatus(token){
        $.ajax({
            url: "${g.createLink(action: 'getRole')}",
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
                    displayOptions(data.role);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            }
        });
    }

    function loadLoadingScreen(){
        $('#mainContainer').empty();

        $.ajax({
            url: "${g.createLink(controller: 'main', action: 'loadingScreen')}",
            success: function (data) {
                $('#mainContainer').append(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
            }
        });
    }

    function loadExpiredSession(){
        $('#mainContainer').empty();

        $.ajax({
            url: "${g.createLink(controller: 'main', action: 'loadExpiredSession')}",
            success: function (data) {
                $('#mainContainer').append(data);
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
            url: "${g.createLink(controller: 'main', action: 'loadLogIn')}",
            success: function (data) {
                $('#mainContainer').append(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
            }
        });
    }

    function loadForms(){
        $('#mainContainer').empty();


        $.ajax({
            url: "${g.createLink(controller: 'main', action: 'loadForms')}",
            headers: {
                'Authorization':Cookies.get('token')
            },
            success: function (data) {
                $('#mainContainer').append(data);

                if($('#mainContainer').find('.formsDisplayTable')){
                    $('.formsDisplayTable').DataTable();
                    $('[data-toggle="tooltip"]').tooltip();

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
            }
        });
    }

    function displayOptions(role){
        if(role==="Wizard"){
            $('.secondNav').css("visibility", "");
        }
        else{
            alert("loginFailed")
        }
    }
        //-----------------------------------------------EVENTS---------------------------------------------------------------

    $body.on('click', '.forms', function (event) {
        event.preventDefault();
        loadForms();
    });

    $body.on('click', '.pView', function (event) {
        event.preventDefault();
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

    $body.on('click', '.cancelAttemptLogin', function () {
        location.reload();
    });

    $body.on('click', '.cancelEditForm', function () {
        loadForms();
    });

    $body.on('click', '.cancelNewForm', function () {
        loadForms();
    });



    $body.on('click', '.publishBtn', function () {

        $.growl.warning({ message: "The kitten is ugly!" });


    });

    $body.on('click', '.newFormButton', function () {
        $('#mainContainer').empty();

        $.ajax({
            url: "${g.createLink(controller: 'main', action: 'loadFormCreation')}",
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
    });

    $body.on('click', '.attemptLogin', function () {
        var username = $('.usernameInput').val();
        var password = $('.passwordInput').val();

        $('#mainContainer').empty();

        $.ajax({
            url: "${g.createLink(action: 'login')}",
            type: "POST",
            data:{
                username:username,
                password:password
            },
            success: function (data) {
                if(data.role) {
                    Cookies.set('token', data.token, {expires: 1});
                    displayOptions(data.role);
                }
                else{
                    loadLogInPage()
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
            }
        });
    });

    $body.on('click', '.editBtn', function () {
        $('#mainContainer').empty();

        var id = $(this).parent().find('.hiddenId').html();

        $.ajax({
            url: "${g.createLink(action: 'loadFormEdit')}",
            headers: {
                'Authorization':Cookies.get('token')
            },
            type: "POST",
            data:{
                id:id
            },
            success: function (data) {
                $('#mainContainer').append(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                loadForms();
            }
        });
    });

    $body.on('click', '.saveEditForm', function () {
        var title = $('.titleInput').val();
        var question = $('.questionInput').val();
        var description = $('.descriptionTextArea').val();

        var id = $('.card-block').find('.hiddenId').html();
        $.ajax({
            url: "${g.createLink(action: 'saveEditForm')}",
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
                    alert("Assessment form with that title already exists")
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
    });

    $body.on('click', '.saveNewForm', function () {

        var title = $('.titleInput').val();
        var creationDate = new Date()
        var question = $('.questionInput').val();
        var description = $('.descriptionTextArea').val();

        $.ajax({
            url: "${g.createLink(action: 'saveNewForm')}",
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
                    alert("Assessment form with that title already exists")
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
    });

    $body.on('click', '.deleteBtn', function () {

        var id = $(this).parent().find('.hiddenId').html();

        $.ajax({
            url: "${g.createLink(action: 'deleteForm')}",
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
    });

    $body = $("body");

    $(document).on({
        ajaxStart: function() { $body.addClass("loading");    },
        ajaxStop: function() { $body.removeClass("loading"); }
    });

</script>
</body>
</html>
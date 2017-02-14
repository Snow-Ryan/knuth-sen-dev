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

        <div class="card text-center flex-item">
            <div class="card-header">
                <h2>Welcome</h2>
            </div>
            <div class="card-block">
                <h4 class="card-title">Hello!</h4>
                <p class="card-text">Please Sign in to access the course assessment tool.</p>
                <a href="#" class="btn btn-primary">Sign in</a>
            </div>
            <div class="card-footer text-muted">
                .
            </div>
        </div>

    </div>

<script>
    var $body = $('body');
    $body.on('click', '.forms', function () {
        loadForms();
    });

    function loadForms(){
        $('#mainContainer').empty();

        $.ajax({
            url: "${g.createLink(controller: 'main', action: 'loadForms')}",
            success: function (data) {
                $('#mainContainer').append(data);
                $('.formsDisplayTable').DataTable();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
            }
        });
    }

    $body.on('click', '.newFormButton', function () {
        $('#mainContainer').empty();

        $.ajax({
            url: "${g.createLink(controller: 'main', action: 'loadFormCreation')}",
            success: function (data) {
                $('#mainContainer').append(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown)
            }
        });
    });

    $body.on('click', '.editBtn', function () {
        $('#mainContainer').empty();

        var id = $(this).parent().find('.hiddenId').html();

        $.ajax({
            url: "${g.createLink(action: 'loadFormEdit')}",
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
        var title;
        var question = $('.questionInput').val();
        var description = $('.descriptionTextArea').val();

        if(!(title = $('.titleInput').val())){
            title = $('.titleInput').attr('placeholder');
        }

        if(!(question = $('.questionInput').val())){
            question = $('.questionInput').attr('placeholder');
        }

        var id = $('.card-block').find('.hiddenId').html();
        $.ajax({
            url: "${g.createLink(action: 'saveEditForm')}",
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

    $body.on('click', '.cancelEditForm', function () {
        loadForms();
    });

    $body.on('click', '.cancelNewForm', function () {
        loadForms();
    });

    $body.on('click', '.saveNewForm', function () {

        var title = $('.titleInput').val();
        var creationDate = new Date()
        var question = $('.questionInput').val();
        var description = $('.descriptionTextArea').val();

        $.ajax({
            url: "${g.createLink(action: 'saveNewForm')}",
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
            type: "POST",
            data:{
                id:id
            },
            success: function (data) {
                loadForms();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('textStatus: ' + textStatus + '  errorThrown: ' + errorThrown);
                loadForms();
            }
        });
    });

</script>
</body>
</html>
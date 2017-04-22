<div class="card text-center flex-item ">
    <div class="card-header">
        <h2 class="prof-all-forms">Available Forms</h2>
        <i class="fa fa-question-circle" aria-hidden="true" style="float: right; margin-top: -20px" id="professor-help"></i>

    </div>
    <div class="card-block">

        <g:if test="${!forms}">
            <div>
                <table class="formsDisplayTable" class="display" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Section</th>
                        <th>Creation Date</th>
                        <th>Publish Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </g:if>
        <g:else>
            <div>
                <table class="formsDisplayTable" class="display" cellspacing="0" width="100%" min>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Course</th>
                        <th>Section</th>
                        <th>Creation Date</th>
                        <th>Publish Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <g:each in="${forms}" var="aForm" status="i">
                        <tr>
                            <td>${aForm.title}</td>
                            <td>${aForm.course.name}</td>
                            <td>${sections[i].title}</td>
                            <td>${aForm.creationDate}</td>
                            <td>${aForm.publishDate}</td>
                            <td>
                                <label class="hiddenId" style="display: none">${aForm.id}</label>
                                <label class="hiddenSectionId" style="display: none">${sections[i].id}</label>
                                <i class="fa fa-keyboard-o inputData fa-2x" aria-hidden="true"></i>

                                <a href="#" idc="tglr" class="popover-toggle" title="Information">
                                    <i  class="glyphicon glyphicon-info-sign" style="color:black; font-size: 20px;"> </i>
                                </a>

                            <div id="popover-content"  style="display: none;">
                                <g:each var="ass" in="${assessmentCoordinators}">
                                    <div  style="width: 200px; text-align: center" >${ass.fname}  ${ass.lname} | <a style="color:black" href="mailto:${ass.email}?Subject=Hello%20again" target="_top">Send Mail</a></div>
                                    <br />
                                </g:each>
                            </div>

                            </td>
                        </tr>
                    </g:each>
                    </tbody>
                </table>
            </div>
        </g:else>
    </div>
    <div class="card-footer text-muted">
        .
    </div>
</div>

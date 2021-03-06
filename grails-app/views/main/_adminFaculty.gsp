%{--
Name: _adminFaculty.gsp
Purpose: Displays a list of all faculty registered within The CAS to the admin
--}%
<div class="card text-center flex-item">
    <div class="card-header">
        <h2>Faculty</h2>
        <i class="fa fa-question-circle" aria-hidden="true" style="float: right; margin-top: -20px" id="faculty-help"></i>
    </div>
    <div class="card-block">
        <g:if test="${!faculty}">
            <div>
                <table class="formsDisplayTable" class="display" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            <br>
            <button type="button" class="newFacultyButton  btn btn-default">New Faculty <span class="glyphicon glyphicon-plus "></span></button>
        </g:if>
        <g:else>
            <div>
                <table class="formsDisplayTable" class="display" cellspacing="0" width="100%" min>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <g:each in="${faculty}">
                        <tr>
                            <td>${it.username}</td>
                            <td>${it.fname}</td>
                            <td>${it.mname}</td>
                            <td>${it.lname}</td>
                            <td>${it.email}</td>
                            <g:if test="${it.role}">
                                <td>${it.role.role}</td>
                            </g:if>
                            <g:else>
                                <td></td>
                            </g:else>

                            <g:if test="${it.active == 0}">
                                <td>
                                    <i class="fa fa-times" aria-hidden="true" style="color: red"></i>
                                </td>
                                <td>
                                    <label class="hiddenId" style="display: none">${it.id}</label>
                                    <i style="padding-left: 15px" class='fa fa-pencil editFacultyBtn fa-2x' aria-hidden='true'></i><i style="padding-left: 15px" class='fa fa-toggle-off enableFacultyBtn fa-2x' aria-hidden='true'></i>
                                </td>
                            </g:if>
                            <g:else>
                                <td>
                                    <i class="fa fa-check" aria-hidden="true" style="color: green"></i>
                                </td>
                                <td>
                                    <label class="hiddenId" style="display: none">${it.id}</label>
                                    <i style="padding-left: 15px" class='fa fa-pencil editFacultyBtn fa-2x' aria-hidden='true'></i><i style="padding-left: 15px" class='fa fa-toggle-on disableFacultyBtn fa-2x' aria-hidden='true'></i>
                                </td>
                            </g:else>
                        </tr>
                    </g:each>
                    </tbody>
                </table>
            </div>
            <br>
            <button type="button" class="newFacultyButton  btn btn-default">New Faculty <span class="glyphicon glyphicon-plus "></span></button>
        </g:else>
    </div>
    <div class="card-footer text-muted">
        .
    </div>
</div>

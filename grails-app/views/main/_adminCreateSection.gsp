%{--<div class="card-wrapper">--}%
%{--<h1>Search</h1>--}%

%{--<label for="default">Pick a Professor</label>--}%
%{--<input type="text" id="default" list="languages" placeholder="e.g. Prof">--}%

%{--<datalist id="languages">--}%
%{--<option value="Prof 1">--}%
%{--<option value="Prof 3">--}%
%{--<option value="Prof Deb">--}%
%{--<option value="Prof Flo">--}%
%{--</datalist>--}%
<g:if test="${faculty.size() == 0}">
    <div class="card text-center flex-item">
        <div class="card-header">
            <h2>Create Sections</h2>
        </div>
        <div class="card-block">
            <p class="card-text">You cannot create new sections if there are is no Faculty to assign to them.</p>
            <button type="button" class="newFacultyButton  btn btn-default">New Faculty <span class="glyphicon glyphicon-plus "></span></button>
        </div>
        <div class="card-footer text-muted">
            .
        </div>
    </div>
</g:if>
<g:else>
    <div class="card text-center flex-item">
        <div class="card-header">
            <h2>Create Sections</h2>
        </div>
        <div class="card-block">
            <div>
                <div class="form-group">
                    <label>Title </label>
                    <input type="text" class="form-control sectionTitleInput" id="formGroupSectionTitleInput" placeholder="Title">
                </div>

                <div class="form-group">
                    <label for="option_box">User Role</label>
                    <input type="text" name = "roleList" id="option_box" list="json-datalist" placeholder="">
                    <datalist id="json-datalist">
                        <g:each in="${faculty}">
                            <option value="${it.username}">${it.fname}+" " + ${it.lname}</option>
                        </g:each>
                    </datalist>
                </div>
                <button class="saveNewSection btn btn-default">Save</button>
                <button class="cancelNewSection btn btn-danger">Cancel</button>
            </div>
        </div>
        <div class="card-footer text-muted">
            .
        </div>
    </div>
</g:else>
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
<g:if test="${roles.size() == 0}">
    <div class="card text-center flex-item">
        <div class="card-header">
            <h2>Create Faculty</h2>
        </div>
        <div class="card-block">
            <p class="card-text">You cannot create new faculty if there are no Roles to assign to them.</p>
            <button type="button" class="newRoleButton  btn btn-default">New Role <span class="glyphicon glyphicon-plus "></span></button>
        </div>
        <div class="card-footer text-muted">
            .
        </div>
    </div>
</g:if>
<g:else>
    <div class="card text-center flex-item">
        <div class="card-header">
            <h2>Create Faculty</h2>
        </div>
        <div class="card-block">
            <div>
                <div class="form-group">
                    <label>First Name </label>
                    <input type="text" class="form-control firstNameInput" id="formGroupFirstNameInput" placeholder="First Name">
                </div>
                <div class="form-group">
                    <label>Middle Name </label>
                    <input type="text" class="form-control middleNameInput" id="formGroupMiddleNameInput" placeholder="Middle Name">
                </div>
                <div class="form-group">
                    <label>Last Name </label>
                    <input type="text" class="form-control lastNameInput" id="formGroupLastNameInput" placeholder="Last Name">
                </div>
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" class="form-control usernameInput" id="formGroupUsernameInput" placeholder="Username">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control emailInput" id="formGroupEmailInput" placeholder="Email">
                </div>
                <div class="form-group">
                    %{--toggle switch location--}%
                </div>
                <div class="form-group">
                    <label for="option_box">User Role</label>
                    <input type="text" name = "roleList" id="option_box" list="json-datalist" placeholder="">
                    <datalist id="json-datalist">
                    <g:each in="${roles}">
                        <option value="${it.role}"></option>
                    </g:each>
                    </datalist>
                </div>
                <button class="saveNewFaculty btn btn-default">Save</button>
                <button class="cancelNewFaculty btn btn-danger">Cancel</button>
            </div>
        </div>
        <div class="card-footer text-muted">
            .
        </div>
    </div>
</g:else>
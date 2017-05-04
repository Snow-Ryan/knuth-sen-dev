%{--
Name: _formEdit.gsp
Purpose: Used to edit a form
--}%
<div class="card text-center flex-item">
    <div class="card-header">
        <h2>Edit Form</h2>
        <i class="fa fa-question-circle" aria-hidden="true" style="float: right; margin-top: -20px" id="editForm-help"></i>
    </div>
    <div class="card-block">
        <label class="hiddenId" style="display: none">${form.id}</label>

        <div>
            <div class="form-group">
                <label for="automationDate">Available From</label>
                <select id="automationDate">
                    <g:if test="${form.automationDate == 1}">
                        <option value="1" selected = selected>January</option>
                    </g:if>
                    <g:else>
                        <option value="1">January</option>
                    </g:else>
                    <g:if test="${form.automationDate == 2}">
                        <option value="2" selected = selected>February</option>
                    </g:if>
                    <g:else>
                        <option value="2">February</option>
                    </g:else>
                    <g:if test="${form.automationDate == 3}">
                        <option value="3" selected = selected>March</option>
                    </g:if>
                    <g:else>
                         <option value="3">March</option>
                    </g:else>
                    <g:if test="${form.automationDate == 4}">
                        <option value="4" selected = selected>April</option>
                    </g:if>
                    <g:else>
                        <option value="4">April</option>
                    </g:else>
                    <g:if test="${form.automationDate == 5}">
                        <option value="5" selected = selected>May</option>
                    </g:if>
                    <g:else>
                        <option value="5">May</option>
                    </g:else>
                    <g:if test="${form.automationDate == 6}">
                        <option value="6" selected = selected>June</option>
                    </g:if>
                    <g:else>
                        <option value="6">June</option>
                    </g:else>
                    <g:if test="${form.automationDate == 7}">
                        <option value="7" selected = selected>July</option>
                    </g:if>
                    <g:else>
                        <option value="7">July</option>
                    </g:else>
                    <g:if test="${form.automationDate == 8}">
                        <option value="8" selected = selected>August</option>
                    </g:if>
                    <g:else>
                        <option value="8">August</option>
                    </g:else>
                    <g:if test="${form.automationDate == 9}">
                        <option value="9" selected = selected>September</option>
                    </g:if>
                    <g:else>
                        <option value="9">September</option>
                    </g:else>
                    <g:if test="${form.automationDate == 10}">
                        <option value="10" selected = selected>October</option>
                    </g:if>
                    <g:else>
                        <option value="10">October</option>
                    </g:else>
                    <g:if test="${form.automationDate == 11}">
                        <option value="11" selected = selected>November</option>
                    </g:if>
                    <g:else>
                        <option value="11">November</option>
                    </g:else>
                    <g:if test="${form.automationDate == 12}">
                        <option value="12" selected = selected>December</option>
                    </g:if>
                    <g:else>
                        <option value="12">December</option>
                    </g:else>

                </select>
            </div>
            <div class="form-group">
                <label>Title </label>
                <input type="text" class="form-control titleInput" id="formGroupExampleInput" value=${form.title}>
            </div>
            <div class="form-group">
                <label>Question </label>
                <input type="text" class="form-control questionInput"  value=${form.question}>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="form-control descriptionTextArea" id="exampleTextarea" rows="3">${form.description}</textarea>
            </div>

            <button class="saveEditForm btn btn-default">Save</button>
            <button class="cancelEditForm btn btn-danger">Cancel</button>
        </div>


    </div>
    <div class="card-footer text-muted">
        .
    </div>
</div>

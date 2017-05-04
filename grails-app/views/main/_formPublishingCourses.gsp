%{--
Name: _formCopy.gsp
Purpose: Used to copy a form
--}%

<g:if test="${courses}">
    <div class="form-group">
        <label for="option_boxCourses">Choose a Course</label>
        <input type="text" name = "departmentList" id="option_boxCourses" list="json-datalistCourses" placeholder="Select a Course">
        <datalist id="json-datalistCourses">
            <g:each in="${courses}">
                <g:if test="${it.active!=0}">
                    <option value="${it.name}"></option>
                </g:if>
            </g:each>
        </datalist>
    </div>
</g:if>
<g:else>
    <div class="form-group">
        <label for="option_boxCourses">This department has no courses, choose another.</label>
    </div>
</g:else>

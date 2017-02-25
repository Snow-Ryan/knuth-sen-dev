<div class="form-group">
    <label for="option_boxCourses">Choose a Course</label>
    <input type="text" name = "departmentList" id="option_boxCourses" list="json-datalistCourses" placeholder="Select a Course">
    <datalist id="json-datalistCourses">
        <g:each in="${courses}">
            <option value="${it.name}"></option>
        </g:each>
    </datalist>
</div>
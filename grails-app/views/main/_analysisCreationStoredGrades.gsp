%{--
Name: _analysisCreationStoredGrades.gsp
Purpose: Displays a list of grades that are stored in a specified assessment form
--}%
<g:if test="${storedGradeItem}">
<div class="form-group">
    <label>Analyze Data For </label>

    <div>
        <table class="storedGradeItemTable" class="display" cellspacing="0" width="100%">
            <thead>
            <tr>
                <th>Select</th>
                <th>Grades For</th>
                <th>Stored By</th>
                <th>Store Date</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="checkbox" name="grades" value="0"></td>
                    <td>All Stored Grades</td>
                    <td>N/A</td>
                    <td>N/A</td>
                </tr>
                <g:each in="${storedGradeItem}">
                    <tr>
                        <td><input type="checkbox" name="grades" value="${it.id}"></td>
                        <td>${it.forSection.title}</td>
                        <td>${it.storedBy.fname} ${it.storedBy.lname}</td>
                        <td>${it.storeDate}</td>
                    </tr>
                </g:each>

            </tbody>
        </table>
    </div>
</div>
</g:if>
<g:else>
    <div class="form-group">
        <label>The selected assessment form does not have any stored grades for it, choose another assessment form.</label>
    </div>
</g:else>
<g:if test="${storedGradeItem}">
<div class="form-group">
    <label>Analyze Data For </label>

    <div>
        <table class="storedGradeItemTable" class="display" cellspacing="0" width="100%">
            <thead>
            <tr>
                <th>Select</th>
                <th>Grades For</th>
                <th>Store Date</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="checkbox" name="all" value="all"></td>
                    <td>All Stored Grades</td>
                    <td>N/A</td>
                </tr>
                <g:each in="${storedGradeItem}">
                    <tr>
                        <td><input type="checkbox" name="${it.id}" value="${it.id}"></td>
                        <td>${it.forSection.title}</td>
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
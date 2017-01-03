<g:if test="${faculty.size() == 0}">
    <h4 style="margin-left: 15px">No faculty found.</h4>
</g:if>
<g:else>
    <select id="facultySelect">
    <g:each in="${faculty}">
        <option value ="${it.username}" >${it.username}</option>
    </g:each>
    </select>
</g:else>
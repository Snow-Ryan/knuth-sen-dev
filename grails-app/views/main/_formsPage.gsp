<g:if test="${forms.size() == 0}">
    <div>
        <table class="formsDisplayTable" class="display" cellspacing="0" width="100%">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Creation Date</th>
                    <th>Published</th>
                    <th>Publish Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
    <br>
    <button class="newFormButton">New Form</button>
</g:if>
<g:else>
    <div>
        <table class="formsDisplayTable" class="display" cellspacing="0" width="100%" min>
            <thead>
            <tr>
                <th>Name</th>
                <th>Creation Date</th>
                <th>Published</th>
                <th>Publish Date</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <g:each in="${forms}">
                <tr>
                    <td>${it.title}</td>
                    <td>${it.creationDate}</td>
                    <td>
                        <g:if test="${it.published == 0}">
                            <i class="fa fa-times" aria-hidden="true" style="color: red"></i>
                        </g:if>
                        <g:else>
                            <i class="fa fa-check" aria-hidden="true" style="color: green"></i>
                        </g:else>
                    </td>
                    <td>${it.publishDate}</td>
                    <td>
                        <label style="display: none">${it.id}</label>
                        <i class='fa fa-pencil editBtn fa-2x' aria-hidden='true'></i><i style="padding-left: 15px" class='fa fa-trash-o deleteBtn fa-2x' aria-hidden='true'></i>
                    </td>
                </tr>
            </g:each>
            </tbody>
        </table>
    </div>
    <br>
    <button class="newFormButton">New Form</button>
</g:else>


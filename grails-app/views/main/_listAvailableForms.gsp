<div class="card text-center flex-item ">
    <div class="card-header">
        <h2>Available Forms</h2>
    </div>
    <div class="card-block">
        <g:if test="${!forms}">
            <div>
                <table class="formsDisplayTable" class="display" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Creation Date</th>
                        <th>Publish Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </g:if>
        <g:else>
            <div>
                <table class="formsDisplayTable" class="display" cellspacing="0" width="100%" min>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Creation Date</th>
                        <th>Publish Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <g:each in="${forms}">
                        <tr>
                            <td>${it.title}</td>
                            <td>${it.creationDate}</td>
                            <td>${it.publishDate}</td>
                            <td>
                                <label class="hiddenId" style="display: none">${it.id}</label>
                                <i class="fa fa-keyboard-o inputData fa-2x" aria-hidden="true"></i>
                            </td>
                        </tr>
                    </g:each>
                    </tbody>
                </table>
            </div>
        </g:else>
    </div>
    <div class="card-footer text-muted">
        .
    </div>
</div>

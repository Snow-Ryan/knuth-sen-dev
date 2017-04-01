<div class="card text-center flex-item ">
    <div class="card-header">
        <h2>Analysis</h2>
    </div>
    <div class="card-block">
        <g:if test="${!analysis}">
            <div>
                <table class="analysisDisplayTable" class="display" cellspacing="0" width="100%">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created By</th>
                        <th>Creation Date</th>
                        <th>Has Comment</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            <br>
            <button type="button" class="newAnalysisButton  btn btn-default">New Analysis <span class="glyphicon glyphicon-plus "></span></button>
        </g:if>
        <g:else>
            <div>
                <table class="analysisDisplayTable" class="display" cellspacing="0" width="100%" min>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created By</th>
                        <th>Creation Date</th>
                        <th>Has Comment</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <g:each in="${analysis}">
                        <tr>
                            <td>${it.name}</td>
                            <td>${it.madeBy.fname} + " " + ${it.madeBy.lname}</td>
                            <td>${it.createdOn}</td>
                            <g:if test="${it.comment}">
                                <label class="hiddenId" style="display: none">${it.id}</label>
                                <td><i class="fa fa-check" aria-hidden="true" style="color: green"></i></td>
                                <td>
                                    <i class="fa fa-download downloadAnalysisBtn fa-2x" aria-hidden="true"></i>
                                </td>
                            </g:if>
                            <g:else>
                                <label class="hiddenId" style="display: none">${it.id}</label>
                                <td><i class="fa fa-times" aria-hidden="true" style="color: red"></i></td>
                                <td>
                                    <i class="fa fa-download downloadAnalysisBtn fa-2x" aria-hidden="true"></i>
                                    <i class="fa fa-commenting-o commentBtn" aria-hidden="true"></i>
                                </td>
                            </g:else>
                        </tr>
                </g:each>
                </tbody>
            </table>

        </div>
        <br>
        <button type="button" class="newAnalysisButton  btn btn-default">New Analysis <span class="glyphicon glyphicon-plus "></span></button>

        </g:else>
    </div>
    <div class="card-footer text-muted">
        .
    </div>
</div>

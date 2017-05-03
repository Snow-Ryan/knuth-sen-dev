<div class="card text-center flex-item ">
    <div class="card-header">
        <h2>Analysis</h2>
        <i class="fa fa-question-circle" aria-hidden="true" style="float: right; margin-top: -20px" id="analysis-help"></i>
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
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <g:each in="${analysis}">
                        <tr>
                            <td>${it.name}</td>
                            <td>${it.madeBy.fname} ${it.madeBy.lname}</td>
                            <td>${it.createdOn}</td>
                            <td>
                                <label class="hiddenId" style="display: none">${it.id}</label>
                                <i class="fa fa-download downloadAnalysisBtn fa-2x" aria-hidden="true"></i>
                            </td>
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

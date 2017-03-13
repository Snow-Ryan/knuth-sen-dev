<label class="hiddenId" style="display: none">${id}</label>
<label class="hiddenSectionId" style="display: none">${sectionId}</label>

<div class="card text-center flex-item">
    <div class="card-header">
        <h2>Enter Grades</h2>
        <h3>${cName} - ${sTitle}</h3>
    </div>
    <div class="card-block">
        <div id="singleGradeItems">

        </div>

        <div class="form-group">
            <label>Multiple grades</label>
            <textarea class="form-control multipleGradeItems" rows="3" placeholder="Paste grades..."></textarea>
        </div>
        <button class="parseGrades btn btn-default">Parse Grades</button>
        <br>
        <br>
        <button class="saveGrades btn btn-default">Save</button>
        <button class="cancelGradeInput btn btn-danger">Cancel</button>
    </div>
    <div class="card-footer text-muted">
        .
    </div>
</div>

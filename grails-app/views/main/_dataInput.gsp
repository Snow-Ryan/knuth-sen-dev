<label class="hiddenId" style="display: none">${id}</label>
<label class="hiddenSectionId" style="display: none">${sectionId}</label>

<div class="card text-center flex-item">
    <div class="card-header">
        <h2>Enter Grades</h2>
    </div>
    <h3>${cName} - ${sTitle}</h3>
    <div class="input-group" style="width:220px; top:-50px; padding:15px;">
        <span class="input-group-addon">Grade Threshold</span>
        <input id="gradeThreshold" type="text" class="form-control" name="gradeThreshold" value="100">
    </div>
    <div class="card-block">

        <div class="panel-group" id="accordion">
            <div class="panel panel-default">

                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapse1" style="color:black; float:none">Multiple grades</a>
                    </h4>
                </div>


                <div id="collapse1" class="panel-collapse collapse in">
                    <div class="panel-body">
                        <div class="form-group">
                            <textarea class="form-control multipleGradeItems" rows="3" placeholder="Paste grades..."></textarea>
                        </div>
                        <a class="parseGrades btn btn-default" data-toggle="collapse" data-parent="#accordion" href="#collapse2">Parse Grades</a>
                    </div>


                </div>


            </div>

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapse2" style="color:black;">Individual grades</a>
                    </h4>
                </div>


                <div id="collapse2" class="panel-collapse collapse">


                    <div class="panel-body">


                        <table class="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th  style="text-align: center;">Grade</th>
                                <th  style="text-align: center;" >Action</th>
                            </tr>
                            </thead>
                            <tbody id="singleGradeItems">

                            </tbody>
                        </table>

                    </div>

                </div>


            </div>
        </div>



        <button class="saveGrades btn btn-default">Save</button>
        <button class="cancelGradeInput btn btn-danger">Cancel</button>



    </div>
    <div class="card-footer text-muted">
        .
    </div>
</div>

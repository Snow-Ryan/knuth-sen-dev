<div class="card text-center flex-item">
    <div class="card-header">
        <h2>Create Form</h2>
    </div>
    <div class="card-block">
        <div>
            <div class="form-group">
                <label for="automationDate">Available From</label>
                <select id="automationDate">
                    <option value="1" selected = selected>January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </div>
            <div class="form-group">
                <label>Title </label>
                <input type="text" class="form-control titleInput" id="formGroupExampleInput" placeholder="Title">
            </div>
            <div class="form-group">
                <label>Question </label>
                <input type="text" class="form-control questionInput"  placeholder="Title">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="form-control descriptionTextArea" id="exampleTextarea" rows="3"></textarea>
            </div>
            <button class="saveNewForm btn btn-default">Save</button>
            <button class="cancelNewForm btn btn-danger">Cancel</button>
        </div>
    </div>
    <div class="card-footer text-muted">
        .
    </div>
</div>

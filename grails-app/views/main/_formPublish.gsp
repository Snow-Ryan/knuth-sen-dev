<div id="mainContainer" class="container block-element-container">

    <div class="card text-center flex-item">
        <div class="card-header">
            <h2>Publish Form</h2>
        </div>
        <div class="card-block">
            <label class="hiddenId" style="display: none">${form.id}</label>

            <div>
                <div class="form-group">
                    <label>Title: ${form.title} </label>
                </div>
                <div class="form-group">
                    <label>Question: ${form.question} </label>
                    <input type="text" class="form-control questionInput"  value=${form.question}>
                </div>
                <div class="form-group">
                    <label>Description:</label>
                    <p>${form.description}</p>
                </div>


                <button class="publishForm btn btn-default">Publish</button>
                <button class="cancelPublishForm btn btn-danger">Cancel</button>
            </div>


        </div>
    </div>

</div>
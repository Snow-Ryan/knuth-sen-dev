%{--
Name: _resetPassword.gsp
Purpose: Used to reset a users password
--}%

<div class="card text-center flex-item">
    <div class="card-header">
        <h2>Reset Password</h2>
        <i class="fa fa-question-circle" aria-hidden="true" style="float: right; margin-top: -20px" id="passwd-help"></i>
    </div>
    <div class="card-block">


        <div>
            <div class="form-group">
                <label>Old Password </label>
                <input type="password" class="form-control oldpasswordInput" name="old_password" id="old_password" placeholder="Type in your old password">
            </div>

            <div class="form-group">
                <label>New password </label>
                <input type="password" class="form-control newpasswordInput" name="new_password" id="new_password" placeholder="Type in your new password">
            </div>

            <div class="form-group">
                <label>Confirm password </label>
                <input type="password" class="form-control confirmnewpasswordInput" name="password_confirmation" id="password_confirmation" placeholder="Confirm your new password">
            </div>

            <button class="confirmPassword btn btn-default">Confirm</button>
            <button class="cancelAttemptLogin btn btn-danger">Cancel</button>
        </div>


    </div>
    <div class="card-footer text-muted">
        .
    </div>
</div>
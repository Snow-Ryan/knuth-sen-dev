    <div>
        <label>Name: ${facultyMember.name}</label> <br>
        <label>tagline: ${facultyMember.tagline}</label> <br>
        <label>title: ${facultyMember.title}</label> <br>
        <label>interestArea: ${facultyMember.interestArea}</label> <br>
        <label>office: ${facultyMember.office}</label> <br>
        <label>phone: ${facultyMember.phone}</label> <br>

        <g:if test="${facultyMember.imagePath}">
            <img src="${facultyMember.imagePath}" alt="faculty member ${facultyMember.username}"> <br>
        </g:if>

        <g:if test="${facultyMember.website}">
            <a href="${facultyMember.website}">${facultyMember.username}' website</a> <br>
        </g:if>

        <g:if test="${facultyMember.email}">
            <a href="mailto:${facultyMember.email}">Mail ${facultyMember.username}</a> <br>
        </g:if>

        <g:if test="${facultyMember.facebook}">
            <a href="www.facebook.com/${facultyMember.facebook}">Visit Facebook account of ${facultyMember.username}</a> <br>
        </g:if>

        <g:if test="${facultyMember.twitter}">
            <a href="www.facebook.com/${facultyMember.twitter}">Visit Twitter account of ${facultyMember.username}</a> <br>
        </g:if>

    </div>
<div class="contentBox col-xs-12 col-md-8 col-md-offset-2">

  <div class="row">
    <div class="col-xs-12 col-md-6">
      <div class="picture-div">
        <img class="profile-picture" src="../img/demo_nurses/nurse_1.jpg">
        <i class="heart glyphicon glyphicon-heart"> </i>

          <div class="spec-cert-info">
            <p>Nursing specialization: to be added</p>
          </div>
        </img>
      </div>
    </div> <!-- End profile picture area -->
    <div class="col-xs-12 col-md-6">
      <div class="user-info">
        <p class="nurse-name">{{profile.name}}</p>
        <br />
        <p>Customizable nurse subheading: to be added</p>
        <p>Nurse verification status: to be added</p>
        <p>Location: {{profile.location}}</p>
        <p>Primary language: {{profile.primaryLang}}</p>
        <p>Secondary language(s): {{profile.secondaryLang}}</p>
        <i class="message glyphicon glyphicon-envelope"> </i>
      </div> <!-- End user info area -->
    </div> <!-- End name/basic info row -->
  </div> <!-- End picture/info row -->

  <div class='row'>
    <div class="col-xs-12 col-md-12">
      <div class="profile-info">
        <p>About me: {{profile.aboutMe}}</p>
        <hr>
        <p>Years of experience: {{profile.yearsExp}}</p>
        <hr>
        <p>Current position: {{profile.positionDesc}}</p>
        <hr>
        <p>Volunteer activities: {{profile.volunteer}}</p>
        <hr>
        <p>Passions: To be added </p>
        <hr>
        <a href="{{profile.linkedinProfile}}">LinkedIn Profile</a>
        <a href="{{profile.facebookProfile}}">Facebook Profile</a>
        <a href="{{profile.twitterProfile}}">Twitter Profile</a>
      </div> <!-- End profile info div -->
    </div> <!-- End profile info row -->
    </div> <!-- End profile info column -->

</div> <!-- End profile column -->

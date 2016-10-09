<!doctype html>
<html ng-app="app">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Profiles - new</title> 
  
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300" rel="stylesheet">

  <link href="css/master.css" rel="stylesheet" type="text/css" />
  <link href="css/dialog_d.css" rel="stylesheet" type="text/css" />

  <script src="js/jquery.min.js"></script>
  <script src="js/bootstrap.min.js"></script>


  <link  href="js/jquery.mobile-1.5.min.css" rel="stylesheet"/>
  <script src="js/jquery.mobile-1.4.5.min.js"></script>
  
  <link  href="js/jquery-ui.profiles.css" rel="stylesheet">
  <script src="js/jquery-ui.min.js"></script>

  <script src="js/angular.js"></script>
  <script src="js/angular-route.js"></script>
  <!-- <script src="js/profiles.js"></script> -->
  <!-- <script src="js/mySQL_connection_php.js"></script> -->
  
  <script src="js/controller.js"></script>
  <script src="js/post.js"></script>
  <script src="js/app.js"></script>


  <script>
    //replace url to show mobile version    
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(      navigator.userAgent) ) {
        // tasks to do if it is a Mobile Device
        //window.location.replace("mobile.html"); 
      }
    </script>

  </head>
  <body>
  <ng-view></ng-view>
    <div data-role="page" id="home" ng-controller="HomeCtrol">
      <div data-role="content">
        <div data-role id="wrapper" >         
          <div id="header">
            <p>Frameworks / tools used:</p>
            <ul>
              <li>Angular.js</li>
              <li>Node.js</li>
              <li>live-server.js</li>
              <li>json.js</li>
              <li>jquery.js</li>
              <li>sass</li>
              <li>illustrator</li>
              <li>photoshop</li>
              <li>html5</li>
              <li>php</li>
              <li>mySQL</li>
              <li>google-fonts</li>
            </ul>
          </div>
          <div class="cards">       
            <form class="form" ng-submit="setSearch(searchStr)">
              <div class="form-item-left">                
                <span class="label">Search for Talent:</span>
                <input type="text" id="searchStr" ng-model="searchStr" name="searchStr"/>
                <button id="submit"><img src="images/search.png"></button>
              </div>
            </form>           
            <h1>PROFILES ({{totalEmployees}})</h1>
            <div data-role id="{{ 'dz_' + $index }}" class="dz" ng-repeat="employee in employees | filter: search" ng-init="set_dg_seq($index)" ng-mouseover="setActiveDroppable($index)">
              <div data-role id="{{ 'dg_' + $index }}" class="main" ng-mousedown="setActiveDraggable($index)">
                <div class="card">
                  <div class="content">
                    <div class="price">${{ employee.price }}/hr</div>
                    <img class="photo" ng-src="images/photo_{{ $index }}.png" ng-click="setActiveEmployee(employee,$index)"/>
                    <div class="name">
                      {{employee.name}}
                    </div>
                    <div class="title">
                      {{employee.title}}                  
                    </div>
                    <div class="title_border"></div>
                    <div class="sub_title sub_title-{{employee.sub_title[1]}}">
                      {{employee.sub_title[0]}}
                    </div>
                    <div class="skills" >
                      <!-- <span ng-repeat="skill in employee.skills | limitTo:3 track by $index" class="skill">{{skill}}</span> -->
                      <span class="skill blue">{{employee.count}}</span>
                    </div>
                    <div class="description">
                      {{employee.description}}
                    </div>
                    <div class="buttons">
                      <button id="{{ 'btn_' + $index }}" class="portfolio" ng-click="setActiveEmployee(employee,$index)">VIEW PROFILE</button><br/>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div data-role id="dialog">
        <div data-role id="dialog_main">
          <div id="dialog_card">
            <div id="dialog_content"> 
              <div id="dialog_top_bar"></div>
              <div id="dialog_price">${{ activeEmployee.price }}/hr</div>
              <img id="dialog_photo" ng-src="images/photo_{{ activeEmployee.id }}.png"/>
              <div id="dialog_name">
                {{ activeEmployee.name }}
              </div>
              <div id="dialog_title">
                {{ activeEmployee.title }}
                <span id="title_border"/>
              </div>
              <div id="dialog_quote">
                {{activeEmployee.quote}}
              </div>
              <div id="dialog_skills" >
                <span class="dialog_skill" ng-repeat="skill in activeEmployee.skills" >{{skill}}</span>
                <span class="dialog_skill dialog_blue">{{activeEmployee.count}}</span>
              </div>
              <div id="dialog_buttons">
                <button id="dialog_portfolio">CONTACT ME</button><br/>
                <img id="dialog_social_bar" src="images/social_bar.png"/>
              </div>
            </div> 
          </div>
        </div>  
      </div>      
    </div>
    


    <script>
      $(document).ready(function(){
        //console.log('document.ready')
      });
    </script>

  </body>
  </html>
//backup url https://randomuser.me/api/?results=12&inc=name,loc,email,dob,phone,picture&noinfo
//REF https://randomuser.me/documentation#format

//JSON data example
/*
    
      "name": {
        "title": "Mr",
        "first": "Salvador",
        "last": "Duran"
      },
      "location": {
        "street": {
          "number": 2821,
          "name": "Calle de Argumosa"
        },
        "city": "Arrecife",
        "state": "Aragón",
        "country": "Spain",
        "postcode": 50864,
        "coordinates": {
          "latitude": "-18.7098",
          "longitude": "-108.4384"
        },
        "timezone": {
          "offset": "0:00",
          "description": "Western Europe Time, London, Lisbon, Casablanca"
        }
      },
      "email": "salvador.duran@example.com",
      "dob": {
        "date": "1978-08-23T04:25:51.108Z",
        "age": 42
      },
      "phone": "913-173-921",
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/3.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/3.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/3.jpg"
      }
    },
*/

//mark the gallery section
$(document).ready(function () {

$.ajax({
    url: 'https://randomuser.me/api/?results=12&inc=name,location,email,dob,phone,picture&noinfo',
    dataType: 'json',
    success: function(users) {
        
        //Bao self-note: user.RESULTS <<<
        console.log(users.results);

        var output = '';
        var idCounter = 0;
        
        $.each(users.results, function(i,user){

            //check each user data
            //console.log(user.location.city);
            
            //Note from Bao : please refer to the modalTest.html for example of 1 card (fixed info)             
           
            
            output += '<div id="card'+idCounter+'" class="card">';
            //output += '<div class="card">';
            
                output += '<div class="card-img-container">';
                    output += '<img class="card-img" src="' + user.picture.large + '"alt="profile picture">';
                output += '</div>';
            
                output += '<div class="card-info-container">';
                    output += '<h3 id="name" class="card-name cap">'+ user.name.first + ' ' + user.name.last + '</h3>';
                    output += '<p class="card-text">' + user.email + '</p>';
                    output += '<p class="card-text cap">'+ user.location.city + ',' + user.location.state + '</p>';
                output += '</div>'
            
            
            output += '</div>'; //End of <div class = card>
           

            
            //Create modal for each Card
            output += '<div id="container'+ idCounter +'" class="modal-container" >'; //<div id="container1" class="modal-container">
                 output += '<div class="modal" >';
                    output += '<button type="button" id="close' +idCounter+'" class="modal-close-btn"><strong>X</strong></button>';
                    output += '<div class="modal-info-container">'
                        output += '<img class="modal-img" src="' + user.picture.large + '"alt="profile picture">';
                        output += '<h3 id="name" class="modal-name cap">'+ user.name.first + ' ' + user.name.last + '</h3>';
                        output += '<p class="modal-text">' + user.email + '</p>';
                        output += '<hr>';
                        output += '<p class="modal-text">' + user.phone + '</p>';
                        output += '<p class="modal-text">' + user.location.street.number + ' ' + user.location.street.name + ', ' + user.location.city + ', ' + user.location.state + '</p>';
                        output += '<p class="modal-text">Birthday : ' + user.dob.date.slice(0,10) + '</p>';
                    output += '</div>';
                output += '</div>';
            
            //End of modal-container for each card   
            output += '</div>';    
            
            
            //Create script for each modal
            output += '<script>';

            output += 'var container'+idCounter+' = document.getElementById("container'+idCounter+'");';
            output += 'var close'+idCounter+' = document.getElementById("close'+idCounter+'");';
            output += 'var card'+idCounter+' = document.getElementById("card'+idCounter+'");';

            output += 'card'+idCounter+'.onclick = function(){ container'+idCounter+'.style.display = "block";};';
            output += 'close'+idCounter+'.onclick = function(){ container'+idCounter+'.style.display = "none";};';

            output += '</script>';



            idCounter++;
            console.log(idCounter);
        });
        
        
      
        //console.log(output);
        
        $("#gallery").html(output); 
      
      //console.log(data);
    }
  });


});

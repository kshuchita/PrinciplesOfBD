var app = angular.module("myApp", [])


app.controller("RegisterController", function ($scope, $http, $httpParamSerializerJQLike) {

    $scope.pageClass = 'register';
    $scope.visible=true;
    $scope.srcc='UpdateUser.html';
$scope.register=function(username,lastname,emailid,reemailid,password) {
    if(angular.equals(emailid,reemailid))
    {
       $scope.checked=true; 
        $scope.msg ="";
        console.log("inside register function");
$http({
    method: 'POST',
    url : 'https://api.mongolab.com/api/1/databases/lab7/collections/users?apiKey=-7Ov9M4e5lWHPyfY0lzFSqhDxN5A_PRX',
    data: JSON.stringify({
                username: username,
                lastname:lastname,
                emailid: emailid,
                password: password,
                
            }),
    contentType: "application/json"
}).success(function() {
    

    $scope.username ="";
    $scope.lastname ="";
    $scope.password ="";
    $scope.emailid ="";
    $scope.reemailid ="";
    
    $scope.checked=false;
    $scope.msg ="User created successfully";
    
        })
    
        

   
}
    else{
        $scope.emailid ="";
        $scope.reemailid ="";
   $scope.checked=false;
    $scope.msg ="Emaild-id doesnot match";}
}

$scope.login = function(username,password) {
   console.log("inside detail function");
   //alert('hie');
    
$http({
    method: 'GET',
    url : 'https://api.mongolab.com/api/1/databases/lab7/collections/users/?apiKey=-7Ov9M4e5lWHPyfY0lzFSqhDxN5A_PRX',
}).success(function(jsonDetails) {
	    
		//alert('hie');
	var obj=angular.fromJson(jsonDetails);
	var count=0;
//alert(obj[0]._id.$oid);
	//alert(angular.equals(a,a));
	for (var i = 0; i < obj.length; i++) {
		
		//alert(obj[i].name);
		//alert(userName);
		if((angular.equals(obj[i].username,username))&&(angular.equals(obj[i].password,password)))
		{
					//alert('hie');
                  $scope.checked=true;
                  $scope.msg="";
                  //alert('login correct');
                  localStorage.setItem("username",obj[i].username);
                 
                  localStorage.setItem("password",obj[i].password);
                  localStorage.setItem("emailid",obj[i].emailid);
                      localStorage.setItem("lastname",obj[i].lastname);
                  localStorage.setItem("id_user",obj[i]._id.$oid);
					window.location.href='homePage.html';
					

		      }

		
		
        else
        {
            count++;
        }
        
		
	//alert(obj[i].name);
}
if(count==obj.length){
    $scope.checked=false;
$scope.msg="UserName / Password is incorrect";}
	
	
	
    /*$scope.userName1 =obj.name;
    $scope.password1 =obj.password;
    $scope.email1 =obj.email;*/
    
    
        })
}

$scope.edit=function(username,username1) {
   
      $http({
    method: 'PUT',
    url : 'https://api.mongolab.com/api/1/databases/lab7/collections/users/?apiKey=-7Ov9M4e5lWHPyfY0lzFSqhDxN5A_PRX',
}).success(function(jsonDetails) {
	    
		//alert('hie');
	var obj=angular.fromJson(jsonDetails);
	
//alert(obj[0].username);
	//alert(angular.equals(a,a));
	for (var i = 0; i < obj.length; i++) {
		
		//alert(obj[i].name);
		//alert(userName);
		if(angular.equals(obj[i].username,"Nihar"))
		{
            
					//alert('hie');
            obj[i].username=username1;
            alert('hie');
            break;
            

		}
        else
        {
            
        }
        
		
	//alert(obj[i].name);
}
    
        })
    
    
}

$scope.query1 = function() {
   //alert('hie');
    $scope.srcc='querynew.html';
}
$scope.query2 = function() {
   //alert('hie');
    $scope.srcc='query2.html';
}
$scope.query3 = function() {
   //alert('hie');
    $scope.srcc='query3.html';
}

$scope.query4 = function() {
   //alert('hie');
    $scope.srcc='query4.html';
}

$scope.query5 = function() {
   //alert('hie');
    $scope.srcc='query5.html';
}

$scope.query6 = function() {
   //alert('hie');
    $scope.srcc='query6.html';
}

$scope.query7 = function() {
   //alert('hie');
    $scope.srcc='query7.html';
}

$scope.query8 = function() {
   //alert('hie');
    $scope.srcc='query8.html';
}
$scope.query9 = function() {
   //alert('hie');
    $scope.srcc='query9.html';
}

$scope.api_views = function() {
   //alert('hie');
    $scope.srcc='apis.html';
}
$scope.query10 = function() {
   //alert('hie');
    $scope.srcc='query10.html';
}


$scope.updateuser1 = function(new_user_name,new_last_name,new_password,new_emailid) {
   //alert('hie');
var id =localStorage.getItem("id_user");
      // alert(id);
    
    $http({
    method: 'PUT',
    url : 'https://api.mongolab.com/api/1/databases/lab7/collections/users/'+id+'?apiKey=-7Ov9M4e5lWHPyfY0lzFSqhDxN5A_PRX',
    data: JSON.stringify({
                "username": new_user_name,
                "password": new_password,
                "lastname": new_last_name,
                "emailid" : new_emailid
                
            }),
    contentType: "application/json"
}).success(function() {
    alert('success');
    
        })

}

$scope.deleteuser1 = function(user_name) {
   //alert('hie');
var id =localStorage.getItem("id_user");
      // alert(id);
    
    $http({
    method: 'DELETE',
    url : 'https://api.mongolab.com/api/1/databases/lab7/collections/users/'+id+'?apiKey=-7Ov9M4e5lWHPyfY0lzFSqhDxN5A_PRX',
   
}).success(function() {
    alert('success');
    
        })

}



    
});  


// holaClientSideChallengeManager Object 
// constructor get users count as Number default is 100
// function TestUsers - start the test user service calls
function holaClientSideChallengeManager()
{
	this.usersCount=100;
	this.currentUserIndex=1;
	this.progressElement=null;
	this.resultsElement=null;
	this.testUserServiceURL='/testUser';
	this.testUsersSummeryServiceURL='/testUser';
	this.usersResults=new Array();
	this.resultTemplate='<li>User No\' {userIndex} is online:{online}</li>';
	this.Init=function(usersCount)
	{
		if(typeof(usersCount)!=undefined &&  usersCount!=null)this.usersCount=usersCount;	
	}
	this.TestUsers=function (progressElement,resultsElement)
	{
		this.usersResults=new Array(); //clear the test results array 
		this.currentUserIndex=1;
		this.progressElement=progressElement;
		this.resultsElement=resultsElement;
		this.testCurrentUser(this.testUserEnded,this);
		if(this.progressElement!=null)
		{
			this.progressElement.innerHTML='';
		}
		if(this.resultsElement!=null)
		{
			this.resultsElement.innerHTML='';
		}
	};
	this.testUserEnded=function(userResult)
	{
		this.usersResults.push(userResult);
		if(userResult.error)
		{
			console.log('test user ended with error : '+userResult.userIndex+' error : '+userResult.error);
		}
		else
		{
			console.log('test user ended userIndex : '+userResult.userIndex+' is online : '+userResult.online);
			if(this.progressElement!=null)
			{
				this.progressElement.innerHTML=userResult.userIndex;
			}
			if(this.resultsElement!=null)
			{
				this.resultsElement.innerHTML+=this.resultTemplate.replace('{userIndex}',userResult.userIndex)
					.replace('{online}',userResult.online);
			}
		}
		if(this.currentUserIndex>=this.usersCount) //if this was the last user 
		{
			this.testUsersEnded();
		}
		else
		{
			this.currentUserIndex++;
			this.testCurrentUser(this.testUserEnded,this); //test with the next user 
		}
	};
	this.testUsersEnded=function()
	{
		if(this.resultsElement!=null && this.usersResults.length>0)
		{
			$.ajax({
			  url: this.testUsersSummeryServiceURL,
			  type: "POST",
			  data: JSON.stringify(this.usersResults)
			}).done(function(msg){
			  	console.log('report testUsersEnded reuslts in '+msg);
		  	});
		}
	};
	this.testCurrentUser=function(callback,scope)
	{
		$.ajax({
		  url: this.testUserServiceURL+'/'+this.currentUserIndex,
		  context: scope
		}).done(function(data) {
		  if(callback)callback.call(scope,data);
		}).fail(function(errorMessage){
				if(callback)callback.call(scope,{userIndex:scope.currentUserIndex,error:errorMessage}); //on error build the error object
		});
	};
	return this;
} 
(function (glob) //add the holaClientSideChallengeManagerObj to the global scope .
{
	glob.holaClientSideChallengeManagerObj=new holaClientSideChallengeManager();
}(this));
$(document).ready(function() {
     //$('.edit').editable('/save',{onreset:function(){alert('reset');return false;}});
     console.log($.editable.types.defaults.reset);
     var oldfunc=$.editable.types.defaults.reset; //keep the default reset function 
     $.editable.types.defaults.reset=function(settings, original)
     {
     	console.log('reset');
     	MyConfirm(function(){return oldfunc(settings,original);},function(){return false;},this)
   //   	if(confirm('Disacred all changes ?'))//Use the good old confirm - if it only was supporting close on lose focus - :-)
   //   	{
   //   		return oldfunc(settings,original);	//go back to the old functionality 
   //   	}
   //   	else 
 	// 		{	
 	//	 		return false;
 	//		}
     }
     function MyConfirm(onDicared,onCancell,scope)
     {
     //	var that=this;
     	$( "#dialog-confirm" ).dialog("option", "buttons", {
		        "Disacred": function() {
		          $( this ).dialog( "close" );
		          onDicared();
		        },
		        Cancel: function() {
		          $( this ).dialog( "close" );
		          onCancell();
		        } } );
     	$( "#dialog-confirm" ).dialog("open");	
     }
     $( "#dialog-confirm" ).dialog({
		 	  autoOpen: false,
		      resizable: false,
		      height:240,
		      modal: true,
		      open: function() 
			      {
                     $('.ui-widget-overlay').on("click",function(){$("#dialog-confirm").dialog("close");}); 
	              }
		    });     
 });
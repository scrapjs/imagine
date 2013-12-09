/**
* Network-emulating stuff
*/

var Network = {
	/**
	* Network parameters
	*/
	settings: {
		minTimeout: 50,
		maxTimeout: 1000,
		errorPercent: 2,
		timeoutPercent: 5,
		isOffline: false,
	},

	/**
	* Emulated XHR request params. Not real ones, of course.
	*/
	ajaxDefaults: {
		async: true,
		crossDomain: false,
		//data is passed to data descriptor as a context
		data: I,
		jsonp: false,
		jsonpCallback: null,
		type: "GET",
		url: "",


		//callbacks
		beforeSend: null,
		complete: function(){
			console.log("ajax complete")
		},
		success: function(){
			console.log("ajax success")
		},
		timeout: function(){
			console.error("ajax timeout")
		},
		error: function(){
			console.error("ajax error")
		},
		//set of callbacks responding to the code
		statusCode: {

		},
		xhr: function(){

		}
	}


}



/**
* implements jquery ajax function with request as DataDescriptor.
* Every subsequent filter is called after the data being received
*/
function ajax(settings, descriptor){
	var opts = extend({}, Network.ajaxDefaults, settings);

	//emulate losses
	if (int(100) < Network.settings.errorPercent){
		return setTimeout(opts.error, Network.settings.minTimeout);
	} else if (int(100) < Network.settings.timeoutPercent){
		return setTimeout(opts.timeout, Network.settings.maxTimeout);
	}
	
	var timeout = int(Network.settings.minTimeout, Network.settings.maxTimeout);

	setTimeout(function(){
		var descriptorObj = new DataDescriptor(descriptor);
		opts.success(descriptorObj.populate(opts.data));
	}, timeout);
}
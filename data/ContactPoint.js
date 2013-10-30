function ContactPoint(){
	this._create();
}

extend(ContactPoint.prototype, Thing.prototype,
	{
		contactType:{
			type: "Text",
			get: function(){

			}
		},
		email: {
			type: "Text"
		},
		faxNumber: {
			type: "Text"
		},
		telephone: {
			type: "Text"
		}
	}
);
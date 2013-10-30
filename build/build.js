(function(){
	//#include ../src/util.js

	//----- General data providers
	//#include ../data/Internet.js

	//----- General data types
	//#include ../data/Thing.js



	//#ifndef locale
	//#define locale = "EN_us"
	//#endif
	//----- Locale-specific data types


	//----- Locale-specific providers
	//#include ../data//*#put locale *//Thing.js

})();
/**
 * 3.) object	OpenLayers.Util.getFormattedLonLat
 */

OpenLayers.Util.getFormattedLonLat = function(coordinate, axis, dmsOption) {
    if (!dmsOption) {
        dmsOption = 'dms';    //default to show degree, minutes, seconds
    }
    coordinate = (coordinate+540)%360 - 180; // normalize for sphere being round
    var abscoordinate = Math.abs(coordinate)
    var coordinatedegrees = Math.floor(abscoordinate);

	if ( dmsOption[0] == 'D' ) {
		var digits = 3;
		if ( dmsOption[1] ) {
			digits = dmsOption[1];
		}
		str = coordinate.toFixed(digits);
	} else {

		var coordinateminutes = (abscoordinate - coordinatedegrees)/(1/60);
		var tempcoordinateminutes = coordinateminutes;
		coordinateminutes = Math.floor(coordinateminutes);
		var coordinateseconds = (tempcoordinateminutes - coordinateminutes)/(1/60);
		coordinateseconds =  Math.round(coordinateseconds*10);
		coordinateseconds /= 10;

		if( coordinatedegrees < 10 ) {
			coordinatedegrees = "0" + coordinatedegrees;
		}
		var str = coordinatedegrees + " ";  //get degree symbol here somehow for SVG/VML labelling

		if (dmsOption.indexOf('dm') >= 0) {
			if( coordinateminutes < 10 ) {
				coordinateminutes = "0" + coordinateminutes;
			}
			str += coordinateminutes + "'";
	  
			if (dmsOption.indexOf('dms') >= 0) {
				if( coordinateseconds < 10 ) {
					coordinateseconds = "0" + coordinateseconds;
				}
				str += coordinateseconds + '"';
			}
		}
		
		if (axis == "lon") {
			str += coordinate < 0 ? OpenLayers.i18n("W") : OpenLayers.i18n("E");
		} else {
			str += coordinate < 0 ? OpenLayers.i18n("S") : OpenLayers.i18n("N");
		}
	}
    return str;
};
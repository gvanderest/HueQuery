$(function(){

	// TODO: Refactor AJAX calls, use query_light
	// TODO: Reconsider method names
	// TODO: jQuery plugin-ize
	// TODO: Moar methodz!

	control = {
		'props' : {
			'bridge_ip' : '192.168.0.19',
			'key' : 'df65439797bb2d7da0d6006af3340a61',
			'num_lights' : 3,
			'max_hue' : 65535,
			'min_hue' : 0
		},
		'brightness' : function () {
			var i = 1;
			while(i <= this.props.num_lights) {
				var options = {
					'light' : i,
					'on' : true
				}
				this.query_light(options);
				i++;
			}			
		},
		'darkness' : function () {
			var i = 1;
			while(i <= this.props.num_lights) {
				var options = {
					'light' : i,
					'on' : false
				}
				this.query_light(options);
				i++;
			}			
		},
		'query_light' : function (options) {
			var lightQuery = "{";

			if ( typeof options['alert'] === 'string' ) {
				lightQuery += '\"alert\" : ' + options['alert'] + ',';
			}
			if ( typeof options['bri'] === 'number' ) {
				lightQuery += '\"bri\" : ' + options['bri'] + ',';
			}
			if ( typeof options['ct'] === 'number' ) {
				lightQuery += '\"ct\" : ' + options['ct'] + ',';				
			}
			if ( typeof options['hue'] === 'number' ) {
				lightQuery += '\"hue\" : ' + options['hue'] + ',';
			}
			if ( typeof options['light'] === 'number') {
				light = options['light'];
			}
			if ( typeof options ['on'] === 'boolean' ) {
				lightQuery += '\"on\" : ' + options['on'] + ',';
			}
			if ( typeof options['sat'] === 'number' ) {
				lightQuery += '\"sat\" : ' + options['sat'] + ',';
			}
			if ( typeof options['transitiontime'] === 'number' ) {
				lightQuery += '\"transitiontime\" : ' + options['transitiontime'] + ',';
			}
			if ( typeof options['success'] === 'function' ) {
				var success = options['success'];
			}

			lightQuery = lightQuery.substring(0, lightQuery.length -1)			
			lightQuery += "}";
			console.log(lightQuery);

			var href = 'http://' + control.props.bridge_ip + '/api/' + control.props.key + '/lights/' + light + '/state';

			$.ajax({
				url: href,
				dataType : 'json',
				type: 'PUT',
				data: lightQuery,
				success: success
			});
		},
		'dim' : function(light, bri) {
			var bri = bri || 50;
			options = {
				'bri' : bri,
				'light' : light
			};
			this.query_light(options);
		},
		'dim_all' : function(bri) {
			var i = 1;
			while(i <= this.props.num_lights) {
				this.dim(i, bri);
				i++;
			}
		},
		'off' : function(light) {
			this.query_light({'on' : false, 'light': light})
		},
		'on' : function(light) {
			this.query_light({'on' : true, 'light': light})
		},
		'reset' : function () {
			var i = 1;
			var options = {
				'ct' : 350,
				'bri' : 160
			};
			while(i <= this.props.num_lights) {
				options.light = i;
				this.query_light(options);
				i++;
			}
		},
		'random_color' : function(light){

			var seed = Math.floor(Math.random() * 50) + 1;
			var hue = seed * 1000;

			var options = {
				'light' : light,
				'hue' : hue
			}
			this.query_light(options);
		},
		'random_all' : function () {
			var i = 1;
			while( i <= this.props.num_lights ) {
				this.random_color(i);
				i++;
			}
		},
		'specific_color' : function (light, hue) {
			var options = {
				'light' : light,
				'hue' : hue
			}
			this.query_light(options);
		},
		'specific_color_all' : function (hue) {
			var l = 1;
			while ( l <= this.props.num_lights) {
			var options = {
				'hue' : hue,
				'light' : l
			}
			this.query_light(options);
				l++;
			}
		},
		'strobe' : function (light, hue) {
			control.query_light({
				'hue' : hue,
				'light':light,
				'bri':255,
				'on': true,
				'transitiontime' : 10,
				'success' : function(){ 
					control.query_light({
						'light':light,
						'on' : false,
						'transitiontime' : 10});
				}
			});
			setInterval(this.strobe, 110);
		},
		'transition_time' : function (light, hue, time) {
			var options = {
				'light' : light,
				'hue' : hue,
				'transitiontime' : time
			}
			this.query_light(options);
		},
		'transition_time_all' : function (hue, time) {
			var l = 1;
			var options = {
				'hue' : hue,
				'transitiontime' : time
			}
			while ( l <= this.props.num_lights) {
				options.light = l;
				this.query_light(options);
				l++;
			}
		}
	}


// TODO: UI Rewrite
var numLights = 3 //Light 0 represents all lights.
var i = 1
var b = 0
var h = 0
while(i <= control.props.num_lights){
        //document.write('<B>LIGHT ' + i + '</B>  <button onclick="l.specific_color('+i+',65535)">Red<button><button onclick="l.specific_color('+i+',45000)">Blue</button><button>Green</Button><button>Purple</button><button>Orange</button><button>Yellow</button><B>BRIGHT</B> ' );
        document.write('<B>Light '+i+'</B><button onclick="control.specific_color('+i+',65535)">Red</button>');
        document.write(''+i+'<button onclick="control.specific_color('+i+',55000)">Pink</button>');
        document.write(''+i+'<button onclick="control.specific_color('+i+',49000)">Purple</button>');
        document.write(''+i+'<button onclick="control.specific_color('+i+',46500)">Blue</button>');
        document.write(''+i+'<button onclick="control.specific_color('+i+',25000)">Yellow</button>');
        document.write(''+i+'<button onclick="control.specific_color('+i+',65535)">Green</button>');
        while(b <= 255){
        document.write('<button>' + b + '</button>');
        b=b+25
        }
        document.write('<BR><B>HUE '+i+'</B>')
        while(h <= 65535){
                document.write('<button onclick="control.specific_color('+i+','+h+')"></button>');
                h=h+1092
        }
        document.write('<BR>')
        b=0;
        h=0;
        i++;
        //document.write('');
}
});
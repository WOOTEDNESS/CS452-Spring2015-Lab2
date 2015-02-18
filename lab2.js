

var gl;
var points;
var modelViewMatrix;
var uModelViewMatrix;
var xPos = 0.0;
var yPos = 0.0;

var colors;

window.onload = function init()
{
	var canvas = document.getElementById( "gl-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if ( !gl ) { alert( "WebGL isn't available" ); }

	points = new Float32Array([-.25,  .25, 
							   -.25, -.25,
							    .25,  .25, 
							    .25, -.25
							  ]);

	colors = new Float32Array([1.0,0.0,0.0,1.0,
							   0.0,1.0,0.0,1.0,
							   0.0,0.0,1.0,1.0,
							   1.0,1.0,1.0,1.0,
							  ]);
	//
	// Configure WebGL
	//
	gl.viewport(0, 0, canvas.width, canvas.height );
	gl.clearColor(0.5, 0.5, 0.5, 1.0 );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram(program);

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId);
	gl.bufferData( gl.ARRAY_BUFFER, points, gl.STATIC_DRAW ); 

	// Associate our shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	//Associate matrix from html to wbgl utils for operations
	uModelViewMatrix = gl.getUniformLocation(program,"modelViewMatrix");

	//make a buffer for the colors
	var colorBufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferId);
	gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

	//Associcate color form html 
	var vColor = gl.getAttribLocation(program, "aVColor");
	gl.vertexAttribPointer(vColor,4,gl.FLOAT,false,0,0);
	gl.enableVertexAttribArray(vColor);

	modelViewMatrix = mat4();

	document.onkeydown = function(event) { HandleKeys(event);};

	render();
};


function render() {
	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	modelViewMatrix =  translate(xPos,yPos,0);

	gl.uniformMatrix4fv(uModelViewMatrix, false, flatten(modelViewMatrix));

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

	requestAnimFrame(render);
}


function HandleKeys(event)
{
	if (event.keyCode == 119 || event.keyCode == 87 )//w keys is pressed move up
	{
		yPos += .1
		console.log("w key pressed")
		//points += translate(0,.1,0)
	}
	else if (event.keyCode == 97 ||  event.keyCode == 65 )//a key is pressed move left
	{
		xPos -= .1
		console.log("a key pressed")
		//points -= translate(.1,0,0)
	}
	else if (event.keyCode == 115 || event.keyCode == 83 )//s key is pressed move down
	{
		yPos -= .1
		console.log("s key pressed")
		//points -= translate(0,.1,0)
	}
	else if (event.keyCode == 100 || event.keyCode == 68)//d key is pressed move right
	{
		xPos += .1
		console.log("d key pressed")
		//points += translate(.1,0,0)
	}
	else if (event.keyCode == 113 || event.keyCode == 81)
	{
		xPos = 0.0;
		yPos = 0.0;
		console.log("q key pressed")
	}
}































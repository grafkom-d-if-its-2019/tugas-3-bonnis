(function() {
    var canvas, gl, program;
    var trasnformWire, transformTriangle;
    var angle =0.0, scale = 1, flag=1;
    glUtils.SL.init({callback:function(){ main() }});
    function main(){
        // window.addEventListener('resize', resizer);

        var VSHADER_SOURCE = glUtils.SL.Shaders.v1.vertex;
        var FSHADER_SOURCE = glUtils.SL.Shaders.v1.fragment;

        canvas = document.getElementById("glcanvas");
        gl = glUtils.checkWebGL(canvas);
        if(!gl) alert("WebGL tidak ditemukan. Tolong gunakan browser versi terbaru.");

        // var vertexShaderSource = 
        //     "void main() {\n" + 
        //     "   gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n" +
        //     "   gl_PointSize = 10.0;\n" +
        //     '}';
        // var fragmentShaderSource = 
        //     "void main() {\n" +
        //     "   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" +
        //     "}";
        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE);
        var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE);
        program = glUtils.createProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(program);

        resizer();

    }

    function matrixDot (m1, m2) {
        var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
    }

    function drawWire(){
        // Write the positions of vertices to a vertex shader
        var n = initWireBuffers(gl);
        if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
        }

        // Draw a line
        gl.drawArrays(gl.LINE_LOOP, 0, n);
    }

    function initWireBuffers(){
        var vertices = new Float32Array([
        -0.75, -0.7, //Pojok kiri bawah
        -0.75, 0.7, //Pojok  kiri atas
        -0.55, 0.7, //Pojok kanan atas
        -0.45, 0.5, //Turun dari PKA
        -0.45, 0.1, //Turun lagi
        -0.55, -0.1, //Belokan 
        -0.45, -0.3, //Belok lagi
        -0.45, -0.5, //Sol kanan kaki kanan
        -0.55, -0.7, //Sol kiri kaki kanan
        -0.55, -0.3, //naik
        -0.65, -0.1, //naik dan belok
        -0.65, -0.5, //sol kanan kaki kiri
        
        ]);
        // The number of vertices
        var n = 12;

        // Create a buffer object
        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        var aPosition = gl.getAttribLocation(program, 'aPosition');
        var matrixLoc = gl.getUniformLocation(program, 'transformMatrix');
        gl.uniformMatrix4fv(matrixLoc, false, trasnformWire);
        if (aPosition < 0) {
        console.log('Failed to get the storage location of aPosition');
        return -1;
        }

        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        //gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

        // Enable the assignment to aPosition variable
        gl.enableVertexAttribArray(aPosition);

        return n;
    }

    function drawTriangles(){
         // Write the positions of vertices to a vertex shader
        var n = initTriangleBuffers(gl);
        if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
        }

        // Draw a line
        gl.drawArrays(gl.TRIANGLES, 0, n);
    }

    function initTriangleBuffers(){
         var vertices = new Float32Array([
             0.25, 0.7, 
             0.25, -0.5,
             0.35, 0.7,

             0.25, -0.5,
             0.35, -0.5,//atas
             0.35, 0.7,
             
             0.25, -0.5,
             0.35, -0.5,//baeah
             0.25, -0.7,
             //bagian Kiri

             0.35, 0.5,
             0.35, 0.7,
             0.45, 0.7,

             0.35, 0.5,
             0.45, 0.7,//atas
             0.45, 0.5,

             0.35, 0.1,
             0.35, -0.1,
             0.45, 0.1,

             0.45,0.1,
             0.35,-0.1,//tengah
             0.45,-0.1,

             0.35,-0.1,
             0.45,-0.1, //bawah
             0.45,-0.3,
             //bagian tengah

             0.45,0.7,
             0.45,0.5,
             0.55,0.5,//segitiga atas

             0.45,0.5,
             0.55,0.5,
             0.45,0.1,

             0.45,0.1,
             0.55,0.5,//boks atas
             0.55,0.1,

             0.45,0.1,
             0.55,0.1,//segitiga tengah
             0.45,-0.1,

             0.45,-0.1,
             0.45,-0.3, //segitiga tengah-bawah
             0.55,-0.3,

             0.45,-0.3,
             0.45,-0.5,
             0.55,-0.3,

             0.45,-0.5,
             0.55,-0.3, //boks bawah
             0.55,-0.5,

            0.45,-0.5,
            0.55,-0.5, //segitiga bawah
            0.45,-0.7,

            //bagian kanan

            
        ]);
        // The number of vertices
        var n = 48;

        // Create a buffer object
        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        var aPosition = gl.getAttribLocation(program, 'aPosition');
        var matrixLoc = gl.getUniformLocation(program, 'transformMatrix');
        gl.uniformMatrix4fv(matrixLoc, false, transformTriangle);
        if (aPosition < 0) {
        console.log('Failed to get the storage location of aPosition');
        return -1;
        }

        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        //gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

        // Enable the assignment to aPosition variable
        gl.enableVertexAttribArray(aPosition);

        return n;
    }

    function drawWireHole(){
        var n = initWireHoleBuffers(gl);
        if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
        }

        // Draw a line
        gl.drawArrays(gl.LINE_LOOP, 0, n);
    }

    function initWireHoleBuffers(){
         var vertices = new Float32Array([
             -0.65,0.5, //A
             -0.55,0.5, //B
             -0.55,0.1, //C
             -0.65,0.1, //D
        ]);
        // The number of vertices
        var n = 4;

        // Create a buffer object
        var vertexBuffer = gl.createBuffer();
        if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        var aPosition = gl.getAttribLocation(program, 'aPosition');
        var matrixLoc = gl.getUniformLocation(program, 'transformMatrix');
        gl.uniformMatrix4fv(matrixLoc, false, trasnformWire);
        if (aPosition < 0) {
        console.log('Failed to get the storage location of aPosition');
        return -1;
        }

        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        //gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

        // Enable the assignment to aPosition variable
        gl.enableVertexAttribArray(aPosition);

        return n;
    }

    function draw() {
        // Specify the color for clearing <canvas>
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);

        trasnformWire = [
            [1.0,0.0,0.0,0.0],
            [0.0,1.0,0.0,0.0],
            [0.0,0.0,1.0,0.0],
            [0.0,0.0,0.0,1.0]
        ]

        var translateToOrigin = [
            [1.0,0.0,0.0,0.0],
            [0.0,1.0,0.0,0.0],
            [0.0,0.0,1.0,0.0],
            [-0.5,0.0,0.0,1.0]
        
        ]

        var s = Math.sin(angle);
        var c = Math.cos(angle);

        var rotate = [
            [c,s,0.0,0.0],
            [-s,c,0.0,0.0],
            [0.0,0.0,1.0,0.0],
            [0.0,0.0,0.0,1.0]
        ]

        var translateFromOrigin = [
            [1.0,0.0,0.0,0.0],
            [0.0,1.0,0.0,0.0],
            [0.0,0.0,1.0,0.0],
            [0.5,0.0,0.0,1.0]
        ]

        trasnformWire = matrixDot(translateFromOrigin,rotate);
        trasnformWire = matrixDot(trasnformWire,translateToOrigin);
        trasnformWire = trasnformWire.flat()

        
        drawWire();
        drawWireHole();

        transformTriangle = [
            [1.0,0.0,0.0,0.0],
            [0.0,1.0,0.0,0.0],
            [0.0,0.0,1.0,0.0],
            [0.0,0.0,0.0,1.0]
        ]
        
        translateToOrigin = [
            [1.0,0.0,0.0,0.0],
            [0.0,1.0,0.0,0.0],
            [0.0,0.0,1.0,0.0],
            [0.5,0.0,0.0,1.0]
        ]

        scaleMatrix = [
            [scale,0.0,0.0,0.0],
            [0.0,1.0,0.0,0.0],
            [0.0,0.0,1.0,0.0],
            [0.0,0.0,0.0,1.0]
        ]

        translateFromOrigin = [
            [1.0,0.0,0.0,0.0],
            [0.0,1.0,0.0,0.0],
            [0.0,0.0,1.0,0.0],
            [-0.5,0.0,0.0,1.0]
        ]

        transformTriangle = matrixDot(translateFromOrigin,scaleMatrix);
        transformTriangle = matrixDot(transformTriangle,translateToOrigin);
        transformTriangle = transformTriangle.flat()

        drawTriangles();
        
    }

    function resizer() {
        angle+=0.0075;
        if(flag==1){
            scale -= 0.0075;
            if(scale<=-1.0) flag=0;
          }
          else{
            scale += 0.0075;
            if(scale>=1.0) flag=1;
          }
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        draw();

        requestAnimationFrame(resizer);
    }



})(window || this);
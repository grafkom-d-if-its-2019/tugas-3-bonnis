attribute vec4 aPosition;
uniform mat4 transformMatrix;

void main(){
    
    gl_Position = transformMatrix*aPosition;
    // gl_PointSize = 10.0;
}
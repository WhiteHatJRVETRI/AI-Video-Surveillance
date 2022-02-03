status = "";
AC_image = "";
objects=[]

function preload(){
    video=createVideo("video.mp4")
}
function setup(){
    canvas = createCanvas(380,380);
   canvas.center()
    video.hide()
}
function start(){
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop()
    video.speed(1)
    video.volume(0)
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
objects=results
}

function draw(){
    image(video,0,0,380,380);
    
    if (status!="") {
        
        object_Detector.detect(video,gotResults);
        for (let index = 0; index < objects.length; index++) {
            document.getElementById("status").innerHTML="status:object_detctor"   
            document.getElementById("num_of_obj").innerHTML="numberofobject="+objects.length
            fill("red")
            percent=floor(objects[index].confidence*100)
            text(objects[index].label+" "+percent+"%",objects[index].x,objects[index].y)
            noFill()
            stroke("red")
            rect(objects[index].x-15,objects[index].y,objects[index].width,objects[index].height)
        }
    }
}
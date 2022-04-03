Status="";
objects= [];
Name="";
song="warning.mp3"
function setup(){
canvas=createCanvas(650,400);
canvas.center();

webcam= createCapture(VIDEO);
webcam.hide();

}
function preload(){

}
function start(){
    Object_detector= ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting object";
    Name="person"
    
}
function draw(){
image(webcam,0,0,650,400);

if(Status!=""){
    Object_detector.detect(webcam,gotResults);
    for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML="Status: object detected";
       
        fill("Red");
        confidence= Math.round(objects[i].confidence*100)+" % ";
        text(objects[i].label+" "+confidence,objects[i].x,objects[i].y);
        noFill();
        stroke("Red");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects[i].label==Name){
       webcam.stop();
       Object_detector.detect(gotResults);
       document.getElementById("objects_name").innerHTML="Baby found ";
       synth=window.speechSynthesis;
       utter=new SpeechSynthesisUtterance("Baby found ");
       synth.speak(utter);
        }
        else{
            document.getElementById("objects_name").innerHTML=" Baby not found ";
           song.play();
        }
    }
  
}
}
function modelLoaded(){
console.log("model is loaded");
Status=true;
}
function gotResults(error,results){
if(error){
    console.log(error)
    
}
else{
    console.log(results);
    objects= results;
}
}

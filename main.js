objects = [];
status = "";

function setup() 
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(480, 380);
}

function draw() 
{
    image(video, 0, 0, 480, 380);
    if (status != "") 
    {
        objectdetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
           fill("#FF0000");
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
           noFill();
           stroke("#FF0000");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
           if (objects[i].label == input_box) 
           {
                video.stop();
                objectdetector.detect(gotResult);
                document.getElementById("object_found").innerHTML = input_box + "Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(input_box + "found");
                synth.speak(utterThis);
           }
           else
           {
                document.getElementById("object_found").innerHTML = input_box + "Not Found";
           }
        }
    }
}

function gotResult(error, results) 
{
    if (error) 
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function start() 
{
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
    input_box = document.getElementById("input_id").value;
    video.stop();
}

function modelLoaded() 
{
    console.log("Model Loaded!");
    status = true;
}
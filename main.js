Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "' + data_uri + '" />';
    });
}
console.log('ml5 version ', ml5.version);
classifer = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/yUUZPgP0J/model.json', modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}
prediction = "";
function check() {
    img = document.getElementById("captured_image");
    classifer.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if (results[0].label == "no") {
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
        if (results[0].label == "awesome") {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if (results[0].label == "yo") {
            document.getElementById("update_emoji").innerHTML = "&#129304;";
        }
        if (results[0].label == "victory") {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }        
    }
}
function speak() {
    synth = window.speechSynthesis;
    speak_data = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
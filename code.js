// let is for declaring variables
let capture;
let posenet;
let singlePose;
let skeleton;
let ironman;
let spects;
let mask;

function setup()
{
    createCanvas(1450, 600);
    // video capturing 
    capture = createCapture(VIDEO);
    capture.hide();
    // importing poseNet from ml5js
    posenet=ml5.poseNet(capture, Done);
    posenet.on('pose', Pose_det);
    ironman=loadImage('set/ironman.png');
    spects=loadImage('set/spects.png');
    mask=loadImage('set/mask.png');
}

function Pose_det(poses)
{
    console.log(poses);
    if(poses.length>0)
    {
        singlePose=poses[0].pose;
        skeleton=poses[0].skeleton;
    }
}

function Done()
{
    console.log('The model has been deployed!');
}

function draw()
{
   image(capture, 0, 0);
   fill(0, 200, 200);
   if(singlePose)
   {
       for(let i=0; i<singlePose.keypoints.length; i++)
       {
           ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 15, 15);
       }
       stroke(255, 255, 255);
       strokeWeight(3);
       for(let j=0; j<skeleton.length; j++)
       {
           line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
       }
       //image(ironman, singlePose.nose.x-150, singlePose.nose.y-200, 350, 300);
       image(spects, singlePose.nose.x-50, singlePose.nose.y-50, 200, 100);
       image(mask, singlePose.nose.x-100, singlePose.nose.y-50, 250, 200);
   }
}

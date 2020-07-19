//Create variables here
var dogimg, happydogimg, database, foodS, foodStock;
var dog;
var feedbutton,addbutton;
var fedTime,lastFed;
var foodObj;
function preload()
{
  //load images here
  dogimg=loadImage('images/dogImg.png');
  happydogimg=loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(250,300,10,10);
  dog.addImage(dogimg);
  dog.scale=0.2;
  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock)
  console.log(foodStock);

  foodObj=new Food();
  feedbutton=createButton("Feed the dog");
  feedbutton.position(700,95);
  feedbutton.mousePressed(feedDog);
   addbutton=createButton("Add Food");
   addbutton.position(800,95);
   addbutton.mousePressed(addFoods);


}


function draw() {  
  background(46, 139, 87);
  foodObj.display();
  
  drawSprites();
  fill("red");
  textSize(20);
  text("foodLeft: "+foodS,100,100);
  if(lastFed>=12)
  {
    text('Last Feed:'+lastFed%12+" PM',350,30");
  }
  else if(lastFed==0)
  {
    text("Last Feed :  12 AM",350,30 );
  }
  else{
    text("Last Feed : "+lastFed+" AM",350,30);

  }
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=database.val();  })
  //add styles here
  fill(255,255,254);
  
   noFill();
}

function readStock(data)
{
  foodS=data.val();
}

function writeStock(x)
{
  if(x<=0){
  x=0;
}
else{
  x=x-1;
}
  database.ref('/').update({Food:x})
}
function addFoods()
{
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function feedDog()
{
  dog.addImage(happyDog);
  foodObj .updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
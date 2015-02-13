var total = 0;
for(var i=0; i<cheese.segments.length; i++){
  total += cheese.segments[i].value;
}

//total is the sum of all the values

document.addEventListener("DOMContentLoaded", function(){
	drawPie();
	drawOwn();
});
	
function drawPie(){
	var radius = 0;
	var canvas = document.querySelector("#pie-chart");
	var context = canvas.getContext("2d");
	var cx = 150;
	var cy = 200; 
	var currentAngle = 0;
	//the difference for each wedge in the pie is arc along the circumference
  	//we use the percentage to determine what percentage of the whole circle
  	//the full circle is 2 * Math.PI radians long.
  	//start at zero and travelling clockwise around the circle
  	//start the center for each pie wedge
  	//then draw a straight line out along the radius at the correct angle
  	//then draw an arc from the current point along the circumference
  	//stopping at the end of the percentage of the circumference
  	//finally going back to the center point.
	for (var i=0; i<cheese.segments.length; i++){
		if (cheese.segments[i].value == Math.max(18.8496,43.9823,25.1327,31.4159,3.1416,12.5664)){
			radius = radius * 0.9;	
		} else if (cheese.segments[i].value == Math.min(18.8496,43.9823,25.1327,31.4159,3.1416,12.5664)){
			radius = radius * 1.1;
		} else {
			radius = 100;
		};
		
		var pct = cheese.segments[i].value / total;
		var endAngle = currentAngle + (pct * (Math.PI * 2));
		//draw the arc
		context.moveTo(cx, cy);
		context.beginPath();
		context.fillStyle = cheese.segments[i].color;
		context.arc(cx, cy, radius, currentAngle, endAngle, false); 
		context.lineTo(cx, cy);
		context.fill();
		//draw the line that will point to the values
		var midAngle = (currentAngle + endAngle)/2;
		context.save();
		context.translate(cx, cy);
		context.strokeStyle = "#000";
		context.lineWidth = 2;
		context.beginPath();
		//angle to be used for the lines
		var dx = Math.cos(midAngle) * (0.8 * radius);
    	var dy = Math.sin(midAngle) * (0.8 * radius);
    	context.moveTo(dx, dy);
    	//ending points for the lines
		var dx = Math.cos(midAngle) * (radius + 30);
		var dy = Math.sin(midAngle) * (radius + 30);
		context.lineTo(dx, dy);
		context.stroke();
		
		//add data caption
		var dx = Math.cos(midAngle) * (radius + 40);
		var dy = Math.sin(midAngle) * (radius + 40);
		context.font = "11pt Tahoma"; 
		context.textAlign = 'left';
		context.fillText(cheese.segments[i].lbl, dx, dy);
		 //put the canvas back to the original position
    	context.restore();
    	//update the currentAngle		
    	currentAngle = endAngle;
	}; 
}

function drawOwn(){
	var canvas = document.querySelector("#own-chart");
	var context = canvas.getContext("2d");
	var graphHeight =350;    
	var offsetX = 0;	
	var barWidth = 30;	
	var spaceBetweenPoints = 35; 
	var x = offsetX + 20;	
	context.beginPath();
	for(var i=0; i<cheese.segments.length; i++){
		var pct = cheese.segments[i].value / total;
		var barHeight = (graphHeight * pct);
		context.beginPath();
		//for the first point the moveTo and lineTo values are the same
    	//All the labels for the bars are going above the bars
		context.rect(x, graphHeight - 1, barWidth, -1 * barHeight);
		var lbl = Math.round(pct * 100).toString();
		context.font = "11pt Tahoma";
		context.fillText(cheese.segments[i].lbl, x - 5, graphHeight - barHeight - 20);
		
		x = x + barWidth + spaceBetweenPoints;		
 		//move the x value for the next point
		
		context.textAlign = 'left';
		context.fillStyle = cheese.segments[i].color;
		context.fill();	
	}	
	  
	 	context.strokeStyle = "#000000";
	 	context.lineWidth = 2;

	 	context.beginPath();
	 	context.moveTo(offsetX, canvas.height-graphHeight);
	 	context.lineTo(offsetX, graphHeight);
	 	context.lineTo(canvas.width-offsetX, graphHeight);
	 	context.stroke();
}
	var ctx = document.getElementById("myChart").getContext('2d');
	var dps;
	var lineChart;
	var xVal;
	var yVal;
	var pre_yVal;
	var final_yVal;
	var updateInterval;
	var dataLength;
	var updateChart;
	var counter = 0;
	var intervalId;
	var outputCall = "";
	var outputPut = "";
	var timer = 20; 
	var executed = false;
	var Money = 1000;
	var Bet = 1.00;
	var callvalues = [];
	var putvalues = [];
	var profit;
	var preMoney = 1000;
	var totalProfit;

	window.onload = function(){
		dps =[];
		lineChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        datasets: [{lineTension: 0,
	            label: 'Price - $',
	            backgroundColor: 'rgba(204, 204, 204,0.5)',
	            pointBorderColor: 'black',
	            data: dps
	        }]
	    },
	    options: {
	    	responsive: true,
	    	maintainAspectRatio: false,
	        scales: {
	            xAxes: [{
	                type: 'linear',
	                position: 'bottom'
	           	 }]
	      	  }
	    	}
		});
		xVal = 0;
		yVal = 100;
		updateInterval=1000;
		dataLength = 20;

		updateChart = function(count){
			count = count || 1;
			for(var i=0;i<count;i++){
				pre_yVal = yVal;
				yVal = yVal +  Math.round(Math.random() * -16) + 8;
				if(yVal<=0)
					yVal = yVal + Math.ceil(Math.random() * 8 + 8);
				dps.push({
					x: xVal,
					y: yVal
				});
				xVal++;
			}

			lineChart.update();
		};
		updateChart(dataLength);
		setInterval(function(){updateChart();changeColor();document.getElementById("data3").innerHTML = yVal;},updateInterval);

	};
	function Call(){
		outputCall +="<br/>You call on: $" + yVal;
		if(!executed){
			executed = true;
			countTime();
		}
		if(timer >= 15){
			document.getElementById('text1').innerHTML = outputCall;
			callvalues[counter] = yVal;
			counter++;
			calculate();
		}
	}	
	function Put(){
		outputPut +="<br/>You put on: $" + yVal;
		if(!executed){
			executed = true;
			countTime();
		}
		if(timer >= 15){
			document.getElementById('text2').innerHTML = outputPut;
			putvalues[counter] = yVal;
			counter++;
			calculate();
		}
	}
	function countTime(){
		var counting = setInterval(function(){
			timer--;
			document.getElementById('time').innerHTML = timer + " seconds";
			if(timer==0){
				clearInterval(counting);
				final_yVal = yVal;
				timer = 20;
				document.getElementById("time").innerHTML = "20 seconds";
				executed = false;
				outputPut = "";
				outputCall = "";
				clear("text1");
				clear("text2");
				calculateCall();
				calculatePut();
				calculateProfit();
				callvalues = [];
				putvalues = [];
				document.getElementById("money").innerHTML = "$"+ Money.toFixed(4);
				Result();		
			}
		},1000);
	}

	function clear(text){
		document.getElementById(text).innerHTML = "";
	}
	function calculate(){
		Money -= Bet;
		document.getElementById("money").innerHTML = "$"+ Money.toFixed(4);
	}
	function Up(number){
			Bet = Bet + number;
			document.getElementById("bet").innerHTML = "Bet: $" + Bet;
	}
	function Down(number){
		Bet = Bet - number;
		if (Bet >= 1.00){
			Bet = Bet + number;
			Bet = Bet - number;
			document.getElementById("bet").innerHTML = "Bet: $" + Bet;
		}
		else
			Bet = Bet + number;
	}
	function calculateCall(){
		for(var i=0;i<callvalues.length;i++){
			if(final_yVal >= callvalues[i] && callvalues[i]!=""){
				profit = 80/100 * Bet;
				Money = Money + profit + Bet;
			}
			else{
				profit = 0;
				Money += profit;
			}
		}
	}
	function calculatePut(){
		for(var i=0;i<putvalues.length;i++){
			if(final_yVal <= putvalues[i] && putvalues[i]!=""){
				profit = 80/100 * Bet;
				Money = Money + profit + Bet;
			}
			else{
				profit = 0;
				Money += profit;
			}
		}
	}
	function calculateProfit(){
		totalProfit = Money - preMoney;
		preMoney = Money;
	}
	function Result(){
		alert("Final Price is: $" + final_yVal +"\n" + "Your Profit is: $" + totalProfit.toFixed(4)  + "\n" + "Current Money: $" + Money.toFixed(4));
	}
	function changeColor(){
		if(pre_yVal<yVal)
			document.getElementById("data3").style.color = "#00b300";
		else if(pre_yVal>yVal)
			document.getElementById("data3").style.color = "red";
		else
			document.getElementById("data3").style.color = "black";
	}
	function showInfo(){
		var xhttp = new XMLHttpRequest();
		  	xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		      document.getElementById("info").innerHTML =
		      this.responseText;
		    }
		  };
		  xhttp.open("GET", "help.txt", true);
		  xhttp.send();
	}

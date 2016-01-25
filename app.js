var fs = require("fs");

var five = require("johnny-five"),
    board = new five.Board();

var dataTemp = [];
var dataAlcohol = [];

board.on("ready", function(){
    //detect and write temperatur changes into JSON file
    var temp = new five.Temperature({
        pin: "A0",
        controller: "TMP36" 
    });
    
    temp.on("change", function(){
        if(this.celsius >=26){
            //output in console
            console.log("Temp: %d", this.celsius);
            //save as a local JSON file 
            var tempobj = {'temp':this.celsius};
            dataTemp.push(tempobj);
            fs.writeFile("tempdata.json", JSON.stringify(dataTemp), function(err){
                if(err) return console.log(err);
                console.log("updated tempdata.json");
            });
        }
    });
    
    //detect and write alcohol sensor changes into JSON file
    var alcoholSensor = new five.Sensor("A1");
    alcoholSensor.on("change", function(){
        if(this.value >=155){
            //output in console
            console.log("Alcohol: ", this.value);
            //save as a local JSON file 
            var alcoholobj = {'alcohol':this.value};
            dataAlcohol.push(alcoholobj);
            fs.writeFile("alcoholdata.json", JSON.stringify(dataAlcohol), function(err){
                if(err) return console.log(err);
                console.log("updated alcoholdata.json");
            });
        }
    });
});
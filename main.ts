led.setBrightness(8)

class Normalizer{
    private size: number;               //field length
    private normalized_val: number;     //calculated normalized value
    private Q: number[];

    constructor(s: number){
        this.size = s;
        this.normalized_val = 0;
        for (let i=0; i < this.size; i++){
            this.Q[i] = 1023;
        }
    }

    ///add a reading and return the normalized value 
    add_reading(x: number){
        if (this.Q.length == this.size){
            this.Q.shift();
        }
        this.Q.push(x);
        let sum = 0;
        this.Q.forEach(function(item, index){
            sum += item;
        });
        this.normalized_val = sum / this.Q.length;
        return this.normalized_val;
    }
}

namespace watering {

    let threshold = 800;
    let watering_period = 60000; //default watering period is one minute
    let pause_period = 5000;
    let normalizer: Normalizer;
    export function init(){
        normalizer = new Normalizer(30);
    }

    function read_moisture_sensor() {
        pins.analogWritePin(AnalogPin.P0, 1023);
        let reading = pins.analogReadPin(AnalogPin.P1);
        //dry soil should cause reduced value
        pins.analogWritePin(AnalogPin.P0, 0);
        basic.showString("R" + reading.toString());
        let normalized_val = normalizer.add_reading(reading);
        basic.pause(pause_period);
        basic.showString("N" + normalized_val.toString());
        return normalized_val;
    }

    function water() {
        pins.digitalWritePin(DigitalPin.P1, 0);
        basic.pause(watering_period);
        pins.digitalWritePin(DigitalPin.P1, 1);
    }

    basic.forever(function on_forever() {
        //turn off pump by default
        pins.digitalWritePin(DigitalPin.P1, 1);

        let normalized_val = read_moisture_sensor();
        if (normalized_val < threshold) {
            water();
        }
    })
}




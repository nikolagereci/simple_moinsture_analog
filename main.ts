led.setBrightness(8)

class Normalizer{
    size: number;               //field length
    normalized_val: number;     //calculated normalized value
    Q: number[];

    constructor(){
        this.size = 30;
        this.normalized_val = 0;
        this.Q.fill(1023);
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

basic.forever(function on_forever() {
    pins.analogWritePin(AnalogPin.P0, 1023)
    let reading = pins.analogReadPin(AnalogPin.P1)
    pins.analogWritePin(AnalogPin.P0, 0)
    basic.showString("" + ("" + reading))
    basic.pause(5000)
})
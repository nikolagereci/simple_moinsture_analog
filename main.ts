//  /add a reading and return the normalized value 
function add_reading(x: number, size: number, Q: number[]): number {
    if (Q.length == size) {
        Q.shift()
    }
    Q.push(x)
    let sum2 = 0
    Q.forEach(function on_for_each(item: any, index: any) {

        sum2 += item
    })
    let normalized_val = sum2 / Q.length
    return normalized_val
}

function read_moisture_sensor(pause_period: number, size: number, Q: number[]) {
    pins.analogWritePin(AnalogPin.P0, 1023);
    let reading = pins.analogReadPin(AnalogPin.P1);
    //dry soil should cause reduced value
    pins.analogWritePin(AnalogPin.P0, 0);
    basic.showString("R" + reading.toString());
    let normalized_val = add_reading(reading, size, Q);
    basic.pause(pause_period);
    basic.showString("N" + normalized_val.toString());
    return normalized_val;
}

function water(watering_period: number, size2: number, Q2: number[]) {
    pins.digitalWritePin(DigitalPin.P2, 0);
    basic.pause(watering_period);
    pins.digitalWritePin(DigitalPin.P2, 1);
    for (let i = 0; i < size2; i++) {
        Q2[i] = 1023
    }
}

basic.forever(function on_forever() {
    let size2 = 30
    let Q2 = []
    let threshold = 800;
    let watering_period = 60000; //default watering period is one minute
    let pause_period = 5000;
    for (let i = 0; i < size2; i++) {
        Q2[i] = 1023
    }
    //turn off pump by default
    pins.digitalWritePin(DigitalPin.P2, 1);
    while (true) {
        let normalized_val = read_moisture_sensor(pause_period, size2, Q2);
        if (normalized_val < threshold) {
            water(watering_period, size2, Q2);
        }
    }
})

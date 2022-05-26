led.setBrightness(8)
basic.forever(function on_forever() {
    pins.analogWritePin(AnalogPin.P0, 1023)
    let reading = pins.analogReadPin(AnalogPin.P1)
    queue.push(Math.trunc(reading))
    pins.analogWritePin(AnalogPin.P0, 0)
    basic.showString("" + ("" + reading))
    basic.pause(5000)
})
// pushes into queue of defined len, returns queue avg
let queue = [parseInt]
function normalise(x: number): number {
    return 5 * x
}


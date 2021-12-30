let reading = 0
led.setBrightness(8)
basic.forever(function () {
    pins.analogWritePin(AnalogPin.P0, 1023)
    reading = pins.analogReadPin(AnalogPin.P1)
    pins.analogWritePin(AnalogPin.P0, 0)
    basic.showString("" + (reading))
    basic.pause(5000)
})

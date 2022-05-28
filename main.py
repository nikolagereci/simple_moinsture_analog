from collections import deque

led.set_brightness(8)

def on_forever():
    pins.analog_write_pin(AnalogPin.P0, 1023)
    reading = pins.analog_read_pin(AnalogPin.P1)
    pins.analog_write_pin(AnalogPin.P0, 0)
    basic.show_string("" + str((reading)))
    basic.pause(5000)
basic.forever(on_forever)
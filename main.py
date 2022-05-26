from collections import deque

led.set_brightness(8)

def on_forever():
    pins.analog_write_pin(AnalogPin.P0, 1023)
    reading = pins.analog_read_pin(AnalogPin.P1)
    queue.push(int(reading))
    pins.analog_write_pin(AnalogPin.P0, 0)
    basic.show_string("" + str((reading)))
    basic.pause(5000)
basic.forever(on_forever)

#pushes into queue of defined len, returns queue avg
queue = deque('asd')
LEN = 20
def normalise(reading):
    if queue.length < LEN:
        queue.apend(reading)
    else:
        queue.(None)



    
  queue.push(reading)
  queue = [int]
  return 5 * x
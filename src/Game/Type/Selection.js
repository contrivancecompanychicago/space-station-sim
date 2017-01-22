//@flow

import type Point from 'Game/Point'
import type Rect from 'Game/Rect'

//
export type Selection = {
  start: Point,
  end: Point,
  rect: Rect,
  button: number
}

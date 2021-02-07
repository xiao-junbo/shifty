import { Tweenable } from './tweenable'
import Sequence from './sequence'

let sequence, tweenable

beforeEach(() => {
  tweenable = new Tweenable()
  sequence = new Sequence(tweenable)
})

describe('constructor', () => {
  test('stores internal Tweenable', () => {
    expect(sequence.tweenable).toBe(tweenable)
  })
})

describe('add', () => {
  test('stores steps', () => {
    const step1 = () => {}
    const step2 = () => {}

    sequence.add(step1, step2)

    expect(sequence.steps).toHaveLength(2)
  })
})

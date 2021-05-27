import Ship from './Ship';

test('Returns an object', () => {
  const testShip = Ship();
  expect(testShip).toMatchObject({});
});

test('Has a function hit()', () => {
  const testShip = Ship();
  expect(testShip).toMatchObject({
    hit: expect.any(Function),
  });
});

test('Sets up the right number of pegs', () => {
  const testShip = Ship(3);
  expect(testShip.pegs.length).toBe(3);
});

test('Takes hit to peg 1', () => {
  const testShip = Ship(3);
  testShip.hit(1);
  expect(testShip).toMatchObject({
    pegs: [0, 1, 0],
  });
});

test('Does not sink when it should not', () => {
  const testShip = Ship(3);
  testShip.hit(1);
  expect(testShip.isSunk()).toBe(false);
});

test('Sinks when it should', () => {
  const testShip = Ship(3);
  testShip.hit(0);
  testShip.hit(1);
  testShip.hit(2);
  expect(testShip.isSunk()).toBe(true);
})
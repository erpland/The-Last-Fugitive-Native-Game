export const tempLevel = {
  code: 1,
  map: [
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  ],
  player: { start_position: [0, 2], startDirection: "LEFT" },
  enemies: [
    {code: 0, start_position: [2, 2], startDirection: "RIGHT" },
    {code:1, start_position:[8,3], startDirection:"RIGHT"},
		{code:2, start_position:[7,0], startDirection:"LEFT"},
		{code:3, start_position:[1,4], startDirection:"LEFT"}
  ],
  step_cap: [
    { code: 3, step: 10 },
    { code: 2, step: 15 },
  ],
  diffculty: 1,
};

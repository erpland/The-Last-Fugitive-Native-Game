export const tempLevel = {
  code: 1,
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
  player: { start_position: [0, 2], startDirection: "UP" },
  enemies: [
    {code: 0, start_position: [2, 2], startDirection: "UP" },
    {code:1, start_position:[8,3], startDirection:"DOWN"},
		{code:2, start_position:[1,1], startDirection:"LEFT"},
		{code:3, start_position:[1,3], startDirection:"LEFT"}
  ],
  step_cap: [
    { code: 3, step: 10 },
    { code: 2, step: 15 },
  ],
  diffculty: 1,
};

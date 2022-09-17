export const tempLevel = {
  id: "",
  code: 1,
  map: [
    [0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  ],
  player: { start_position: [2, 4], startDirection: "RIGHT" },
  enemies: [
    { code: 0, start_position: [0, 0], startDirection: "RIGHT" },
    { code: 1, start_position: [2, 2], startDirection: "RIGHT" },
    { code: 2, start_position: [5, 0], startDirection: "LEFT" },
  ],
  step_cap: [
    { code: 3, step: 10 },
    { code: 2, step: 15 },
  ],
  diffculty: 1,
  end_point: [3, 12],
};

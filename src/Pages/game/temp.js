export const tempLevel =  {
  code:1,
	map:
	[
		[1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0],
		[1,0,0,0,0,0,0,0,0],
		[1,0,0,0,0,0,0,0,0],
		[1,0,0,0,0,0,0,0,0],
		[1,1,1,1,1,1,1,1,1]
	],
	player:{start_position:[1,2], startDirection:"DOWN"},
	enemies:[
		{code:0, start_position:[6,4], startDirection:"UP"},
		{code:1, start_position:[3,6], startDirection:"LEFT"}
	],
	step_cap:[{code:3,step:10},{code:2,step:15}],
	diffculty:1
}
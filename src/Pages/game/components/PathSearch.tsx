class Node {
  isWall: boolean;
  constructor(cellData: number) {
    this.isWall = cellData === 1 ? true : false;
  }
}

class Graph {
  rows: number;
  columns: number;
  matrix: { [key: string]: Node };
  enemies: number[][];
  start: string;
  end: string;
  constructor(cellArr: number[][], start = "", end = "", enemies = []) {
    this.rows = cellArr.length;
    this.columns = cellArr[0].length;
    this.matrix = {};
    this.start = start;
    this.end = end;
    this.enemies = enemies;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const key = `${i}_${j}`;
        this.matrix[key] = new Node(cellArr[i][j]);
      }
    }
  }
  setEnd(end: string) {
    this.end = end;
  }
  setStart(start: string) {
    this.start = start;
  }
  setEnemies(enemies: number[][]) {
    this.enemies = enemies;
  }
  getChildren(node: string) {
    let [i_str, j_str] = node.split("_");
    let i = parseInt(i_str);
    let j = parseInt(j_str);

    let children: string[] = [];
    let di_dj_arr = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    const enemiesDirections = this.enemies.map((enemy, index) => {
      return [
        { x: enemy[1] + 1, y: enemy[0] },
        { x: enemy[1] - 1, y: enemy[0] },
        { x: enemy[1], y: enemy[0] + 1 },
        { x: enemy[1], y: enemy[0] - 1 },
      ];
    });

    di_dj_arr.forEach(([di, dj]) => {
      if (
        i + di >= 0 &&
        j + dj >= 0 &&
        i + di < this.rows &&
        j + dj < this.columns &&
        this.validPlayerMove(i, j, di, dj, enemiesDirections) &&
        !this.matrix[`${i + di}_${j + dj}`].isWall
      ) {
        children.push(`${i + di}_${j + dj}`);
      }
    });

    return children;
  }
  validPlayerMove(
    y: number,
    x: number,
    di: number,
    dj: number,
    enemiesDirections: { x: number; y: number }[][]
  ) {
    if (this.enemies.length === 0) {
      return true;
    }
    for (let enemy of enemiesDirections) {
      for (let pos of enemy) {
        if ((pos.x === x + dj && pos.y === y) || (pos.x === x && pos.y === y + di)) {
          return false;
        }
      }
    }
    return true;
  }
  startAlgorithm() {
    let visited: string[] = [];
    let parents: { [key: string]: string | null } = {};
    let found = false;
    
    let pendingNodes = [];
    pendingNodes.push(this.start);
    parents[this.start] = null;

    while (pendingNodes.length) {
      let currNode = pendingNodes[0];

      if (currNode === this.end) {
        visited.push(this.end);
        found = true;
        break;
      }

      let children = this.getChildren(currNode);

      let unvisitedChildren = children.filter((child) => !visited.includes(child));

      for (let i = 0; i < unvisitedChildren.length; i++) {
        parents[unvisitedChildren[i]] = currNode;
        if (!pendingNodes.includes(unvisitedChildren[i])) pendingNodes.push(unvisitedChildren[i]);
      }

      visited.push(currNode);
      pendingNodes.shift();
    }

    if (!found) {
      return {
        exploredNodes: visited,
        path: [],
        found,
      };
    }

    let path = [this.end.split("_")];
    let parent = parents[this.end];
    while (parent) {
      path.push(parent.split("_"));
      parent = parents[parent];
    }

    path.reverse();

    return {
      exploredNodes: visited,
      path,
      found,
    };
  }
}

export default Graph;

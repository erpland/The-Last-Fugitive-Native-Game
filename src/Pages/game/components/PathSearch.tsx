//מציאת המסלול הקצר ביותר
//  האלגוריתם משמש ל2 פעולות שונות במשחק
// א. חישוב רמזים לשחקן - מציאת המסלול הקצר ביותר ליציאה
// מבלי לעבור במשבצת צמודה לאוייב (אם אפשרי)
// ב. חישוב הצעד הבא של האוייב - מציאת המסלול הקצר ביותר
// למיקום הנוכחי של השחקן

//מחלקת נוד
// מכילה תכונה האם המשבצת היא מכשול או לא
// (אם המשבצת היא מכשול לא נרצה לקחת אותה בחשבון לתזוזה חוקית)
class Node {
  isCollider: boolean;
  constructor(cellData: number) {
    this.isCollider = cellData === 1 ? true : false;
  }
}
//מחלקת גרף - יצירת אובייקט המכיל את לוח המשחק
// שורות ועמודות
// מיקומי האוייבים ונקודת סוף והתחלה
// מערך האוייבים משמש לחישוב רמזים לשחקן
class Graph {
  rows: number;
  columns: number;
  matrix: { [key: string]: Node };
  enemies: number[][];
  start: string;
  end: string;
  //בנאי המחלקה - בניית האובייקט
  constructor(cellArr: number[][], start = "", end = "", enemies = []) {
    this.rows = cellArr.length;
    this.columns = cellArr[0].length;
    this.matrix = {};
    this.start = start;
    this.end = end;
    this.enemies = enemies;
    // עבור המטריצה נייצר מפתח המכיל את אינדקס השורה והעמודה הנוכחית
    // עבור כל מפתח נייצר אובייקט מסוג נוד המייצג את התא הנוכחי במפה
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const key = `${i}_${j}`;
        this.matrix[key] = new Node(cellArr[i][j]);
      }
    }
  }
  // פונקציות סט - להשמה של נקודות ציון נוכחיות
  //    ציון נקודת סוף - מציינת מיקום שחקן נוכחי / נקודת סיום שלב
  setEnd(end: string) {
    this.end = end;
  }
  //    ציון נקודת התחלה - מציינת מיקום אויב נוכחי / מיקום שחקן
  setStart(start: string) {
    this.start = start;
  }
  // ציון מיקום האוייבים הנוכחי במידה ואובייקט המפעיל הוא שחקן
  setEnemies(enemies: number[][]) {
    this.enemies = enemies;
  }
  // מציאת והחזרת כל משבצות הילדים התקינות לתנועה
  getChildren(node: string) {
    //חילוץ ציר הוואי וציר האיקס של המיקום הנוכחי
    let [rowStr, colStr] = node.split("_");
    let currentY = parseInt(rowStr);
    let currentX = parseInt(colStr);

    //יצירת מערך ריק שיכיל את הילדים הוולידים
    let children: string[] = [];

    // מערך המכיל את כל האפשרויות לצעד הבא
    // כלמר למעלה למטה ימינה שמאלה -- תמיד מינוס או פלוס אחד
    let movesArr = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    // מיפוי כל המשבצות הסמוכות לאוייב
    // משמש לאלגוריתם רמזים לשחקן
    // בכדי לא להתקל במשבצת סמוכה לאוייב
    const enemiesDirections = this.enemies.map((enemy, index) => {
      return [
        { x: enemy[1] + 1, y: enemy[0] },
        { x: enemy[1] - 1, y: enemy[0] },
        { x: enemy[1], y: enemy[0] + 1 },
        { x: enemy[1], y: enemy[0] - 1 },
      ];
    });

    // מעבר על כל מערך הצעדים  הבאים ובדיקת תקינות
    // האם ניתן לנוע אליהם
    movesArr.forEach(([nextY, nextX]) => {
      // אם הצעד הנוכחי תקין נדחוף אותו למערך הילדים
      if (
        currentY + nextY >= 0 && // בדיקה שלא יצאנו מגבולות המפה למעלה
        currentX + nextX >= 0 && // בדיקה שלא יצאנו מגבולות המפה משמאל
        currentY + nextY < this.rows && // בדיקה שלא יצאנו מגבולות המפה למטה
        currentX + nextX < this.columns && // בידקה שלא יצאנו מגבולות המפה מימין
        // בדיקת וולידיות תנועת שחקן משמש רק לרמזים בבדיקת צעד אויב תמיד יהיה אמת
        this.validPlayerMove(currentY, currentX, nextY, nextX, enemiesDirections) &&
        // בדיקה האם הצעד הבא אינו מכשול
        !this.matrix[`${currentY + nextY}_${currentX + nextX}`].isCollider
      ) {
        // אם הגענו לכאן כלמר שהצעד וולידי לכן נכניס אותו למערך הילדים
        children.push(`${currentY + nextY}_${currentX + nextX}`);
      }
    });

    return children;
  }
  // בדיקת וולידיות צעד של שחקן
  validPlayerMove(
    currentY: number,
    currentX: number,
    nextY: number,
    nextX: number,
    enemiesDirections: { x: number; y: number }[][]
  ) {
    // אם מערך האוייבים ריק כלמר שהאלגוריתם הופעל על ידי אוייב
    // בכדי לחשב את צעדו הבא לכן אין צורך בבדיקה
    // ולכן נחזיר אמת
    if (this.enemies.length === 0) {
      return true;
    }
    //אם הגענו לכאן כלמר שהאלגוריתם הופעל הכדי למצוא רמז
    //ולכן נעבור על כל אפשרות צעד של אוייב
    // אם המשבצת הנוכחית בחישוב המסלול צמודה לאוייב
    // נחזיר שקר כי מעבר דרך המשבצת הזו יגרור פסילה
    for (let enemy of enemiesDirections) {
      for (let pos of enemy) {
        if (
          (pos.x === currentX + nextX && pos.y === currentY) ||
          (pos.x === currentX && pos.y === currentY + nextY)
        ) {
          return false;
        }
      }
    }
    // אם הבדיקה עברה בהצלחה כלמר שזהו צעד ווילידי לכן נחזיר אמת
    return true;
  }

  // פונקציית הפעלת האלגוריתם לחישוב המסלול הקצר ביותר על ידי סריקה רוחבית
  startAlgorithm() {
    // מערך ציון המיקומים שביקרנו בהם - מחסנית
    let visited: string[] = [];

    //אובייקט אשר מייצג משבצות הורים לכל ילד שביקרנו בו
    // המפתח הוא מיקום הילד על המפה והערך בתוך כל אחד הוא ההורה הישיר שלו
    let parents: { [key: string]: string | null } = {};
    // בוליאני האם מצאנו דרך וניתן לסיים את הסריקה
    let found = false;

    // מערך המייצג תור המכילה את המשבצות הבאות שנבדוק
    // מיוצג על ידי תור כדי לשלוף כל פעם את המשבצת הראשונה שנכנסה
    let pendingNodes = [];
    pendingNodes.push(this.start);

    // לנקדות הפתיחה אין הורה רק ילדים
    parents[this.start] = null;

    // לולאת הבדיקה כל עוד יש משבצות לסריקה בתור
    while (pendingNodes.length) {
      // שליפת ראש התור
      let currNode = pendingNodes[0];

      //בדיקת סיום האם מצאנו משבצת שמיקומה שווה  ערך לנקודת הסיום
      // אם מצאנו נצא מהלולאה כי יש לנו מסלול
      if (currNode === this.end) {
        visited.push(this.end);
        found = true;
        break;
      }
      // שמירת הילדים של המשבצת הנוכחית
      let children = this.getChildren(currNode);

      // פילטור מערך משבצות הילדים כדי להוציא מהמערך את המשבצות שביקרנו בהם
      // כלמר שמירת כל המשבצות שלא ביקרנו בהם עדיין במשתנה חדש
      let unvisitedChildren = children.filter((child) => !visited.includes(child));

      // מעבר על כל הילדים שלא ביקרנו בהם
      // שמירת ההורה לכל ילד
      // אם הילדים לא קיימים עדיין בתור המשבצות לסריקה
      // נכניס אותם בכדי לסרוק אותם בסיבובים הבאים
      for (let i = 0; i < unvisitedChildren.length; i++) {
        parents[unvisitedChildren[i]] = currNode;
        if (!pendingNodes.includes(unvisitedChildren[i])) {
          pendingNodes.push(unvisitedChildren[i]);
        }
      }
      // הכנסת המשבצת הנוכחית למערך המשבצות שביקרנו בהם
      // מכיוון שסיימנו לבדוק אותו
      visited.push(currNode);
      // מחיקת ראש התור כי אין צורך בו כבר
      pendingNodes.shift();
    }
    // אם לאחר סיום הלולאה לא נמצא מסלול
    // נחזיר אובייקט המכיל מסלול ריק
    // (החזרת המשבצות שביקרנו בהם והאם נמצאה דרך היא בשביל צורכי בדיקה)
    if (!found) {
      return {
        path: [],
        exploredNodes: visited,
        found,
      };
    }
    // אם נמצא מסלול
    // חילוץ המסלול - הפיכתו למערך דו ממדי
    // אשר כל תא פנימי יכיל משבצת במסלול
    // על ידי שירשור ההורים לאחור
    let path = [this.end.split("_")];
    let parent = parents[this.end];
    // לולאה לשירשור המשבצות הבאות במסלול
    while (parent) {
      path.push(parent.split("_"));
      parent = parents[parent];
    }
    // המסלול התקבל מהסוף להתחלה לכן נהפוך אותו לצורכי נוחות
    path.reverse();
    //החזרת המסלול
    //(החזרת המשבצות שביקרנו בהם והאם נמצאה דרך היא בשביל צורכי בדיקה)
    return {
      path,
      exploredNodes: visited,
      found,
    };
  }
}

export default Graph;

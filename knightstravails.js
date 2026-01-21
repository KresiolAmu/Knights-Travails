class Vertex {
    constructor(position, previous = null) {
        this.position = position;
        this.previous = previous;
    }
}

function knightMoves(start, end) {
    if (start === null || end === null) return `Invalid arguments`;
    if (!Array.isArray(start) || !Array.isArray(end)) return `Arguments should be array`;
    if (start.length > 2 || end.length > 2) return `Only two indexx is allowed in arguments`;

    const graphSize = 8;

    checkCoordinateValidity = function (coordinates) {
        if (
            coordinates[0] < 0 ||
            coordinates[0] > graphSize - 1 ||
            coordinates[1] < 0 ||
            coordinates[1] > graphSize - 1
        ) {
            return false;
        }
        return true;
    };

    calculatePossibleMoves = function (current) {
        const possibleMoves = [
            [1, 2],
            [2, 1],
            [2, -1],
            [1, -2],
            [-1, -2],
            [-2, -1],
            [-2, 1],
            [-1, 2],
        ];

        possibleMoves.forEach((combination) => {
            const tryMove = [current.position[0] + combination[0], current.position[1] + combination[1]];
            if (checkCoordinateValidity(tryMove) && matrix[tryMove[0]][tryMove[1]] !== 1) {
                const newMove = new Vertex(tryMove, current);
                queue.push(newMove);
                matrix[tryMove[0]][tryMove[1]] = 1;
            }
        });
    };

    checkCoordinateValidity(start);
    checkCoordinateValidity(end);

    const row = new Array(graphSize).fill(0);
    const matrix = row.map(() => new Array(graphSize).fill(0));

    const queue = [];
    let match = false;

    const startVertex = new Vertex(start);
    queue.push(startVertex);

    while (queue.length > 0 && match === false) {
        let current = queue.shift();
        if (current.position[0] === end[0] && current.position[1] === end[1]) {
            const path = [];
            while (current !== null) {
                path.push(current.position);
                current = current.previous;
                match = true;
            }
            return path.reverse();
        }
        calculatePossibleMoves(current);
    }
}

console.log(knightMoves([0, 0], [7, 7]));

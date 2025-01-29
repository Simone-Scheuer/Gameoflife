const patterns = {
  Glider: [
    [1, 0],
    [2, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ],
  LWSS: [
    [0, 1],
    [0, 2],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [4, 1],
    [4, 2],
    [3, 3],
  ],
  Pulsar: [
    [2, 4],
    [2, 5],
    [2, 6],
    [2, 10],
    [2, 11],
    [2, 12],
    [4, 2],
    [5, 2],
    [6, 2],
    [10, 2],
    [11, 2],
    [12, 2],
    [4, 7],
    [5, 7],
    [6, 7],
    [10, 7],
    [11, 7],
    [12, 7],
    [4, 9],
    [5, 9],
    [6, 9],
    [10, 9],
    [11, 9],
    [12, 9],
    [4, 14],
    [5, 14],
    [6, 14],
    [10, 14],
    [11, 14],
    [12, 14],
    [14, 4],
    [14, 5],
    [14, 6],
    [14, 10],
    [14, 11],
    [14, 12],
  ],
  // To create a new pattern, define a new key for the pattern name and assign it an array of coordinates.
  // Each coordinate is an array representing the position of a live cell relative to the top-left corner of the pattern.
  // For example, to create a new pattern called "MyPattern", you would do the following:
  /*
  MyPattern: [
    [x1, y1], // First live cell
    [x2, y2], // Second live cell
    // Add more cells as needed
  ],
  */
  horse: [
    [0,4],
    [1,2],[1,3],[1,4],[1,5],
    [2,1],[2,2],[2,3],[2,4],[2,5],[2,6],
    [3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],[3,11],[3,12], [3,13],
    [4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10],[4,11],[4,12], [4,13], [4,14],
    [5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],[5,11],[5,12], [5,14],[5,15], [5,16],
    [6,1],[6,4],[6,5],[6,6],[6,7],[6,10],[6,11],[6,12], [6,16],
    [7,4],[7,9], [7,11],[7,12],
    [8,4],[8,9],[8,12],
    [9,4],[9,12],
  ] 
};

export default patterns;

var backgroundColour, nodeColour, edgeColour; //used for background, and color of lines and nodes when in wireframe
var nodeSize = 8; //size of the nodes
var wireFramer = false; // if wireframe is on
var createCuboid = function (x, y, z, w, h, d, colorOut=[0,0,0]) { // cuboid object
    var colors = colorOut; //color of cuboid
  var nodes = [ // node equations in cuboid
    [x, y, z],
    [x, y, z + d],
    [x, y + h, z],
    [x, y + h, z + d],
    [x + w, y, z],
    [x + w, y, z + d],
    [x + w, y + h, z],
    [x + w, y + h, z + d],
  ];
  var edges = [ // edges fiven from p5
    [0, 1],
    [1, 3],
    [3, 2],
    [2, 0],
    [4, 5],
    [5, 7],
    [7, 6],
    [6, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];
  var faces = [ // faces given from p5
    [0, 1, 3, 2],
    [4, 6, 7, 5],
    [0, 2, 6, 4],
    [1, 5, 7, 3],
    [2, 3, 7, 6],
    [0, 4, 5, 1],
  ];
  return { nodes: nodes, edges: edges, faces: faces, colors: colors}; // returns all the objects values
};
function mousePressed() { // when pressed turn on wireframe
  wireFramer = true;
}
function mouseReleased() { // when released turn off wirefram
  wireFramer = false;
}
var shape1, shape2, shape3;
var shapes = [];
// Rotate shape around the z-axis
var rotateZ3D = function (theta, nodes) { //taken from slides
  var sinTheta = sin(theta);
  var cosTheta = cos(theta);
  for (var n = 0; n < nodes.length; n++) {
    var node = nodes[n];
    var x = node[0];
    var y = node[1];
    node[0] = x * cosTheta - y * sinTheta;
    node[1] = y * cosTheta + x * sinTheta;
  }
};
// rotate shape around y ax
var rotateY3D = function (theta, nodes) { // taken from sldies
  var sinTheta = sin(theta);
  var cosTheta = cos(theta);
  for (var n = 0; n < nodes.length; n++) {
    var node = nodes[n];
    var x = node[0];
    var z = node[2];
    node[0] = x * cosTheta - z * sinTheta;
    node[2] = z * cosTheta + x * sinTheta;
  }
};
//rotate shape around x axiss
var rotateX3D = function (theta, nodes) { //taken from slides
  var sinTheta = sin(theta);
  var cosTheta = cos(theta);
  for (var n = 0; n < nodes.length; n++) {
    var node = nodes[n];
    var y = node[1];
    var z = node[2];
    node[1] = y * cosTheta - z * sinTheta;
    node[2] = z * cosTheta + y * sinTheta;
  }
};
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  backgroundColour = color(255, 255, 255);
  nodeColour = color(1, 1, 1);
  edgeColour = color(1, 1, 1);

  //base
  shape1 = createCuboid(-100, 40, 0, 200, 100, 150, [120, 75, 10]); // base of building
  shape2 = createCuboid(-80, -60, -50, 200, 100, 200, [120, 75, 10]); // second floor
  //ledges
  shape3 = createCuboid(120, 20, -50, 50, 20, 200, [200, 200, 200]); // ledges around building
  shape4 = createCuboid(-130, 20, -90, 300, 20, 40, [200, 200, 200]);
  shape5 = createCuboid(-130, 20, -50, 50, 20, 200, [200, 200, 200]);
  //railling
  shape6 = createCuboid(-130, -10, -90, 5, 30, 5, [1, 1, 1]); // railings and top hand grip
  shape7 = createCuboid(-130, -10, -60, 5, 30, 5,  [1, 1, 1]);
  shape8 = createCuboid(-130, -10, -30, 5, 30, 5,  [1, 1, 1]);
  shape9 = createCuboid(-130, -10, 0, 5, 30, 5, [1, 1, 1]);
  shape10 = createCuboid(-130, -10, 30, 5, 30, 5,  [1, 1, 1]);
  shape11 = createCuboid(-130, -10, 60, 5, 30, 5,  [1, 1, 1]);
  shape12 = createCuboid(-130, -10, 90, 5, 30, 5,  [1, 1, 1]);
  shape13 = createCuboid(-130, -10, 120, 5, 30, 5,  [1, 1, 1]);
  shape14 = createCuboid(-130, -10, 145, 5, 30, 5,  [1, 1, 1]);
  shape15 = createCuboid(-130, -15, -90, 5, 5, 240,  [1, 1, 1]);

  shape16 = createCuboid(165, -10, -90, 5, 30, 5,  [1, 1, 1]);
  shape17 = createCuboid(165, -10, -60, 5, 30, 5,  [1, 1, 1]);
  shape18 = createCuboid(165, -10, -30, 5, 30, 5, [1, 1, 1]);
  shape19 = createCuboid(165, -10, 0, 5, 30, 5,  [1, 1, 1]);
  shape20 = createCuboid(165, -10, 30, 5, 30, 5,  [1, 1, 1]);
  shape21 = createCuboid(165, -10, 60, 5, 30, 5,  [1, 1, 1]);
  shape22 = createCuboid(165, -10, 90, 5, 30, 5,  [1, 1, 1]);
  shape23 = createCuboid(165, -10, 120, 5, 30, 5,  [1, 1, 1]);
  shape24 = createCuboid(165, -10, 145, 5, 30, 5,  [1, 1, 1]);
  shape25 = createCuboid(165, -15, -90, 5, 5, 240,  [1, 1, 1]);

  shape26 = createCuboid(-100, -10, -90, 5, 30, 5,  [1, 1, 1]);
  shape27 = createCuboid(-70, -10, -90, 5, 30, 5,  [1, 1, 1]);
  shape28 = createCuboid(-40, -10, -90, 5, 30, 5,  [1, 1, 1]);
  shape29 = createCuboid(-10, -10, -90, 5, 30, 5,  [1, 1, 1]);
  shape30 = createCuboid(20, -10, -90, 5, 30, 5,  [1, 1, 1]);
  shape31 = createCuboid(50, -10, -90, 5, 30, 5, [1, 1, 1]);
  shape32 = createCuboid(80, -10, -90, 5, 30, 5,  [1, 1, 1]);
  shape33 = createCuboid(110, -10, -90, 5, 30, 5,  [1, 1, 1]);
  shape34 = createCuboid(140, -10, -90, 5, 30, 5,  [1, 1, 1]);
  shape35 = createCuboid(-130, -15, -90, 300, 5, 5,  [1, 1, 1]);
  
  shape36 = createCuboid(140, -10, 145, 5, 30, 5,  [1, 1, 1]);
  shape37 = createCuboid(-100, -10, 145, 5, 30, 5,  [1, 1, 1]);
  shape38 = createCuboid(-130, -15, 145, 50, 5, 5,  [1, 1, 1])
  shape39 = createCuboid(120, -15, 145, 50, 5, 5,  [1, 1, 1])
    
    //windows and door
  shape40 = createCuboid(50, -50, -60, 40, 40, 8, [150, 150, 150]);
  shape41 = createCuboid(0, -50, -60, 40, 40, 8, [150, 150, 150]);
  shape42 = createCuboid(-50, -50, -60, 40, 40, 8, [150, 150, 150]);
  shape43 = createCuboid(-60, 60, -10, 30, 80, 8, [150, 150, 150]); //door
  shape44 = createCuboid(-30, 60, -10, 30, 80, 8, [150, 150, 150]); // door
  shape45 = createCuboid(40, 60, -10, 30, 40, 8, [150, 150, 150]);
  //backside
  shape46 = createCuboid(50, -50, 150, 40, 40, 8, [150, 150, 150]);
  shape47 = createCuboid(0, -50, 150, 40, 40, 8, [150, 150, 150]);
  shape48 = createCuboid(-50, -50, 150, 40, 40, 8, [150, 150, 150]);
  shape49 = createCuboid(40, 60, 150, 30, 40, 8, [150, 150, 150]);
    shape50 = createCuboid(-90, 60, 150, 30, 40, 8, [150, 150, 150]);
    shape51 = createCuboid(-30, 60, 150, 30, 40, 8, [150, 150, 150]);
  //roof!
    shape52 = createCuboid(-90, -70, -70, 250, 10, 250, [100, 100, 100]);
    shape53 = createCuboid(-60, -80, -50, 200, 10, 200, [100, 100, 100]);
    shape54 =  createCuboid(-60, -120, -50, 20, 40, 20, [50, 50, 50]); // chimney
  //side
  shape55 = createCuboid(-88, -40, 0, 8, 40, 40, [150, 150, 150]);
    shape56 = createCuboid(-88, -40, 80, 8, 40, 40, [150, 150, 150]);
    shape57 = createCuboid(120, -40, 0, 8, 40, 40, [150, 150, 150]);
  shape58 = createCuboid(120, -40, 80, 8, 40, 40, [150, 150, 150]);
  shapes = [ //shape array used to hold all cuboid objects
    shape1, 
    shape2,
    shape3,
    shape4,
    shape5,
    shape6,
    shape7,
    shape8,
    shape9,
    shape10,
    shape11,
    shape12,
    shape13,
    shape14,
    shape15,
    shape16,
    shape17,
    shape18,
    shape19,
    shape20,
    shape21,
    shape22,
    shape23,
    shape24,
    shape25,
    shape26,
    shape27, 
    shape28,
    shape29,
    shape30,
    shape31,
    shape32,
    shape33,
    shape34,
    shape35,
    shape36,
    shape37,
    shape38,
    shape39,
    shape40,
    shape41,
    shape42,
    shape43,
    shape44,
    shape45,
    shape46,
    shape47,
    shape48,
    shape49,
    shape50,
    shape51,
    shape52,
    shape53,
    shape54,
    shape55,
    shape56,
    shape57,
    shape58
  ];
}
var draw = function () {
  background(125);
  var nodes, edges, faces, skippedFaces, aVec, bVec, cVec, dir; // makes the temp variables
  let shapesCopy = [...shapes]; 
  let orderedShapes = [];
  push(); // starts push
  translate(200, 200); // move object to center of screen
  noStroke(); // no outline on buildings
  let zs = []; // size of shapes
  for (let i = 0; i < shapes.length; i++) {
    nodes = shapes[i].nodes;
    zs[i] = (nodes[0][2] + nodes[7][2]) / 2; // adds shapes to zs
  }
  let index, maxVal; // create variables
  while (zs.length) { // while lengght greater than 0
    index = 0; // set insex
    maxVal = zs[0]; // set max
    for (let i = 1; i < zs.length; i++) { // add more to maxVal
      if (zs[i] > maxVal) {
        index = i;
        maxVal = zs[i];
      }
    }
    orderedShapes.push(shapesCopy[index]); //push the shapes
    shapesCopy.splice(index, 1); // remove the shapess from copy
    zs.splice(index, 1); // remove the shapes from zs
  }
  for (var shapeNum = 0; shapeNum < orderedShapes.length; shapeNum++) {
    nodes = orderedShapes[shapeNum].nodes; // create nodes
    edges = orderedShapes[shapeNum].edges; // create edges 
    faces = orderedShapes[shapeNum].faces; //create faces
        let colorOut = orderedShapes[shapeNum].colors; // make colors of buildings
    for (var f = 0; f < faces.length; f++) { 
      if (wireFramer) { // if wireframe is true
        stroke(edgeColour); // add a stroke
        for (var edgeCount = 0; edgeCount < edges.length; edgeCount++) { // mark the edges and nodes
          var nodePoint0 = edges[edgeCount][0];
          var nodePoint1 = edges[edgeCount][1];
          var node0 = nodes[nodePoint0];
          var node1 = nodes[nodePoint1];
          line(node0[0], node0[1], node1[0], node1[1]); // make the edges and nodes points into a line
        }
        stroke(nodeColour); // add a stroke for node color
        for (var nodeCount = 0; nodeCount < nodes.length; nodeCount++) {
          var node = nodes[nodeCount];
          ellipse(node[0], node[1], nodeSize, nodeSize); // draw he ellipse at the ndoes
        }
      }
      //otherwise draw faces
      else {
        aVec = createVector( // vectZ
          nodes[faces[f][0]][0],
          nodes[faces[f][0]][1],
          nodes[faces[f][0]][2]
        );
        bVec = createVector( // becty
          nodes[faces[f][1]][0],
          nodes[faces[f][1]][1],
          nodes[faces[f][1]][2]
        );
        cVec = createVector( //vectz
          nodes[faces[f][2]][0],
          nodes[faces[f][2]][1],
          nodes[faces[f][2]][2]
        );
        dir = p5.Vector.cross( // directions we are facing
          p5.Vector.sub(cVec, aVec),
          p5.Vector.sub(bVec, aVec)
        );
        if (dir.z > 0 && (shapeNum != 1 || f > 1)) {
          let face_tint = [
            (f % 2) * 255,
            (round(f / 2) % 2) * 255,
            (round(f / 4) % 2) * 255,
          ]
          fill(colorOut[0] + face_tint[0] / 10, colorOut[1] + face_tint[1] / 10, colorOut[2] + face_tint[2] / 10);
          beginShape(); // make the shapes according to the cuboid
          for (let i = 0; i < faces[f].length; i++) {
            let pointer = nodes[faces[f][i]];
            vertex(pointer[0], pointer[1]);
          }
          endShape(); // end of shape
        }
      }
    }

  }
  pop();
};
mouseDragged = function () { // when mouse is dragged
  var dx = mouseX - pmouseX; // set the current x
  var dy = mouseY - pmouseY; //set the curreny y
  for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) { // for evey shape
    var nodes = shapes[shapeNum].nodes; // for each node in the shape
    rotateY3D(dx, nodes); // rotate by y
    rotateX3D(dy, nodes);  // rotate by x
  }
};

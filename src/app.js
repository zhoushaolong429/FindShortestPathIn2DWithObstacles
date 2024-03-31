import * as THREE from 'three'
import { AxesHelper, BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, SphereGeometry, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'  //lil-gui更加丝滑但是我没有找到removeFolder的方法，所以还是用dat.gui
import * as dat from 'dat.gui'

let scene, camera, renderer, controls;
let gui = new dat.GUI();

// 在cmd父文件夹目录下输入 yarn start 启动应用，然后访问localhost:1234
// 现假设起点终点途经点的z坐标都相同，即都在同一个xy平面内
// 建议按照GUI提示顺序，从上至下输入模型数据，尽量不要回头更改，否则有小概率出现意料之外的bug，刷新页面重新输入即可
// 每生成一次路径，若需要在生成另一组数据的路径，必须刷新页面，否则可能会有bug
// 在浏览器控制台可以看到具体输出数据

// 初始化场景
function initScene() {
    scene = new Scene();
    // 初始化光源

    // const light = new THREE.AmbientLight(0x404040); // 柔和的白光 这个光源没有阴影，不真实
    // scene.add(light);

    // //平行光
    // const light = new THREE.DirectionalLight( 0xffffff, 1 );
    // light.position.set( -1, 1, 1 ); //default; light shining from top
    // light.castShadow = true; // default false
    // scene.add( light );

    // 环境光
    const ambient = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambient);
    // 聚光灯
    const sportLight = new THREE.SpotLight(0xffffff, 0.3);
    sportLight.position.set(-200, 350, 0);
    sportLight.angle = Math.PI / 6;
    sportLight.penumbra = 0.2; //边缘羽化
    scene.add(sportLight);

    const sportLight2 = new THREE.SpotLight(0xffffff, 0.3);
    sportLight2.position.set(-200, -350, 0);
    sportLight2.angle = Math.PI / 6;
    sportLight2.penumbra = 0.2; //边缘羽化
    scene.add(sportLight2);
}

// 初始化相机
function initCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(10, 25, 60);
}

// 初始化渲染器
function initRenderer() {
    // renderer = new WebGLRenderer({ antialias: true });  // 设置抗锯齿之后会卡，我的电脑带不动
    renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // 背景颜色
    renderer.setClearColor(0xffffff, 1);

    document.body.appendChild(renderer.domElement);
}

// 初始化坐标系
function initAxesHelper() {
    const axesHelper = new AxesHelper(100);
    scene.add(axesHelper);
}

// 初始化轨道控制器
function initOrbitControls() {
    controls = new OrbitControls(camera, renderer.domElement);
}

// 初始化必要场景物件
function init() {
    initScene();
    initCamera();
    initRenderer();
    initAxesHelper();
    initOrbitControls();
}
init();

/* **************************************************************************************************** */

// 定义柜子类
class Cabinet {
    constructor() {
        this.depth = 10;
        this.width = 8;
        this.height = 22;
        this.thickness = 0.3;
    }
}

// 生成一个柜子
function makeACabinet(cabinetInstance) {
    let cabinet = cabinetInstance;
    let cabinetGroup1 = new THREE.Group();
    const g1 = new BoxGeometry(cabinet.depth, cabinet.thickness, cabinet.thickness);
    const g2 = new BoxGeometry(cabinet.thickness, cabinet.height, cabinet.thickness);
    const g3 = new BoxGeometry(cabinet.thickness, cabinet.thickness, cabinet.width);
    let material = new THREE.MeshPhysicalMaterial({
        color: 0xc0c0c0,
    });

    cube1_1 = new Mesh(g1, material);
    cube1_2 = new Mesh(g1, material);
    cube1_3 = new Mesh(g1, material);
    cube1_4 = new Mesh(g1, material);

    cube2_1 = new Mesh(g2, material);
    cube2_2 = new Mesh(g2, material);
    cube2_3 = new Mesh(g2, material);
    cube2_4 = new Mesh(g2, material);

    cube3_1 = new Mesh(g3, material);
    cube3_2 = new Mesh(g3, material);
    cube3_3 = new Mesh(g3, material);
    cube3_4 = new Mesh(g3, material);

    cube1_1.position.set(cabinet.depth / 2, 0, 0);
    cube1_2.position.set(cabinet.depth / 2, 0, cabinet.width);
    cube1_3.position.set(cabinet.depth / 2, cabinet.height, 0);
    cube1_4.position.set(cabinet.depth / 2, cabinet.height, cabinet.width);

    cube2_1.position.set(0, cabinet.height / 2, 0);
    cube2_2.position.set(cabinet.depth, cabinet.height / 2, 0);
    cube2_3.position.set(0, cabinet.height / 2, cabinet.width);
    cube2_4.position.set(cabinet.depth, cabinet.height / 2, cabinet.width);

    cube3_1.position.set(0, 0, cabinet.width / 2);
    cube3_2.position.set(cabinet.depth, 0, cabinet.width / 2);
    cube3_3.position.set(0, cabinet.height, cabinet.width / 2);
    cube3_4.position.set(cabinet.depth, cabinet.height, cabinet.width / 2);

    cabinetGroup1.add(cube1_1);
    cabinetGroup1.add(cube1_2);
    cabinetGroup1.add(cube1_3);
    cabinetGroup1.add(cube1_4);

    cabinetGroup1.add(cube2_1);
    cabinetGroup1.add(cube2_2);
    cabinetGroup1.add(cube2_3);
    cabinetGroup1.add(cube2_4);

    cabinetGroup1.add(cube3_1);
    cabinetGroup1.add(cube3_2);
    cabinetGroup1.add(cube3_3);
    cabinetGroup1.add(cube3_4);

    cabinetGroup1.castShadow = true;

    return cabinetGroup1;
}

function updateCabinet(cabinetGroup, cabinet) {
    scene.remove(cabinetGroup);
    cabinetGroup = makeACabinet(cabinet);
    scene.add(cabinetGroup);
    return cabinetGroup;
}

let cabinet = new Cabinet();
let cabinetGroup = makeACabinet(cabinet);
scene.add(cabinetGroup);

// GUI 调整柜子尺寸
let cabinetFold = gui.addFolder("柜架尺寸");
cabinetFold.add(cabinet, 'depth').onChange(function (value) {
    cabinet.depth = value;
    cabinetGroup = updateCabinet(cabinetGroup, cabinet);
}).name("柜架深");
cabinetFold.add(cabinet, 'width').onChange(function (value) {
    cabinet.width = value;
    cabinetGroup = updateCabinet(cabinetGroup, cabinet);
}).name("柜架宽");
cabinetFold.add(cabinet, 'height').onChange(function (value) {
    cabinet.height = value;
    cabinetGroup = updateCabinet(cabinetGroup, cabinet);
}).name("柜架高");

/* **************************************************************************************************** */

// 定义点
class Point {
    constructor() {
        this.xCoordinate = 0;
        this.yCoordinate = 0;
        this.zCoordinate = 4;
        this.dir = "";
    }
}

let sPoint = new Point();
sPoint.xCoordinate = 0;
sPoint.yCoordinate = 0;
sPoint.zCoordinate = 4;
sPoint.dir = '';

let ePoint = new Point();
ePoint.xCoordinate = 10;
ePoint.yCoordinate = 20;
ePoint.zCoordinate = 4;
ePoint.dir = '';

// 定义点集合类
class AllPoints {
    constructor() {
        this.start;
        this.end;
        this.waypoints = [];
    }
}
var allPoints = new AllPoints();
allPoints.start = sPoint;
allPoints.end = ePoint;

function transferDir(dir) {
    if (dir == 'x') {
        return [1, 0, 0];
    } else if (dir == 'y') {
        return [0, 1, 0];
    } else if (dir == 'z') {
        return [0, 0, 1];
    } else {
        return [];
    }
    // else {
    //     alert("请输入'x'、'y'或'z'");
    // }
}

function makeAllPointsGroup(allPoints) {
    let allPointsGroup1 = new THREE.Group();
    sah = makeAnArrow([allPoints.start.xCoordinate, allPoints.start.yCoordinate,
    allPoints.start.zCoordinate], transferDir(allPoints.start.dir));
    ss = makeAPoint([allPoints.start.xCoordinate, allPoints.start.yCoordinate,
    allPoints.start.zCoordinate]);
    // allPointsGroup1.add(sah);
    allPointsGroup1.add(ss);

    eah = makeAnArrow([allPoints.end.xCoordinate, allPoints.end.yCoordinate,
    allPoints.end.zCoordinate], transferDir(allPoints.end.dir));
    es = makeAPoint([allPoints.end.xCoordinate, allPoints.end.yCoordinate,
    allPoints.end.zCoordinate]);
    // allPointsGroup1.add(eah);
    allPointsGroup1.add(es);

    for (let i = 0; i < allPoints.waypoints.length; i++) {
        wah = makeAnArrow([allPoints.waypoints[i].xCoordinate, allPoints.waypoints[i].yCoordinate,
        allPoints.waypoints[i].zCoordinate], transferDir(allPoints.waypoints[i].dir));
        ws = makeAPoint([allPoints.waypoints[i].xCoordinate, allPoints.waypoints[i].yCoordinate,
        allPoints.waypoints[i].zCoordinate]);
        // allPointsGroup1.add(wah);
        allPointsGroup1.add(ws);
    }

    return allPointsGroup1;
}
let allPointsGroup = makeAllPointsGroup(allPoints);
scene.add(allPointsGroup);

// GUI 生成起点终点和若干途经点
let pointFolder = gui.addFolder("生成起点终点和若干途经点");

let startFolder = pointFolder.addFolder("起点");
startFolder.add(sPoint, "xCoordinate").onChange(function (value) {
    allPoints.start = sPoint;
    allPointsGroup = updateAllPoints(allPointsGroup, allPoints);
}).name("起点的x坐标");
startFolder.add(sPoint, "yCoordinate").onChange(function (value) {
    allPoints.start = sPoint;
    allPointsGroup = updateAllPoints(allPointsGroup, allPoints);
}).name("起点的y坐标");
startFolder.add(sPoint, "zCoordinate").onChange(function (value) {
    allPoints.start = sPoint;
    allPointsGroup = updateAllPoints(allPointsGroup, allPoints);
}).name("起点的z坐标");
// startFolder.add(sPoint, "dir").onChange(function (value) {
//     allPoints.start = sPoint;
//     allPointsGroup = updateAllPoints(allPointsGroup, allPoints);
// }).name("起点的方向");

let endFolder = pointFolder.addFolder("终点");
endFolder.add(ePoint, "xCoordinate").onChange(function (value) {
    allPoints.end = ePoint;
    allPointsGroup = updateAllPoints(allPointsGroup, allPoints);
}).name("终点的x坐标");
endFolder.add(ePoint, "yCoordinate").onChange(function (value) {
    allPoints.end = ePoint;
    allPointsGroup = updateAllPoints(allPointsGroup, allPoints);
}).name("终点的y坐标");
endFolder.add(ePoint, "zCoordinate").onChange(function (value) {
    allPoints.end = ePoint;
    allPointsGroup = updateAllPoints(allPointsGroup, allPoints);
}).name("终点的z坐标");
// endFolder.add(ePoint, "dir").onChange(function (value) {
//     allPoints.end = ePoint;
//     allPointsGroup = updateAllPoints(allPointsGroup, allPoints);
// }).name("终点的方向");

wayFolder = pointFolder.addFolder("途经点");
let objButton = {
    addAWaypointInGUI: addAWaypointInGUI,
    removeLastWaypointInGUI: removeLastWaypointInGUI,
}
var waypointCount = 0;
wayFolderArray = [];
function addAWaypointInGUI() {
    let wp = new Point();
    waypointCount++;
    waypointTempFolder = wayFolder.addFolder("途经点" + waypointCount);
    wayFolderArray.push(waypointTempFolder);
    allPoints.waypoints.push(wp);
    waypointTempFolder.add(wp, "xCoordinate").onChange(function (value) {
        allPoints.waypoints[waypointCount - 1] = wp;
        allPointsGroup = updateAllPoints(allPointsGroup, allPoints);
    }).name("x坐标");
    waypointTempFolder.add(wp, "yCoordinate").onChange(function (value) {
        allPoints.waypoints[waypointCount - 1] = wp;
        allPointsGroup = updateAllPoints(allPointsGroup, allPoints);
    }).name("y坐标");
    waypointTempFolder.add(wp, "zCoordinate").onChange(function (value) {
        allPoints.waypoints[waypointCount - 1] = wp;
        allPointsGroup = updateAllPoints(allPointsGroup, allPoints);
    }).name("z坐标");
    // waypointTempFolder.add(wp, "dir").onChange(function (value) {
    //     allPoints.waypoints[waypointCount - 1] = wp;
    //     allPointsGroup = updateAllPoints(allPointsGroup, allPoints);
    // }).name("方向");
}
function removeLastWaypointInGUI() {
    if (waypointCount > 0) {
        waypointCount--;
        waypointTempFolder = wayFolderArray.pop();
        allPoints.waypoints.pop();
        wayFolder.removeFolder(waypointTempFolder);
        allPointsGroup = updateAllPoints(allPointsGroup, allPoints);
    }
}
wayFolder.add(objButton, "addAWaypointInGUI").name("点击添加途经点");
wayFolder.add(objButton, "removeLastWaypointInGUI").name("点击删除最后一个途经点");

function updateAllPoints(allPointsGroup, allPoints) {
    scene.remove(allPointsGroup);
    allPointsGroup = makeAllPointsGroup(allPoints);
    scene.add(allPointsGroup);
    return allPointsGroup;
}

// 生成一个箭头，输入向量起点和方向
function makeAnArrow(start, dir) {
    dirVector = new THREE.Vector3(dir[0], dir[1], dir[2])
    startVector = new THREE.Vector3(start[0], start[1], start[2])
    dirVector.normalize();
    let length = 2;
    let hex = 0x000000;
    let arrowHelper = new THREE.ArrowHelper(dirVector, startVector, length, hex);
    return arrowHelper;
}

// 生成一个黄点
function makeAPoint(point) {
    let material = new THREE.MeshBasicMaterial({
        color: 0x0000FF,
    });
    let sphereG = new SphereGeometry(0.2, 32, 16);
    tempSphere = new THREE.Mesh(sphereG, material);
    tempSphere.position.set(point[0], point[1], point[2]);
    return tempSphere;
}

/* ****************************************************************************************************************** */

// 定义障碍物,假定障碍物均为长方体，障碍物的坐标指的是障碍物最靠近原点的那个点的坐标
class Obstacle {
    constructor() {
        this.xCoordinate = 0;
        this.yCoordinate = 0;
        this.zCoordinate = 0;
        this.length = 2;
        this.width = 8;
        this.height = 2;
    }
}
// 生成一个障碍物，假定障碍物均为长方体，给定长方体靠近原点的那个点的坐标，以及障碍物的长宽高，生成这个障碍物
function makeAnObstacleInstance(obstacle) {
    let obG = new BoxGeometry(obstacle.length, obstacle.height, obstacle.width)
    let material = new THREE.MeshLambertMaterial({
        color: 0x00ff00,
    });
    ob = new Mesh(obG, material)
    ob.position.set(obstacle.xCoordinate + obstacle.length / 2,
        obstacle.yCoordinate + obstacle.height / 2, obstacle.zCoordinate + obstacle.width / 2);
    return ob;
}

var allObstacles = [];

function makeAllObstaclesGroup(allObstacles) {
    let allObstaclesGroup1 = new THREE.Group();
    for (let i = 0; i < allObstacles.length; i++) {
        let obTemp = makeAnObstacleInstance(allObstacles[i]);
        allObstaclesGroup1.add(obTemp);
    }
    return allObstaclesGroup1;
}
var allObstaclesGroup = makeAllObstaclesGroup(allObstacles);
scene.add(allObstaclesGroup);

class SafeDistance {
    constructor() {
        this.value = 0;
    }
}

// GUI 生成若干障碍物
let safeDistance = new SafeDistance();
let obstacleFolder = gui.addFolder("生成若干障碍物");
let objButton2 = {
    addAObstacleInGUI: addAObstacleInGUI,
    removeLastObstacleInGUI: removeLastObstacleInGUI
}
obstacleFolder.add(safeDistance, "value").name("安全距离").onChange(function (value) {
    myModel.safeDistance = safeDistance.value;
    myModel.obstaclesArray = [];
    extendObstacle();
    allObstaclesGroup = updateAllObstacles(allObstaclesGroup, myModel.obstaclesArray);
    // console.log(myModel.obstaclesArray);
});
var obstacleCount = 0;
obFolderArray = [];
obstacleFolder.add(objButton2, "addAObstacleInGUI").name("点击添加障碍物");
obstacleFolder.add(objButton2, "removeLastObstacleInGUI").name("点击删除最后一个障碍物");

function addAObstacleInGUI() {
    let obTemp = new Obstacle();
    obstacleCount++;
    obTempFolder = obstacleFolder.addFolder("障碍物" + obstacleCount);
    obFolderArray.push(obTempFolder);
    allObstacles.push(obTemp);
    allObstaclesGroup = updateAllObstacles(allObstaclesGroup, allObstacles);
    // console.log(allObstacles);
    obTempFolder.add(obTemp, "xCoordinate").onChange(function (value) {
        allObstacles[obstacleCount - 1] = obTemp;
        allObstaclesGroup = updateAllObstacles(allObstaclesGroup, allObstacles);
    }).name("x坐标");
    obTempFolder.add(obTemp, "yCoordinate").onChange(function (value) {
        allObstacles[obstacleCount - 1] = obTemp;
        allObstaclesGroup = updateAllObstacles(allObstaclesGroup, allObstacles);
    }).name("y坐标");
    obTempFolder.add(obTemp, "zCoordinate").onChange(function (value) {
        allObstacles[obstacleCount - 1] = obTemp;
        allObstaclesGroup = updateAllObstacles(allObstaclesGroup, allObstacles);
    }).name("z坐标");
    obTempFolder.add(obTemp, "length").onChange(function (value) {
        allObstacles[obstacleCount - 1] = obTemp;
        allObstaclesGroup = updateAllObstacles(allObstaclesGroup, allObstacles);
    }).name("长");
    obTempFolder.add(obTemp, "width").onChange(function (value) {
        allObstacles[obstacleCount - 1] = obTemp;
        allObstaclesGroup = updateAllObstacles(allObstaclesGroup, allObstacles);
    }).name("宽");
    obTempFolder.add(obTemp, "height").onChange(function (value) {
        allObstacles[obstacleCount - 1] = obTemp;
        allObstaclesGroup = updateAllObstacles(allObstaclesGroup, allObstacles);
    }).name("高");
}

function removeLastObstacleInGUI() {
    if (obstacleCount > 0) {
        obstacleCount--;
        obTempFolder = obFolderArray.pop();
        allObstacles.pop();
        obstacleFolder.removeFolder(obTempFolder);
        allObstaclesGroup = updateAllObstacles(allObstaclesGroup, allObstacles);
    }
}

function updateAllObstacles(allObstaclesGroup, allObstacles) {
    scene.remove(allObstaclesGroup);
    allObstaclesGroup = makeAllObstaclesGroup(allObstacles);
    scene.add(allObstaclesGroup);
    return allObstaclesGroup;
}

/* ***************************************************************************** */

// 生成金属排，给定金属排的宽度和厚度，起点终点（指的是金属排中点），生成一个金属排 point:[x,y,z]
function makeAStrip(stripWidth, stripThickness, stripStartpoint, stripEndpoint) {
    let xDis = stripEndpoint[0] - stripStartpoint[0]
    let yDis = stripEndpoint[1] - stripStartpoint[1]
    if (xDis * yDis >= 0) {
        let len = Math.sqrt(Math.pow(xDis, 2) + Math.pow(yDis, 2))
        let obG = new BoxGeometry(len, stripThickness, stripWidth)
        let material = new THREE.MeshLambertMaterial({
            color: 0xff0000,
        });
        ob = new Mesh(obG, material)
        // 计算向量与xz平面的夹角
        let aVector = [Math.abs(xDis), Math.abs(yDis)]
        let bVector = [1, 0]
        let cosAngle = (aVector[0] * bVector[0] + aVector[1] * bVector[1]) / (len * 1)
        let angleBetweenAB = Math.acos(cosAngle)

        // ob.position.set((stripEndpoint[0] + stripStartpoint[0])/2, (stripEndpoint[1] + stripStartpoint[1])/2, 4);
        // 需要根据厚度以及倾斜角矫正金属排中心点
        ob.position.set((stripEndpoint[0] + stripStartpoint[0]) / 2 - stripThickness * Math.sin(angleBetweenAB) / 2,
            (stripEndpoint[1] + stripStartpoint[1]) / 2 + stripThickness * Math.cos(angleBetweenAB) / 2, 4);
        ob.rotation.z = angleBetweenAB;
        return ob;
    } else if (xDis < 0 && yDis > 0) {
        let len = Math.sqrt(Math.pow(xDis, 2) + Math.pow(yDis, 2))
        let obG = new BoxGeometry(len, stripThickness, stripWidth)
        let material = new THREE.MeshLambertMaterial({
            color: 0xff0000,
        });
        ob = new Mesh(obG, material)
        // 计算向量与xz平面的夹角
        let aVector = [(xDis), (yDis)]
        let bVector = [1, 0]
        let cosAngle = (aVector[0] * bVector[0] + aVector[1] * bVector[1]) / (len * 1)
        let angleBetweenAB = Math.acos(cosAngle)

        // ob.position.set((stripEndpoint[0] + stripStartpoint[0])/2, (stripEndpoint[1] + stripStartpoint[1])/2, 4);
        // 需要根据厚度以及倾斜角矫正金属排中心点
        ob.position.set((stripEndpoint[0] + stripStartpoint[0]) / 2 - stripThickness * Math.sin(angleBetweenAB) / 2,
            (stripEndpoint[1] + stripStartpoint[1]) / 2 + stripThickness * Math.cos(angleBetweenAB) / 2, 4);
        ob.rotation.z = angleBetweenAB;
        return ob;
    } else {
        let len = Math.sqrt(Math.pow(xDis, 2) + Math.pow(yDis, 2))
        let obG = new BoxGeometry(len, stripThickness, stripWidth)
        let material = new THREE.MeshLambertMaterial({
            color: 0xff0000,
        });
        ob = new Mesh(obG, material)
        // 计算向量与xz平面的夹角
        let aVector = [(xDis), (yDis)]
        let bVector = [1, 0]
        let cosAngle = (aVector[0] * bVector[0] + aVector[1] * bVector[1]) / (len * 1)
        let angleBetweenAB = Math.acos(cosAngle)

        // ob.position.set((stripEndpoint[0] + stripStartpoint[0])/2, (stripEndpoint[1] + stripStartpoint[1])/2, 4);
        // 需要根据厚度以及倾斜角矫正金属排中心点
        ob.position.set((stripEndpoint[0] + stripStartpoint[0]) / 2 - stripThickness * Math.sin(angleBetweenAB) / 2,
            (stripEndpoint[1] + stripStartpoint[1]) / 2 + stripThickness * Math.cos(angleBetweenAB) / 2, 4);
        ob.rotation.z = -angleBetweenAB;
        return ob;
    }

}

function makeAllStripsGroupByArray(stripWidth, stripThickness, pointArray) {
    let allStripsGroup = new THREE.Group();
    for (let i = 0; i < pointArray.length - 1; i++) {
        allStripsGroup.add(makeAStrip(stripWidth, stripThickness, pointArray[i], pointArray[i + 1]))
    }
    // console.log(pointArray.length - 1)
    return allStripsGroup;
}

// 金属排厚度和宽度
var stripWidth = 0.8
var stripThickness = 0.1

/* ***************************************************************************** */
// 最短路径算法实现
// 假定起点终点途经点都在同一个xy平面内，Model类表示在xy二维平面中的所有模型表示

class Model {
    constructor() {
        this.allPoints;
        this.obstaclesArray = [];
        this.safeDistance = 0;
        // this.leastDis = 0.2;
    }
}
var myModel = new Model();
myModel.allPoints = allPoints;
myModel.safeDistance = safeDistance.value;
// let priorityFolder = gui.addFolder("优先级选择");
var objButton3 = {
    solve: solve,
    shortestPathFirst: true,
    lessBendingFirst: false,
}
// priorityFolder.add(objButton3, "shortestPathFirst").name("路径短优先");
// priorityFolder.add(objButton3, "lessBendingFirst").name("折弯少优先");
gui.add(objButton3, "solve").name("点击生成路径");

function priorityJudge() {
    if (objButton3.lessBendingFirst && objButton3.shortestPathFirst) {
        alert("请选择优先级的其中一项");
        return;
    } else if ((objButton3.lessBendingFirst || objButton3.shortestPathFirst) == false) {
        alert("请选择优先级的其中一项");
        return;
    }
}

var shortestPathResult = [];
var allStripsGroup = new THREE.Group();


function solve() {
    console.log("-----------------生成最短路径-----------------")
    console.log("model", myModel);
    shortestPathResult = [];
    scene.remove(allStripsGroup);
    myModel.allPoints = allPoints;
    myModel.safeDistance = safeDistance.value;
    myModel.obstaclesArray = [];
    extendObstacle();
    allStripsGroup = oneLastFunction();
    scene.add(allStripsGroup)
    console.log("shortestPathResult", shortestPathResult);
}

function oneLastFunction() {
    // 首先手动将起点添加到路径中
    shortestPathResult.push([myModel.allPoints.start.xCoordinate, myModel.allPoints.start.yCoordinate, myModel.allPoints.start.zCoordinate]);
    // let extendWayPointArray = extendWayPoint();
    if (myModel.allPoints.waypoints.length == 0) {
        let resultABArrayWithoutStart = findShortestPath(myModel.allPoints.start.xCoordinate, myModel.allPoints.start.yCoordinate,
            myModel.allPoints.end.xCoordinate, myModel.allPoints.end.yCoordinate);
        for (let i = 0; i < resultABArrayWithoutStart.length; i++) {
            shortestPathResult.push(resultABArrayWithoutStart[i]);
        }
    } else {
        // 起点到途经点1
        let resultABArrayWithoutStart = findShortestPath(myModel.allPoints.start.xCoordinate, myModel.allPoints.start.yCoordinate,
            myModel.allPoints.waypoints[0].xCoordinate, myModel.allPoints.waypoints[0].yCoordinate);
        for (let i = 0; i < resultABArrayWithoutStart.length; i++) {
            shortestPathResult.push(resultABArrayWithoutStart[i]);
        }
        // 途经点-> 途经点   
        if (myModel.allPoints.waypoints.length > 1) {
            for (let i = 0; i < myModel.allPoints.waypoints.length - 1; i++) {
                resultABArrayWithoutStart = findShortestPath(myModel.allPoints.waypoints[i].xCoordinate, myModel.allPoints.waypoints[i].yCoordinate,
                    myModel.allPoints.waypoints[i + 1].xCoordinate, myModel.allPoints.waypoints[i + 1].yCoordinate);
                for (let i = 0; i < resultABArrayWithoutStart.length; i++) {
                    shortestPathResult.push(resultABArrayWithoutStart[i]);
                }
            }
        }
        // 最后一个途经点到终点
        resultABArrayWithoutStart = findShortestPath(myModel.allPoints.waypoints[myModel.allPoints.waypoints.length - 1].xCoordinate, myModel.allPoints.waypoints[myModel.allPoints.waypoints.length - 1].yCoordinate,
            myModel.allPoints.end.xCoordinate, myModel.allPoints.end.yCoordinate);
        for (let i = 0; i < resultABArrayWithoutStart.length; i++) {
            shortestPathResult.push(resultABArrayWithoutStart[i]);
        }
    }
    return makeAllStripsGroupByArray(stripWidth, stripThickness, shortestPathResult);
}

// 判断一下起点（即所有点）所在的xy平面与障碍物是否相交，将相交的障碍物加入model中
function extendObstacle() {
    let zTemp = myModel.allPoints.start.zCoordinate;
    if (myModel.allPoints.end.zCoordinate != zTemp) {
        alert("抱歉,目前仅支持所有点在同一xy平面内");
    } else {
        for (let i = 0; i < myModel.allPoints.waypoints.length; i++) {
            if (myModel.allPoints.waypoints[i].zCoordinate != zTemp) {
                alert("抱歉,目前仅支持所有点在同一xy平面内");
            }
        }
    }
    // 根据安全距离拓展障碍物，并且将会出现在点所在平面的拓展障碍物挑选出来
    for (let i = 0; i < allObstacles.length; i++) {
        let obTemp = new Obstacle();
        obTemp.xCoordinate = allObstacles[i].xCoordinate - myModel.safeDistance;
        obTemp.yCoordinate = allObstacles[i].yCoordinate - myModel.safeDistance;
        obTemp.zCoordinate = allObstacles[i].zCoordinate - myModel.safeDistance;
        obTemp.length = allObstacles[i].length + 2 * myModel.safeDistance;
        obTemp.width = allObstacles[i].width + 2 * myModel.safeDistance;
        obTemp.height = allObstacles[i].height + 2 * myModel.safeDistance;
        // 判断拓展安全距离后的障碍物是否在起点、终点所在的平面内
        if (!(zTemp - stripWidth / 2 > obTemp.zCoordinate + obTemp.width || zTemp + stripWidth / 2 < obTemp.zCoordinate)) {
            myModel.obstaclesArray.push(obTemp);
        }
    }
}



/* ***************************************************************************** */

function render() {
    // 动画
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render()

/* **************************************** */

// 可以表示线段，也可以表示直线
class LineSegment {
    constructor() {
        this.x1;
        this.y1;
        this.x2;
        this.y2;
    }
}

// 直线的点斜表示法 ax + by = c
class Line {
    constructor() {
        this.a;
        this.b;
        this.c;
    }
}

// 判断两条线段是否相交(注意，以下所有的“相交”都是指交叉相交)
function judgeIntersectionBetweenTwoLineSegment(l1, l2) {
    //快速排斥实验
    if ((l1.x1 > l1.x2 ? l1.x1 : l1.x2) < (l2.x1 < l2.x2 ? l2.x1 : l2.x2) ||
        (l1.y1 > l1.y2 ? l1.y1 : l1.y2) < (l2.y1 < l2.y2 ? l2.y1 : l2.y2) ||
        (l2.x1 > l2.x2 ? l2.x1 : l2.x2) < (l1.x1 < l1.x2 ? l1.x1 : l1.x2) ||
        (l2.y1 > l2.y2 ? l2.y1 : l2.y2) < (l1.y1 < l1.y2 ? l1.y1 : l1.y2)) {
        return false;
    }
    //跨立实验
    if ((((l1.x1 - l2.x1) * (l2.y2 - l2.y1) - (l1.y1 - l2.y1) * (l2.x2 - l2.x1)) *
        ((l1.x2 - l2.x1) * (l2.y2 - l2.y1) - (l1.y2 - l2.y1) * (l2.x2 - l2.x1))) < 0 &&
        (((l2.x1 - l1.x1) * (l1.y2 - l1.y1) - (l2.y1 - l1.y1) * (l1.x2 - l1.x1)) *
            ((l2.x2 - l1.x1) * (l1.y2 - l1.y1) - (l2.y2 - l1.y1) * (l1.x2 - l1.x1))) < 0) {
        return true;
    }
    return false;
}

// 矩形类
class Rectangle2D {
    constructor() {
        this.x;
        this.y;
        this.length;
        this.height;
    }
}

// 判断线段与矩形是否相交
function judgeIntersectionBetweenLineSegmentAndRectangle2D(ls, rtg) {
    let lsRtg = new LineSegment();  // lsrtg表示矩形的四条边
    lsRtg.x1 = rtg.x;
    lsRtg.y1 = rtg.y;
    lsRtg.x2 = rtg.x + rtg.length;
    lsRtg.y2 = rtg.y;
    if (judgeIntersectionBetweenTwoLineSegment(ls, lsRtg)) {
        return true;
    } else {
        lsRtg.x1 = rtg.x;
        lsRtg.y1 = rtg.y;
        lsRtg.x2 = rtg.x;
        lsRtg.y2 = rtg.y + rtg.height;
        if (judgeIntersectionBetweenTwoLineSegment(ls, lsRtg)) {
            return true;
        } else {
            lsRtg.x1 = rtg.x;
            lsRtg.y1 = rtg.y + rtg.height;
            lsRtg.x2 = rtg.x + rtg.length;
            lsRtg.y2 = rtg.y + rtg.height;
            if (judgeIntersectionBetweenTwoLineSegment(ls, lsRtg)) {
                return true;
            } else {
                lsRtg.x1 = rtg.x + rtg.length;
                lsRtg.y1 = rtg.y + rtg.height;
                lsRtg.x2 = rtg.x + rtg.length;
                lsRtg.y2 = rtg.y;
                if (judgeIntersectionBetweenTwoLineSegment(ls, lsRtg)) {
                    return true;
                }
            }
        }
    }
    // 特殊情况：线段的一部分为矩形的对角线
    let xBig, xSmall, yBig, ySmall;
    if (ls.x1 > ls.x2) {
        xBig = ls.x1;
        xSmall = ls.x2;
    } else {
        xBig = ls.x2;
        xSmall = ls.x1;
    }
    if (ls.y1 > ls.y2) {
        yBig = ls.y1;
        ySmall = ls.y2;
    } else {
        yBig = ls.y2;
        ySmall = ls.y1;
    }
    if ((xSmall <= rtg.x && rtg.x <= xBig) && (xSmall <= rtg.x + rtg.length && rtg.x + rtg.length <= xBig)
        && (ySmall <= rtg.y && rtg.y <= yBig) && (ySmall <= rtg.y + rtg.height && rtg.y + rtg.height <= yBig)) {
        let line = transferLine(ls);
        if ((line.a * rtg.x + line.b * rtg.y == line.c) && (line.a * (rtg.x + rtg.length) + line.b * (rtg.y + rtg.height) == line.c)) {
            return true;
        }
        if ((line.a * (rtg.x + rtg.length) + line.b * rtg.y == line.c) && (line.a * rtg.x + line.b * (rtg.y + rtg.height) == line.c)) {
            return true;
        }
    }
    return false;
}

// 判断直线与矩形是否相交，矩形均为边与x轴或y轴平行的矩形,其中line为点斜表示法
function judgeIntersectionBetweenLineAndRectangle2D(line, rtg) {
    // 先判断直线与x轴或y轴平行的情况
    if (line.a == 0) {
        if (rtg.y < line.c && line.c < rtg.y + rtg.height) {
            return true;
        }
    }
    if (line.b == 0) {
        if (rtg.x < line.c && line.c < rtg.x + rtg.length) {
            return true;
        }
    }
    let yTemp1 = (line.c - line.a * rtg.x) / line.b;
    let yTemp2 = (line.c - line.a * (rtg.x + rtg.length)) / line.b;
    if ((rtg.y < yTemp1 && yTemp1 < rtg.y + rtg.height) || (rtg.y < yTemp2 && yTemp2 < rtg.y + rtg.height)) {
        return true;
    }
    let xTemp1 = (line.c - line.b * rtg.y) / line.a;
    let xTemp2 = (line.c - line.b * (rtg.y + rtg.height)) / line.a;
    if ((rtg.x < xTemp1 && xTemp1 < rtg.x + rtg.length) || (rtg.x < xTemp2 && xTemp2 < rtg.x + rtg.length)) {
        return true;
    }
    // 特殊情况：直线为矩形对角线
    if ((line.a * rtg.x + line.b * rtg.y == line.c) && (line.a * (rtg.x + rtg.length) + line.b * (rtg.y + rtg.height) == line.c)) {
        return true;
    }
    if ((line.a * rtg.x + line.b * (rtg.y + rtg.height) == line.c) && (line.a * (rtg.x + rtg.length) + line.b * rtg.y == line.c)) {
        return true;
    }
    return false;
}

// 将直线两点表示法转为点斜表示法(ax+ by = c)
function transferLine(ls) {
    let line = new Line();
    if (ls.x1 == ls.x2) {
        line.a = 1;
        line.b = 0;
        line.c = ls.x1;
        return line;
    }
    if (ls.y1 == ls.y2) {
        line.a = 0;
        line.b = 1;
        line.c = ls.y1;
        return line;
    }
    line.b = 1;
    line.a = -(ls.y2 - ls.y1) / (ls.x2 - ls.x1);
    line.c = line.a * ls.x1 + ls.y1;
    return line;
}

// 求一个点对一个矩阵的边缘可见点（上下两个）
function findEdgeVisiblePoints(point, rtg) {
    let x = point.xCoordinate;
    let y = point.yCoordinate;
    let leftDown = {
        x: rtg.x,
        y: rtg.y
    }
    let leftUp = {
        x: rtg.x,
        y: rtg.y + rtg.height
    }
    let rightDown = {
        x: rtg.x + rtg.length,
        y: rtg.y
    }
    let rightUp = {
        x: rtg.x + rtg.length,
        y: rtg.y + rtg.height
    }
    if (x <= leftDown.x) {
        if (y <= leftDown.y) {
            let returnObj = {
                up: leftUp,
                down: rightDown
            };
            return returnObj;
        } else if (y >= leftUp.y) {
            let returnObj = {
                up: rightUp,
                down: leftDown
            };
            return returnObj;
        } else {
            let returnObj = {
                up: leftUp,
                down: leftDown
            };
            return returnObj;
        }
    } else if (x >= rightDown.x) {
        if (y <= leftDown.y) {
            let returnObj = {
                up: rightUp,
                down: leftDown
            };
            return returnObj;
        } else if (y >= leftUp.y) {
            let returnObj = {
                up: leftUp,
                down: rightDown
            };
            return returnObj;
        } else {
            let returnObj = {
                up: rightUp,
                down: rightDown
            };
            return returnObj;
        }
    } else {
        if (y <= leftDown.y) {
            let returnObj = {
                up: rightDown,
                down: leftDown
            };
            return returnObj;
        } else if (y >= leftUp.y) {
            let returnObj = {
                up: rightUp,
                down: leftUp
            };
            return returnObj;
        } else {
            alert("点在拓展障碍物内部？障碍物有重叠?")
        }
    }

}

// 根据途经点的方向来拓展途经点
// 请用户在添加途经点时自行将一个途经点添加为两个对应方向上相近的两个点
// function extendWayPoint() {
//     let extendWayPointArray = [];
//     for (let i = 0; i < myModel.allPoints.waypoints.length; i++) {

//         if (myModel.allPoints.waypoints[i].dir == 'x') {
//             let pTemp1 = {
//                 x: myModel.allPoints.waypoints[i].xCoordinate - leastDis / 2,
//                 y: myModel.allPoints.waypoints[i].yCoordinate,
//                 z: myModel.allPoints.waypoints[i].zCoordinate
//             }
//             let pTemp2 = {
//                 x: myModel.allPoints.waypoints[i].xCoordinate + leastDis / 2,
//                 y: myModel.allPoints.waypoints[i].yCoordinate,
//                 z: myModel.allPoints.waypoints[i].zCoordinate
//             }
//             extendWayPointArray.push({ pTemp1, pTemp2 });
//         } else if (myModel.allPoints.waypoints[i].dir == 'y') {
//             let pTemp1 = {
//                 x: myModel.allPoints.waypoints[i].xCoordinate,
//                 y: myModel.allPoints.waypoints[i].yCoordinate - leastDis / 2,
//                 z: myModel.allPoints.waypoints[i].zCoordinate
//             }
//             let pTemp2 = {
//                 x: myModel.allPoints.waypoints[i].xCoordinate,
//                 y: myModel.allPoints.waypoints[i].yCoordinate + leastDis / 2,
//                 z: myModel.allPoints.waypoints[i].zCoordinate
//             }
//             extendWayPointArray.push({ pTemp1, pTemp2 });
//         } else {
//             alter("请确定点的方向为x或y");
//         }
//     }
//     return extendWayPointArray;
// }

// 计算两条有相同端点线段的夹角
function angelBetweenTwoLineSegment(ls1, ls2) {
    // 找到相同端点，调整矢量箭头方向
    let xSame, ySame;
    if (ls1.x1 == ls2.x1 && ls1.y1 == ls2.y1) {
        xSame = ls1.x1;
        ySame = ls1.y1;
    } else if (ls1.x1 == ls2.x2 && ls1.y1 == ls2.y2) {
        xSame = ls1.x1;
        ySame = ls1.y1;
        ls2.x2 = ls2.x1;
        ls2.y2 = ls2.y1;
        ls2.x1 = xSame;
        ls2.y1 = ySame;
    } else if (ls1.x2 == ls2.x1 && ls1.y2 == ls2.y1) {
        xSame = ls1.x2;
        ySame = ls1.y2;
        ls1.x2 = ls1.x1;
        ls1.y2 = ls1.y1;
        ls1.x1 = xSame;
        ls1.y1 = ySame;
    } else if (ls1.x2 == ls2.x2 && ls1.y2 == ls2.y2) {
        xSame = ls1.x2;
        ySame = ls1.y2;
        ls1.x2 = ls1.x1;
        ls1.y2 = ls1.y1;
        ls1.x1 = xSame;
        ls1.y1 = ySame;
        ls2.x2 = ls2.x1;
        ls2.y2 = ls2.y1;
        ls2.x1 = xSame;
        ls2.y1 = ySame;
    } else {
        alter("error993:两条线段无公共端点")
    }
    let xDis1 = ls1.x2 - ls1.x1;
    let yDis1 = ls1.y2 - ls1.y1;
    let xDis2 = ls2.x2 - ls2.x1;
    let yDis2 = ls2.y2 - ls2.y1;
    let len1 = Math.sqrt(Math.pow(xDis1, 2) + Math.pow(yDis1, 2));
    let len2 = Math.sqrt(Math.pow(xDis2, 2) + Math.pow(yDis2, 2));
    let cosAngel = (xDis1 * xDis2 + yDis1 * yDis2) / (len1 * len2);
    return Math.acos(cosAngel);
}
// 判断夹角是否大于等于九十度
function judgeAngelMoreThan90(ls1, ls2) {
    if (angelBetweenTwoLineSegment(ls1, ls2) >= Math.PI / 2) {
        return true;
    } else {
        return false;
    }
}

/* **********************************************核心算法代码**************************************************** */

// 找到两点AB之间绕过障碍物的最短路径（从A到B），函数返回一个数组，数组的元素是坐标
function findShortestPath(xA, yA, xB, yB) {
    let pointATemp = new Point();
    let pointBTemp = new Point();

    pointATemp.xCoordinate = xA;
    pointATemp.yCoordinate = yA;
    pointBTemp.xCoordinate = xB;
    pointBTemp.yCoordinate = yB;
    let resultABArray = [];
    let resultABArrayUp = [];
    let resultABArrayDown = [];
    let followingResultArrayUp = [];
    let followingResultArrayDown = [];

    lsAB = new LineSegment();
    lsAB.x1 = xA;
    lsAB.y1 = yA;
    lsAB.x2 = xB;
    lsAB.y2 = yB;
    // 一、求与线段AB相交的障碍物
    let obABIntercrossArray = [];
    let disArray = [];
    for (let i = 0; i < myModel.obstaclesArray.length; i++) {
        let rtgTemp = new Rectangle2D();
        rtgTemp.x = myModel.obstaclesArray[i].xCoordinate;
        rtgTemp.y = myModel.obstaclesArray[i].yCoordinate;
        rtgTemp.length = myModel.obstaclesArray[i].length;
        rtgTemp.height = myModel.obstaclesArray[i].height;
        if (judgeIntersectionBetweenLineSegmentAndRectangle2D(lsAB, rtgTemp)) {
            obABIntercrossArray.push(rtgTemp);
            let rtgCenterX = rtgTemp.x + rtgTemp.length / 2;
            let rtgCenterY = rtgTemp.y + rtgTemp.height / 2;
            let disTemp = Math.pow((xA - rtgCenterX), 2) + Math.pow((yA - rtgCenterY), 2);
            disArray.push({
                dis: disTemp,
                index: obABIntercrossArray.length - 1
            })
        }
    }

    // console.log(obABIntercrossArray)

    // 二、根据相交顺序排序，依次标记为O1、O2...（将障碍物中心点与A的距离以及index记录在一个数组中）
    disArray.sort(compareOb);
    let obABIntercrossArraySorted = [];
    for (let i = 0; i < disArray.length; i++) {
        obABIntercrossArraySorted[i] = obABIntercrossArray[disArray[i].index];
    }

    // 三、根据上下边缘可见点来确定最短路径
    // resultABArray.push([xA, yA, myModel.allPoints.start.zCoordinate])  // 在函数外添加起点
    // AB之间无障碍物，AB为最短路径
    if (obABIntercrossArray.length == 0) {
        resultABArray.push([xB, yB, myModel.allPoints.start.zCoordinate]);
        return resultABArray;
    }
    // 求A对于Oi的边缘可见点
    let flagUp = 0;
    let flagDown = 0;
    for (let i = 0; i < obABIntercrossArraySorted.length; i++) {
        let edgeVisiblePointsA = findEdgeVisiblePoints(pointATemp, obABIntercrossArraySorted[i]);
        // console.log(edgeVisiblePointsA)

        /* *****************************************考虑上边缘可见点****************************************** */

        // 判断直线AP是否与之后的障碍物O2,O3...相交
        let lineAP1 = new LineSegment();
        lineAP1.x1 = xA;
        lineAP1.y1 = yA;
        lineAP1.x2 = edgeVisiblePointsA.up.x;
        lineAP1.y2 = edgeVisiblePointsA.up.y;
        flagUp = 0;
        for (let j = i + 1; j < obABIntercrossArraySorted.length; j++) {
            if (judgeIntersectionBetweenLineAndRectangle2D(transferLine(lineAP1), obABIntercrossArraySorted[j])) {
                // 相交，继续外层for循环，看A对于O2的边缘可见点
                flagUp = 1;
                break;
            }
        }
        // 不相交
        if (flagUp == 0) {
            // pA在最短路径上，将pA加入路径数组中
            resultABArrayUp.push([edgeVisiblePointsA.up.x, edgeVisiblePointsA.up.y, myModel.allPoints.start.zCoordinate]);
            let edgeVisiblePointsB = findEdgeVisiblePoints(pointBTemp, obABIntercrossArraySorted[i]);
            // pA和pB是否为同一点
            // 在此之前先判断下边缘可见点与pA是否同一个点,如果是 交换pB上下边缘可见点的定义
            if ((edgeVisiblePointsB.down.x == edgeVisiblePointsA.up.x) && (edgeVisiblePointsB.down.y == edgeVisiblePointsA.up.y)) {
                let xTemp = edgeVisiblePointsB.up.x;
                let yTemp = edgeVisiblePointsB.up.y;
                edgeVisiblePointsB.up.x = edgeVisiblePointsB.down.x;
                edgeVisiblePointsB.up.y = edgeVisiblePointsB.down.y;
                edgeVisiblePointsB.down.x = xTemp;
                edgeVisiblePointsB.down.y = yTemp;
            }
            // 在此之前还要判断pA和pB是否为障碍物的对角点，由于上下边缘点没有定义左右，故要做此判断，如果为障碍物对角线，则需要交换“上下”边缘可见点的定义
            if ((Math.abs(edgeVisiblePointsB.up.x - edgeVisiblePointsA.up.x) == obABIntercrossArraySorted[i].length) &&
                (Math.abs(edgeVisiblePointsB.up.y - edgeVisiblePointsA.up.y) == obABIntercrossArraySorted[i].height)) {
                let xTemp = edgeVisiblePointsB.up.x;
                let yTemp = edgeVisiblePointsB.up.y;
                edgeVisiblePointsB.up.x = edgeVisiblePointsB.down.x;
                edgeVisiblePointsB.up.y = edgeVisiblePointsB.down.y;
                edgeVisiblePointsB.down.x = xTemp;
                edgeVisiblePointsB.down.y = yTemp;
            }
            if ((edgeVisiblePointsB.up.x == edgeVisiblePointsA.up.x) && (edgeVisiblePointsB.up.y == edgeVisiblePointsA.up.y)) {
                // 是同一点=>线段pA B是否经过障碍物
                let flagUp2 = 0;
                let lsAB2 = new LineSegment();
                lsAB2.x1 = edgeVisiblePointsA.up.x;
                lsAB2.y1 = edgeVisiblePointsA.up.y;
                lsAB2.x2 = xB;
                lsAB2.y2 = yB;
                for (let i = 0; i < myModel.obstaclesArray.length; i++) {
                    let rtgTemp = new Rectangle2D();
                    rtgTemp.x = myModel.obstaclesArray[i].xCoordinate;
                    rtgTemp.y = myModel.obstaclesArray[i].yCoordinate;
                    rtgTemp.length = myModel.obstaclesArray[i].length;
                    rtgTemp.height = myModel.obstaclesArray[i].height;
                    if (judgeIntersectionBetweenLineSegmentAndRectangle2D(lsAB2, rtgTemp)) {
                        flagUp2 = 1;
                        break;
                    }
                }
                if (flagUp2 == 1) {
                    // 线段pA B经过障碍物
                    followingResultArrayUp = findShortestPath(edgeVisiblePointsA.up.x, edgeVisiblePointsA.up.y, xB, yB);
                    for (let i = 0; i < followingResultArrayUp.length; i++) {
                        resultABArrayUp.push(followingResultArrayUp[i]);
                    }
                    // return resultABArrayUp;

                    break;
                } else {
                    // 线段pB B不经过障碍物
                    resultABArrayUp.push([xB, yB, myModel.allPoints.start.zCoordinate]);
                    // return resultABArrayUp;

                    break;
                }
            } else {
                // 不是同一点=>直线pA pB是否经过障碍物
                let lineAB3 = new LineSegment();
                lineAB3.x1 = edgeVisiblePointsA.up.x;
                lineAB3.y1 = edgeVisiblePointsA.up.y;
                lineAB3.x2 = edgeVisiblePointsB.up.x;
                lineAB3.y2 = edgeVisiblePointsB.up.y;
                let flagUp3 = 0;
                for (let j = i; j < obABIntercrossArraySorted.length; j++) {
                    if (judgeIntersectionBetweenLineAndRectangle2D(transferLine(lineAB3), obABIntercrossArraySorted[j])) {
                        // 相交，继续外层for循环，看A对于O2的边缘可见点
                        flagUp3 = 1;
                        break;
                    }
                }
                // 与障碍物相交，则pB不在最短路径上
                if (flagUp3 == 1) {
                    followingResultArrayUp = findShortestPath(edgeVisiblePointsA.up.x, edgeVisiblePointsA.up.y, xB, yB);
                    for (let i = 0; i < followingResultArrayUp.length; i++) {
                        resultABArrayUp.push(followingResultArrayUp[i]);
                    }
                    // return resultABArrayUp;

                    break;
                } else {
                    // 不相交，pB在最短路径上
                    resultABArrayUp.push([edgeVisiblePointsB.up.x, edgeVisiblePointsB.up.y, myModel.allPoints.start.zCoordinate]);
                    followingResultArrayUp = findShortestPath(edgeVisiblePointsB.up.x, edgeVisiblePointsB.up.y, xB, yB);
                    for (let i = 0; i < followingResultArrayUp.length; i++) {
                        resultABArrayUp.push(followingResultArrayUp[i]);
                    }
                    // return resultABArrayUp;

                    break;
                }
            }
        }
    }

    for (let i = 0; i < obABIntercrossArraySorted.length; i++) {
        let edgeVisiblePointsA = findEdgeVisiblePoints(pointATemp, obABIntercrossArraySorted[i]);
        /* *****************************************考虑下边缘可见点****************************************** */

        // 判断直线AP是否与之后的障碍物O2,O3...相交
        let lineAP2 = new LineSegment();
        lineAP2.x1 = xA;
        lineAP2.y1 = yA;
        lineAP2.x2 = edgeVisiblePointsA.down.x;
        lineAP2.y2 = edgeVisiblePointsA.down.y;
        flagDown = 0;
        for (let j = i + 1; j < obABIntercrossArraySorted.length; j++) {
            if (judgeIntersectionBetweenLineAndRectangle2D(transferLine(lineAP2), obABIntercrossArraySorted[j])) {
                // 相交，继续外层for循环，看A对于O2的边缘可见点
                flagDown = 1;
                break;
            }
        }
        // 不相交
        if (flagDown == 0) {
            // pA在最短路径上，将pA加入路径数组中
            resultABArrayDown.push([edgeVisiblePointsA.down.x, edgeVisiblePointsA.down.y, myModel.allPoints.start.zCoordinate]);
            let edgeVisiblePointsB = findEdgeVisiblePoints(pointBTemp, obABIntercrossArraySorted[i]);
            // pA和pB是否为同一点
            // 在此之前先判断上边缘可见点与pA是否同一个点,如果是 交换pB上下边缘可见点的定义
            if ((edgeVisiblePointsB.up.x == edgeVisiblePointsA.down.x) && (edgeVisiblePointsB.up.y == edgeVisiblePointsA.down.y)) {
                let xTemp = edgeVisiblePointsB.up.x;
                let yTemp = edgeVisiblePointsB.up.y;
                edgeVisiblePointsB.up.x = edgeVisiblePointsB.down.x;
                edgeVisiblePointsB.up.y = edgeVisiblePointsB.down.y;
                edgeVisiblePointsB.down.x = xTemp;
                edgeVisiblePointsB.down.y = yTemp;
            }
            // 在此之前还要判断pA和pB是否为障碍物的对角点，由于上下边缘点没有定义左右，故要做此判断，如果为障碍物对角线，则需要交换“上下”边缘可见点的定义
            if ((Math.abs(edgeVisiblePointsB.down.x - edgeVisiblePointsA.down.x) == obABIntercrossArraySorted[i].length) &&
                (Math.abs(edgeVisiblePointsB.down.y - edgeVisiblePointsA.down.y) == obABIntercrossArraySorted[i].height)) {
                let xTemp = edgeVisiblePointsB.up.x;
                let yTemp = edgeVisiblePointsB.up.y;
                edgeVisiblePointsB.up.x = edgeVisiblePointsB.down.x;
                edgeVisiblePointsB.up.y = edgeVisiblePointsB.down.y;
                edgeVisiblePointsB.down.x = xTemp;
                edgeVisiblePointsB.down.y = yTemp;
            }
            if ((edgeVisiblePointsB.down.x == edgeVisiblePointsA.down.x) && (edgeVisiblePointsB.down.y == edgeVisiblePointsA.down.y)) {
                // 是同一点=>线段pA B是否经过障碍物
                let flagDown2 = 0;
                let lsAB2 = new LineSegment();
                lsAB2.x1 = edgeVisiblePointsA.down.x;
                lsAB2.y1 = edgeVisiblePointsA.down.y;
                lsAB2.x2 = xB;
                lsAB2.y2 = yB;
                for (let i = 0; i < myModel.obstaclesArray.length; i++) {
                    let rtgTemp = new Rectangle2D();
                    rtgTemp.x = myModel.obstaclesArray[i].xCoordinate;
                    rtgTemp.y = myModel.obstaclesArray[i].yCoordinate;
                    rtgTemp.length = myModel.obstaclesArray[i].length;
                    rtgTemp.height = myModel.obstaclesArray[i].height;
                    if (judgeIntersectionBetweenLineSegmentAndRectangle2D(lsAB2, rtgTemp)) {
                        flagDown2 = 1;
                        break;
                    }
                }
                if (flagDown2 == 1) {
                    // 线段pA B经过障碍物
                    followingResultArrayDown = findShortestPath(edgeVisiblePointsA.down.x, edgeVisiblePointsA.down.y, xB, yB);
                    for (let i = 0; i < followingResultArrayDown.length; i++) {
                        resultABArrayDown.push(followingResultArrayDown[i]);
                    }
                    // return resultABArrayDown;

                    break;
                } else {
                    // 线段pB B不经过障碍物
                    resultABArrayDown.push([xB, yB, myModel.allPoints.start.zCoordinate]);
                    // return resultABArrayDown;

                    break;
                }
            } else {
                // 不是同一点=>直线pA pB是否经过障碍物
                let lineAB3 = new LineSegment();
                lineAB3.x1 = edgeVisiblePointsA.down.x;
                lineAB3.y1 = edgeVisiblePointsA.down.y;
                lineAB3.x2 = edgeVisiblePointsB.down.x;
                lineAB3.y2 = edgeVisiblePointsB.down.y;
                let flagDown3 = 0;
                for (let j = i; j < obABIntercrossArraySorted.length; j++) {
                    if (judgeIntersectionBetweenLineAndRectangle2D(transferLine(lineAB3), obABIntercrossArraySorted[j])) {
                        // 相交，继续外层for循环，看A对于O2的边缘可见点
                        flagDown3 = 1;
                        break;
                    }
                }
                // 与障碍物相交，则pB不在最短路径上
                if (flagDown3 == 1) {
                    followingResultArrayDown = findShortestPath(edgeVisiblePointsA.down.x, edgeVisiblePointsA.down.y, xB, yB);
                    for (let i = 0; i < followingResultArrayDown.length; i++) {
                        resultABArrayDown.push(followingResultArrayDown[i]);
                    }
                    // return resultABArrayDown;

                    break;
                } else {
                    // 不相交，pB在最短路径上
                    resultABArrayDown.push([edgeVisiblePointsB.down.x, edgeVisiblePointsB.down.y, myModel.allPoints.start.zCoordinate]);
                    followingResultArrayDown = findShortestPath(edgeVisiblePointsB.down.x, edgeVisiblePointsB.down.y, xB, yB);
                    for (let i = 0; i < followingResultArrayDown.length; i++) {
                        resultABArrayDown.push(followingResultArrayDown[i]);
                    }
                    // return resultABArrayDown;

                    break;
                }
            }
        }
    }
    // 上下边缘点都相交 => 继续循环
    // console.log("---")
    // console.log("resultABArrayUp", resultABArrayUp);
    // console.log("resultABArrayDown", resultABArrayDown);

    if (flagUp == 0 && flagDown == 1) {
        return resultABArrayUp;
    } else if (flagUp == 1 && flagDown == 0) {
        return resultABArrayDown;
    } else {
        // 比较up和down哪条路径更短
        let lengthUp = 0;
        let lengthDown = 0;
        lengthUp += distanceBetweenTwoPoints(xA, yA, resultABArrayUp[0][0], resultABArrayUp[0][1]);
        lengthDown += distanceBetweenTwoPoints(xA, yA, resultABArrayDown[0][0], resultABArrayDown[0][1]);
        for (let i = 0; i < resultABArrayUp.length - 1; i++) {
            lengthUp += distanceBetweenTwoPoints(resultABArrayUp[i][0], resultABArrayUp[i][1], resultABArrayUp[i + 1][0], resultABArrayUp[i + 1][1]);
        }
        for (let i = 0; i < resultABArrayDown.length - 1; i++) {
            lengthDown += distanceBetweenTwoPoints(resultABArrayDown[i][0], resultABArrayDown[i][1], resultABArrayDown[i + 1][0], resultABArrayDown[i + 1][1]);
        }
        // console.log("lengthUp", lengthUp);
        // console.log("lengthDown", lengthDown);
        if (lengthUp <= lengthDown) {
            return resultABArrayUp;
        } else {
            return resultABArrayDown;
        }
    }
}

// 计算两点之间的距离
function distanceBetweenTwoPoints(xA, yA, xB, yB) {
    return Math.sqrt(Math.pow((xA - xB), 2) + Math.pow((yA - yB), 2));
}

function compareOb(ob1, ob2) {
    return ob1.dis - ob2.dis;
}
/* ********************************************** */















const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;


//menambahkan plane
var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 100);
var planeMats = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    roughness: 0.5,
    side: THREE.DoubleSide
});

var plane = new THREE.Mesh(planeGeometry, planeMats);
plane.position.y = -50;
plane.rotation.x =  90 * (Math.PI/180);
plane.receiveShadow = true;
scene.add(plane);

//menambahkan cube
var geometry;
var cube;
var material;

var colors = [0x00ff9f, 0x00b8ff, 0x001eff, 0xbd00ff];

var objectAmount = 32;
for(i = 0; i < objectAmount; i++){
    //menambahkan box
    if(i < objectAmount / 2 ){
        geometry = new THREE.BoxGeometry(
            Math.random()*5 + 2, 
            Math.random()*5 + 2, 
            Math.random()*5 + 2);
    }else{
        var segment = 16;
        var radius = Math.random()*5 + 1;
        geometry = new THREE.SphereGeometry(
            radius, segment, segment);
    }
        
    material = new THREE.MeshLambertMaterial( { 
        color: 0x00ff00, 
        roughness: 1,
    } );

    object = new THREE.Mesh( geometry, material );

    var tempColor = (colors[Math.floor(Math.random()*(colors.length))]);
    object.material.color.set(tempColor);
    
    object.castShadow = true;
    
    object.position.x = Math.random()*100 - 50;
    object.position.z = Math.random()*100 - 50;
    object.position.y = Math.random()*50;

    scene.add(object);
}

//menambahkan lightsource
var light = new THREE.AmbientLight( 0xffffff, 0.2 );

var pointLight = new THREE.PointLight( 0xffffff, 1, 400 );
pointLight.position.set(0, 75, 10);
pointLight.castShadow = true;

scene.add(light);
scene.add(pointLight);


//mengubah posisi kamera awal
camera.position.z = 50;
camera.position.y = 25;

// menambah fog
scene.background = new THREE.Color(0xffffff);
scene.fog = new THREE.Fog(0xffffff, 0.01, 1000);

//menambah helper
var axisHelper = new THREE.AxisHelper(50);
scene.add(axisHelper);

var gridHelper = new THREE.GridHelper(1000, 20, 0x888888, 0x888888);
gridHelper.material.opacity = 0.5;
gridHelper.material.transparent = true;
scene.add(gridHelper);

var shadowHelper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(shadowHelper);



//variable pendukung untuk memutar kamera
var count = 0;
const animate = function () {
    count++;
    requestAnimationFrame( animate );

    camera.position.x = Math.cos(count * 0.002)*50;
    camera.position.z = Math.sin(count * 0.002)*50;
    camera.lookAt(0,20,0);

    camera.focus = (Math.sin(count * 0.002) * 5) +5;

    renderer.render( scene, camera );
};

animate();
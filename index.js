let overlay =  document.querySelector('.overlay');
let modal = document.querySelector('.modal');
let speed = 0;

modal.addEventListener('click', function(e){
    if(e.target.classList.contains('easy')){
        speed = 10000000;
        
    }else if(e.target.classList.contains('normal')){
        speed = 500;
    }else if(e.target.classList.contains('hard')){
        speed = 200;
    }
    console.log(speed)
if(e.target.classList.contains('button')){
        modal.style.display = 'none';
   startGame();
     }
})

function startGame(){
    let container =  document.querySelector('.container');
    container.style.display = 'block';

let tetris =  document.createElement('div');
tetris.classList.add('tetris');

for(let i=1; i< 181; i++){
    let excel =  document.createElement('div');
    excel.classList.add('excel');
    tetris.appendChild(excel)
}

let main  =  document.getElementsByClassName('main')[0];
main.appendChild(tetris);

let excel =  document.getElementsByClassName('excel');
let i=0;

for(let y=18; y>0; y--){
    for(let x=1; x < 11; x++){
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        i++;
    }
}

let x = 5 , y = 15;

let mainArr = [            
     [ //line
           //x  y
            [0, 1],
            [0, 2],
            [0, 3],
            //rotate 90 deg
            [
                [-1, 1],
                [0,  0],
                [1, -1],
                [2, -2],
             ],
                 //rotate 180 deg
             [
                 [1, -1],
                 [0,  0],
                 [-1, 1],
                 [-2, 2],
             ],
                 //rotate 270 deg
            [
                [-1, 1],
                [0,  0],
                [1, -1],
                [2, -2],
            ],
                 //rotate 360 deg
             [
                 [1, -1],
                 [0,  0],
                 [-1, 1],
                 [-2, 2],
             ],
    
        ],
          [   
            //  kubik
               [1, 0],
               [0, 1],
               [1, 1],
    
                       //rotate 90 deg
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
                 //rotate 180 deg
             [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
             ],
                 //rotate 270 deg
            [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ],
                 //rotate 360 deg
             [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
             ],
    
           ], 
             [   //letter- L
                [1, 0],
                [0, 1],
                [0, 2], 
                
                       //rotate 90 deg
            [
                [0,  0],
                [-1, 1],
                [1,  0],
                [2, -1],
            ],
                 //rotate 180 deg
             [
                [1, -1],
                [1, -1],
                [-1, 0],
                [-1, 0],
             ],
                 //rotate 270 deg
            [
                [-1, 0],
                [0, -1],
                [2, -2],
                [1, -1],
            ],
                 //rotate 360 deg
             [
                [0, -1],
                [0, -1],
                [-2, 0],
                [-2, 0],
             ],
    ],//done 2pak verjum mek bac skzbum
   
     [  // z rigth
            [1, 0],
            [-1, 1],
            [0,  1],

            [  //r tate 90 deg
                [0, -1],
                [-1, 0],
                [2, -1],
                [1,  0],
            ],   //r tate 180 deg
            [
                [0, 0],
                [1, -1],
                [-2, 0],
                [-1, -1],
             ],
                 //rotate 270 deg
            [
                [0, -1],
                [-1, 0],
                [2, -1],
                [1, 0],
            ],
                 //rotate 360 deg
             [
                [0, 0],
                [1, -1],
                [-2, 0],
                [-1, -1],
         ], 
    ],//done stil this point
            
             [  // lego
                [1, 0],
                [2, 0],
                [1, 1],
                [  //r0tate 90 deg
                    [1,-1],
                    [0, 0],
                    [0, 0],
                    [0, 0],
                ],   //r tate 180 deg
               [
                    [0, 0],
                    [-1, 0],
                    [-1, 0],
                    [1, -1],
                 ],
                     //rotate 270 deg
                [
                    [1, -1],
                    [1, -1],
                    [1, -1],
                    [0, 0],
                ],
                     //rotate 360 deg
                 [
                    [-2, 0],
                    [0, -1],
                    [0, -1],
                    [-1, -1],
                 ],//done stil this point
             ],
]
// console.log(mainArr[1][1][1]);

  let randomFigure = 0;
let figureBody = 0;
let rotate = -1;

function create(){
    function getRandom(){
         return Math.round(Math.random()*(mainArr.length-1))
    }
    randomFigure =  getRandom();
  
   rotate = 1;
    figureBody = [
       
        document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
        document.querySelector(`[posX = "${x + mainArr[randomFigure][0][0]}"][posY = "${y + mainArr[randomFigure][0][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[randomFigure][1][0]}"][posY = "${y + mainArr[randomFigure][1][1]}"]`),
        document.querySelector(`[posX = "${x + mainArr[randomFigure][2][0]}"][posY = "${y + mainArr[randomFigure][2][1]}"]`),
    ]
    for(let i=0; i< figureBody.length; i++){
        
        figureBody[i].classList.add('figure');
    }
}
create();


//  create counter score
let score = 0;
let input =  document.getElementsByTagName('input')[0];
input.value =  `Your Score : ${score}`
function move(){
    let checkMove =true;
    let cordinates =[
        [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY') ],
        [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY') ],
        [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY') ],
        [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY') ],
    ];
    for(let i = 0; i< cordinates.length; i++){
        if(cordinates[i][1] == 1 || document.querySelector(`[posX ="${cordinates[i][0]}"][posY ="${cordinates[i][1] - 1}"]`)
        .classList.contains('freeze') ){
            checkMove = false;
            break;
        }
   }
    if(checkMove){
        for(let i=0; i < figureBody.length; i++){
            figureBody[i].classList.remove('figure');
        }
        figureBody =[
            document.querySelector(`[posX="${cordinates[0][0]}"][posY="${cordinates[0][1] - 1}"] `),
            document.querySelector(`[posX="${cordinates[1][0]}"][posY="${cordinates[1][1] - 1}"] `),
            document.querySelector(`[posX="${cordinates[2][0]}"][posY="${cordinates[2][1] - 1}"] `),
            document.querySelector(`[posX="${cordinates[3][0]}"][posY="${cordinates[3][1] - 1}"] `),
        ];
        for(let i=0; i< figureBody.length; i++){
        
            figureBody[i].classList.add('figure');
        } 
    }else{
        for(let i = 0; i< figureBody.length; i++){
            figureBody[i].classList.remove('figure');
            figureBody[i].classList.add('freeze');
        }
        //remove line when all box is filled
        for(let i=1; i< 15; i++){
            let count = 0;
            for(let k=1; k<11; k++){
                if(document.querySelector(`[posX="${k}"][posY = "${i}"]`).classList.contains('freeze')){
                    count++;
                    if(count ==10){
                        score +=10;
                        input.value =  `Your Score : ${score}`
                       for(let m=1; m<11; m++){
                           document.querySelector(`[posX="${m}"][posY="${i}"]`).classList.remove('freeze');
                       }
                       //after removing line   deqrement y for one
                       let freeze =  document.querySelectorAll('.freeze'); 
                       let newFreeze = [];
                       for(let f=0; f<freeze.length; f++){
                           let freezeCordinates = [freeze[f].getAttribute('posX'), freeze[f].getAttribute('posY')];
                           if(freezeCordinates[1] > i){
                               freeze[f].classList.remove('freeze');
                               newFreeze.push(document.querySelector(`[posX="${freezeCordinates[0]}"][posY = "${freezeCordinates[1]-1}"]`))
                           }
                       }
                       for(let a=0; a<newFreeze.length; a++){
                           newFreeze[a].classList.add('freeze');
                       }
                       i--;
                    }              
                }
            }
        }
        // game over
        for(n=1; n<11; n++){
            if(document.querySelector(`[posX="${n}"][posY = "15"]`).classList.contains('freeze')){
             clearInterval(int);
             alert('game over');
            break;
            }
        }
        create();
    }
}
let int = setInterval(()=>{
    move()
}, speed);



//   move to right and lefth
window.addEventListener('keydown', function(e){
    let checkMoveRigthLeft =true;
   
    let cordinates1 =[figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
    let cordinates2 =[figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
    let cordinates3 =[figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
    let cordinates4 =[figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];
    //console.log(cordinates4)
    function getMoveRigthLeft(a){
        
        
        let figureNew =[
           
            document.querySelector(`[posX="${+cordinates1[0] + a }"][posY="${cordinates1[1]}"] `),
            document.querySelector(`[posX="${+cordinates2[0] + a }"][posY="${cordinates2[1]}"] `),
            document.querySelector(`[posX="${+cordinates3[0] + a }"][posY="${cordinates3[1]}"] `),
            document.querySelector(`[posX="${+cordinates4[0] + a }"][posY="${cordinates4[1]}"] `),
        ];

        
        for(let i=0; i < figureNew.length; i++){
          
            if(!figureNew[i]  ||  figureNew[i].classList.contains('freeze')){
          checkMoveRigthLeft = false;
            }
        }
        if(checkMoveRigthLeft){
            for(let i=0; i < figureBody.length; i++){
                figureBody[i].classList.remove('figure');
    }
   
        figureBody = figureNew;

        for(let i=0; i < figureBody.length; i++){
            figureBody[i].classList.add('figure');
       }
    }
}
    if(e.keyCode == 37){
        getMoveRigthLeft(-1);
    }else if(e.keyCode == 39){
        getMoveRigthLeft(1);
       
    }else if(e.keyCode == 40){
       move();
        //  rotate
    }else if(e.keyCode == 38){



 let   figureNew =[
document.querySelector(`[posX="${+cordinates1[0] + mainArr[randomFigure][rotate+2][0][0]}"][posY="${+cordinates1[1]+mainArr[randomFigure][rotate+2][0][1]}"]`),
document.querySelector(`[posX="${+cordinates2[0] + mainArr[randomFigure][rotate+2][1][0] }"][posY="${+cordinates2[1]+mainArr[randomFigure][rotate+2][1][1]}"] `),
document.querySelector(`[posX="${+cordinates3[0] + mainArr[randomFigure][rotate+2][2][0] }"][posY="${+cordinates3[1]+mainArr[randomFigure][rotate+2][2][1]}"] `),
document.querySelector(`[posX="${+cordinates4[0] + mainArr[randomFigure][rotate+2][3][0] }"][posY="${+cordinates4[1]+mainArr[randomFigure][rotate+2][3][1]}"] `),
        ];
       

  
 
    for(let i=0; i < figureNew.length; i++){
      
            if(!figureNew[i]  ||  figureNew[i].classList.contains('freeze')){
          checkMoveRigthLeft = false;
            }
        }
        if(checkMoveRigthLeft === true){
            for(let i=0; i < figureBody.length; i++){
                figureBody[i].classList.remove('figure');
    }
         figureBody = figureNew;

        for(let i=0; i < figureBody.length; i++){
            figureBody[i].classList.add('figure');
       }
       if(rotate < 4){
           rotate++;
       }else{
           rotate = 1;
       }console.log(rotate)
    }
}
})

}







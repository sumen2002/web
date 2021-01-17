
let com = {
    score : 0, 
    per_shoot2 : 0.5,
    per_shoot3 : 0.33
};

let user = {
    score : 0,
    per_shoot2 : 0.5,
    per_shoot3 : 0.33
};

let turn = '컴퓨터';
let turn_left = 15;
let button = document.getElementsByClassName('button');
//이때, getElementsByClassName은 리턴값을 배열로 저장한다.

function com_shoot(){
    let com_shootType = Math.random()<com.per_shoot2?2:3;
    let score_element = document.getElementById('score_computer');
    if(turn==='사용자'){
        alert(`지금은 ${turn} 차례입니다.`);
    }else{

        AI(); //점수차에 의한 슛 확률 조정 함수
        Shoot(turn,com_shootType,score_element);

        turn = '사용자';
    }
}

function user_shoot(user_shootType){
    let turn_times_element = document.getElementById('shots_left');
    let score_element = document.getElementById('score_user');

    if(turn==='컴퓨터'){
        alert(`지금은 ${turn} 차례입니다.`);
    }else{

        AI();
        Shoot(turn,user_shootType,score_element);

        turn = '컴퓨터';

        turn_left -=1;
        turn_times_element.innerHTML = turn_left;

        if(turn_left===0){
            let game_result = document.getElementById('text');
            
            game_result.innerHTML = '게임이 종료되었습니다. ';
        
            if(user.score<com.score)
                game_result.innerHTML +='컴퓨터가 이겼습니다!';
            else if(user.score>com.score)
                game_result.innerHTML +='당신이 이겼습니다!';
            else 
                game_result.innerHTML +='비겼습니다.';
        
            for(let i=0; i<button.length; i++){
                button[i].disabled = true;
            }
        }
    } 
}

function Shoot(now_text,Type,element){
    let now;
    let com_text = document.getElementById('com_text');
    let user_text = document.getElementById('user_text');
    let shoot_result = document.getElementById('text');

    if(now_text==='컴퓨터'){
        now = com;
        com_text.innerHTML = '컴퓨터';
        user_text.innerHTML = '▶사용자';
    }else{
        now = user;
        com_text.innerHTML = '▶컴퓨터';
        user_text.innerHTML = '사용자';
    }

    let successORfail = Math.random()<now['per_shoot'+Type]?true:false;

    if(successORfail===true){
        now.score += Type;
        element.innerHTML = now.score;
        shoot_result.innerHTML=`${now_text} 이(가) ${Type} 점슛에 성공하였습니다.`;
    }else{
        shoot_result.innerHTML=`${now_text} 이(가) ${Type} 점슛에 실패하였습니다.`;
    }

}

function AI(){

    let diff = user.score-com.score;
    if(diff>5){//사용자가 큰 차이로 이기고 있는 경우
        for(let i=2; i<4; i++){
            com['per_shoot'+i] = 0.6;
            user['per_shoot'+i] = 0.2;
        }
    }else if(diff<-5){//사용자가 큰 차이로 지고 있는 경우
        for(let i=2; i<4; i++){
            com['per_shoot'+i] = 0.2;
            user['per_shoot'+i] = 0.6;
        }
    }else{
        com.per_shoot2 = 0.5;
        com.per_shoot3 = 0.33; 
        user.per_shoot2 = 0.5;
        user.per_shoot3 = 0.33; 
    }
}

//===============create Game==================
myGame.init(1280,960,5);

//===============add Sound==================
myGame.soundManager.load('correct_3', './Resources/Assets/correct.mp3');
myGame.soundManager.load('wrong_4', './Resources/Assets/wrong.wav');
myGame.soundManager.load('lock_5', './Resources/Assets/lock.wav');
myGame.soundManager.load('unlock_6', './Resources/Assets/unlock.wav');
myGame.soundManager.load('put_7', './Resources/Assets/put.wav');
myGame.soundManager.load('win_8', './Resources/Assets/win.wav');
myGame.soundManager.load('door_9', './Resources/Assets/door.wav');
myGame.soundManager.load('meow_1_10', './Resources/Assets/meow_happy.wav');
myGame.soundManager.load('meow_2_11', './Resources/Assets/meow_unhappy.wav');

//===============create Scene================
myGame.sceneManager.createScenes(3);

//===============create States================
myGame.initStateManager({MonsterHappy_42 : false, InstructionRead_43 : false});
var reaction = myGame.reactionSystem;

//===============create Objects==================

var _backdrop_2= Alice.Object.fromImage('./Resources/Assets/backdrop.png');
_backdrop_2.name = '_backdrop_2';
_backdrop_2.anchor.set(0.5, 0.5);
_backdrop_2.x = 640;
_backdrop_2.y = 480;
_backdrop_2.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeClickable( _backdrop_2 );
reaction.makeUnDraggable( _backdrop_2 );
_backdrop_2.visible = true;
myGame.scene(0).addChild(_backdrop_2);

var _Hero1_12= Alice.Object.fromImage('./Resources/Assets/hero1.png');
_Hero1_12.name = '_Hero1_12';
_Hero1_12.anchor.set(0.5, 0.5);
_Hero1_12.x = 410.66666666666663;
_Hero1_12.y = 488;
_Hero1_12.scale.set(1.195814648729447, 1.1757575757575758);
reaction.makeClickable( _Hero1_12 );
reaction.makeUnDraggable( _Hero1_12 );
_Hero1_12.visible = true;
myGame.scene(0).addChild(_Hero1_12);

var _Hero2_13= Alice.Object.fromImage('./Resources/Assets/hero2.png');
_Hero2_13.name = '_Hero2_13';
_Hero2_13.anchor.set(0.5, 0.5);
_Hero2_13.x = 197.33333333333331;
_Hero2_13.y = 472;
_Hero2_13.scale.set(1.12406576980568, 1.103030303030303);
reaction.makeClickable( _Hero2_13 );
reaction.makeUnDraggable( _Hero2_13 );
_Hero2_13.visible = true;
myGame.scene(0).addChild(_Hero2_13);

var _Room_16= Alice.Object.fromImage('./Resources/Assets/room_basic.png');
_Room_16.name = '_Room_16';
_Room_16.anchor.set(0.5, 0.5);
_Room_16.x = 640;
_Room_16.y = 480;
_Room_16.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeClickable( _Room_16 );
reaction.makeUnDraggable( _Room_16 );
_Room_16.visible = true;
myGame.scene(1).addChild(_Room_16);

var _Window1_27= Alice.Object.fromImage('./Resources/Assets/window_day.png');
_Window1_27.name = '_Window1_27';
_Window1_27.anchor.set(0.5, 0.5);
_Window1_27.x = 784;
_Window1_27.y = 242.66666666666666;
_Window1_27.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeClickable( _Window1_27 );
reaction.makeUnDraggable( _Window1_27 );
_Window1_27.visible = true;
myGame.scene(1).addChild(_Window1_27);

var _Door_17= Alice.Object.fromImage('./Resources/Assets/door.png');
_Door_17.name = '_Door_17';
_Door_17.anchor.set(0.5, 0.5);
_Door_17.x = 322.66666666666663;
_Door_17.y = 485.3333333333333;
_Door_17.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeClickable( _Door_17 );
reaction.makeUnDraggable( _Door_17 );
_Door_17.visible = true;
myGame.scene(1).addChild(_Door_17);

var _Monster1_18= Alice.Object.fromImage('./Resources/Assets/monster1.png');
_Monster1_18.name = '_Monster1_18';
_Monster1_18.anchor.set(0.5, 0.5);
_Monster1_18.x = 360;
_Monster1_18.y = 554.6666666666666;
_Monster1_18.scale.set(0.8072562358276644, 0.9022556390977443);
reaction.makeClickable( _Monster1_18 );
reaction.makeUnDraggable( _Monster1_18 );
_Monster1_18.visible = true;
myGame.scene(1).addChild(_Monster1_18);

var _Hero1_19= Alice.Object.fromImage('./Resources/Assets/hero1.png');
_Hero1_19.name = '_Hero1_19';
_Hero1_19.anchor.set(0.5, 0.5);
_Hero1_19.x = 813.3333333333333;
_Hero1_19.y = 512;
_Hero1_19.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeClickable( _Hero1_19 );
reaction.makeUnDraggable( _Hero1_19 );
_Hero1_19.visible = true;
myGame.scene(1).addChild(_Hero1_19);

var _Hero2_20= Alice.Object.fromImage('./Resources/Assets/hero2.png');
_Hero2_20.name = '_Hero2_20';
_Hero2_20.anchor.set(0.5, 0.5);
_Hero2_20.x = 1053.3333333333333;
_Hero2_20.y = 514.6666666666666;
_Hero2_20.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeClickable( _Hero2_20 );
reaction.makeUnDraggable( _Hero2_20 );
_Hero2_20.visible = true;
myGame.scene(1).addChild(_Hero2_20);

var _Bathroom_26= Alice.Object.fromImage('./Resources/Assets/bathroom.png');
_Bathroom_26.name = '_Bathroom_26';
_Bathroom_26.anchor.set(0.5, 0.5);
_Bathroom_26.x = 845.3333333333333;
_Bathroom_26.y = 480;
_Bathroom_26.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeClickable( _Bathroom_26 );
reaction.makeUnDraggable( _Bathroom_26 );
_Bathroom_26.visible = true;
myGame.scene(2).addChild(_Bathroom_26);

var _Arrow_23= Alice.Object.fromImage('./Resources/Assets/arrow_plain.png');
_Arrow_23.name = '_Arrow_23';
_Arrow_23.anchor.set(0.5, 0.5);
_Arrow_23.x = 1098.6666666666665;
_Arrow_23.y = 117.33333333333333;
_Arrow_23.scale.set(0.4752475247524752, 0.46960167714884693);
reaction.makeClickable( _Arrow_23 );
reaction.makeUnDraggable( _Arrow_23 );
_Arrow_23.visible = true;
myGame.scene(1).addChild(_Arrow_23);

var _Box2_34= Alice.Object.fromImage('./Resources/Assets/box2.png');
_Box2_34.name = '_Box2_34';
_Box2_34.anchor.set(0.5, 0.5);
_Box2_34.x = 1050.6666666666665;
_Box2_34.y = 725.3333333333333;
_Box2_34.scale.set(0.7925696594427244, 0.7131782945736433);
reaction.makeClickable( _Box2_34 );
reaction.makeUnDraggable( _Box2_34 );
_Box2_34.visible = true;
myGame.scene(2).addChild(_Box2_34);

var _Doghappy_36= Alice.Object.fromImage('./Resources/Assets/dog_happy.png');
_Doghappy_36.name = '_Doghappy_36';
_Doghappy_36.anchor.set(0.5, 0.5);
_Doghappy_36.x = 1034.6666666666665;
_Doghappy_36.y = 680;
_Doghappy_36.scale.set(0.7055306427503736, 0.7279090113735782);
reaction.makeClickable( _Doghappy_36 );
reaction.makeDraggable( _Doghappy_36 );
_Doghappy_36.visible = false;
myGame.scene(2).addChild(_Doghappy_36);

var _Arrow_37= Alice.Object.fromImage('./Resources/Assets/arrow_plain.png');
_Arrow_37.name = '_Arrow_37';
_Arrow_37.anchor.set(0.5, 0.5);
_Arrow_37.x = 122.66666666666666;
_Arrow_37.y = 128;
_Arrow_37.scale.set(-0.528052805280528, 0.3857442348008385);
reaction.makeClickable( _Arrow_37 );
reaction.makeUnDraggable( _Arrow_37 );
_Arrow_37.visible = true;
myGame.scene(2).addChild(_Arrow_37);


//================interaction=====================

//--------------Click--------------
_Hero2_20.DIY_CLICK = function(){
	myGame.messageBox.startConversation(['Captain: I want to go out! But the monster is blocking my way'], function(){
		});//messageBox end
}//interaction end

//--------------Click--------------
_Monster1_18.DIY_CLICK = function(){
	myGame.messageBox.startConversation(['Monster: I need to find my dog!!'], function(){
		reaction.setState('InstructionRead_43', true);
		});//messageBox end
}//interaction end

//--------------Click--------------
_Box2_34.DIY_CLICK = function(){
	reaction.makeObjVisible(_Doghappy_36);
}//interaction end

//--------------Click--------------
_Doghappy_36.DIY_CLICK = function(){
	reaction.addToInventory(_Doghappy_36);
}//interaction end

//--------------Click--------------
_Door_17.DIY_CLICK = function(){
	if ((myGame.stateManager.states.MonsterHappy_42==true)){
		reaction.transitToScene(0);
		myGame.messageBox.startConversation(['Captain, Iron: Yay!'], function(){
			});//messageBox end
		return;
	}//if statement end
}//interaction end

//-------------USE--------------
myGame.eventSystem.addUsedEvent(_Doghappy_36, _Monster1_18, function(){
	reaction.removeObject(_Doghappy_36);
	myGame.messageBox.startConversation(['Thank you so much!'], function(){
		reaction.removeObject(_Monster1_18);
		reaction.setState('MonsterHappy_42', true);
		});//messageBox end
}); //interaction end

//--------------Click--------------
_Arrow_37.DIY_CLICK = function(){
	reaction.transitToScene(1);
}//interaction end

//--------------Click--------------
_Arrow_23.DIY_CLICK = function(){
	if ((myGame.stateManager.states.InstructionRead_43==true)){
		reaction.transitToScene(2);
		return;
	}//if statement end
}//interaction end

myGame.start(1);
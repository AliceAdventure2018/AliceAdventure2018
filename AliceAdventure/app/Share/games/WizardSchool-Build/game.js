
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
myGame.sceneManager.createScenes(2);

//===============create States================
myGame.initStateManager({HintOpened_25 : false, WandCollected_37 : false});
var reaction = myGame.reactionSystem;

//===============create Objects==================

var _Room_17= Alice.Object.fromImage('./Resources/Assets/room_basic.png');
_Room_17.name = '_Room_17';
_Room_17.anchor.set(0.5, 0.5);
_Room_17.x = 602.6666666666666;
_Room_17.y = 480;
_Room_17.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeClickable( _Room_17 );
reaction.makeUnDraggable( _Room_17 );
_Room_17.visible = true;
myGame.scene(0).addChild(_Room_17);

var _Blackboard_19= Alice.Object.fromImage('./Resources/Assets/blackboard.png');
_Blackboard_19.name = '_Blackboard_19';
_Blackboard_19.anchor.set(0.5, 0.5);
_Blackboard_19.x = 770.6666666666666;
_Blackboard_19.y = 384;
_Blackboard_19.scale.set(0.9331538806639748, 1.138004246284501);
reaction.makeClickable( _Blackboard_19 );
reaction.makeUnDraggable( _Blackboard_19 );
_Blackboard_19.visible = true;
myGame.scene(0).addChild(_Blackboard_19);

var _Hermione_12= Alice.Object.fromImage('./Resources/Assets/wizard_student.png');
_Hermione_12.name = '_Hermione_12';
_Hermione_12.anchor.set(0.5, 0.5);
_Hermione_12.x = 1042.6666666666665;
_Hermione_12.y = 562.6666666666666;
_Hermione_12.scale.set(1.0721649484536082, 0.9379686434901158);
reaction.makeClickable( _Hermione_12 );
reaction.makeUnDraggable( _Hermione_12 );
_Hermione_12.visible = true;
myGame.scene(0).addChild(_Hermione_12);

var _Library_16= Alice.Object.fromImage('./Resources/Assets/library.png');
_Library_16.name = '_Library_16';
_Library_16.anchor.set(0.5, 0.5);
_Library_16.x = 717.3333333333333;
_Library_16.y = 477.3333333333333;
_Library_16.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeClickable( _Library_16 );
reaction.makeUnDraggable( _Library_16 );
_Library_16.visible = true;
myGame.scene(1).addChild(_Library_16);

var _Ron_13= Alice.Object.fromImage('./Resources/Assets/wizard_student2.png');
_Ron_13.name = '_Ron_13';
_Ron_13.anchor.set(0.5, 0.5);
_Ron_13.x = 880;
_Ron_13.y = 560;
_Ron_13.scale.set(1.0721649484536082, 1.0034083162917518);
reaction.makeClickable( _Ron_13 );
reaction.makeUnDraggable( _Ron_13 );
_Ron_13.visible = true;
myGame.scene(0).addChild(_Ron_13);

var _Harry_14= Alice.Object.fromImage('./Resources/Assets/wizard_student3.png');
_Harry_14.name = '_Harry_14';
_Harry_14.anchor.set(0.5, 0.5);
_Harry_14.x = 528;
_Harry_14.y = 570.6666666666666;
_Harry_14.scale.set(1.0446735395189002, 0.9815950920245398);
reaction.makeClickable( _Harry_14 );
reaction.makeUnDraggable( _Harry_14 );
_Harry_14.visible = true;
myGame.scene(0).addChild(_Harry_14);

var _Door_18= Alice.Object.fromImage('./Resources/Assets/door.png');
_Door_18.name = '_Door_18';
_Door_18.anchor.set(0.5, 0.5);
_Door_18.x = 210.66666666666666;
_Door_18.y = 506.66666666666663;
_Door_18.scale.set(1.2719665271966527, 1.223607647547797);
reaction.makeClickable( _Door_18 );
reaction.makeUnDraggable( _Door_18 );
_Door_18.visible = true;
myGame.scene(0).addChild(_Door_18);

var _Magicwand_27= Alice.Object.fromImage('./Resources/Assets/magicwand.png');
_Magicwand_27.name = '_Magicwand_27';
_Magicwand_27.anchor.set(0.5, 0.5);
_Magicwand_27.x = 1152;
_Magicwand_27.y = 885.3333333333333;
_Magicwand_27.scale.set(0.5893186003683241, 0.49544626593806923);
reaction.makeClickable( _Magicwand_27 );
reaction.makeDraggable( _Magicwand_27 );
_Magicwand_27.visible = true;
myGame.scene(0).addChild(_Magicwand_27);

var _Book_30= Alice.Object.fromImage('./Resources/Assets/book.png');
_Book_30.name = '_Book_30';
_Book_30.anchor.set(0.5, 0.5);
_Book_30.x = 477.3333333333333;
_Book_30.y = 512;
_Book_30.scale.set(0.4069611780455154, 0.34519956850053934);
reaction.makeClickable( _Book_30 );
reaction.makeUnDraggable( _Book_30 );
_Book_30.visible = true;
myGame.scene(1).addChild(_Book_30);

var _Computer_31= Alice.Object.fromImage('./Resources/Assets/computer.png');
_Computer_31.name = '_Computer_31';
_Computer_31.anchor.set(0.5, 0.5);
_Computer_31.x = 805.3333333333333;
_Computer_31.y = 354.66666666666663;
_Computer_31.scale.set(0.5121951219512195, 0.5910290237467017);
reaction.makeClickable( _Computer_31 );
reaction.makeUnDraggable( _Computer_31 );
_Computer_31.visible = true;
myGame.scene(1).addChild(_Computer_31);

var _Tweedledee_34= Alice.Object.fromImage('./Resources/Assets/tweedle_dee.png');
_Tweedledee_34.name = '_Tweedledee_34';
_Tweedledee_34.anchor.set(0.5, 0.5);
_Tweedledee_34.x = 466.66666666666663;
_Tweedledee_34.y = 506.66666666666663;
_Tweedledee_34.scale.set(1.3333333333333333, 1.3333333333333333);
reaction.makeClickable( _Tweedledee_34 );
reaction.makeUnDraggable( _Tweedledee_34 );
_Tweedledee_34.visible = false;
myGame.scene(1).addChild(_Tweedledee_34);

var _Wizard3_35= Alice.Object.fromImage('./Resources/Assets/wizard_student3.png');
_Wizard3_35.name = '_Wizard3_35';
_Wizard3_35.anchor.set(0.5, 0.5);
_Wizard3_35.x = 181.33333333333331;
_Wizard3_35.y = 498.66666666666663;
_Wizard3_35.scale.set(1.402061855670103, 1.2760736196319018);
reaction.makeClickable( _Wizard3_35 );
reaction.makeUnDraggable( _Wizard3_35 );
_Wizard3_35.visible = true;
myGame.scene(1).addChild(_Wizard3_35);

var _Book_38= Alice.Object.fromImage('./Resources/Assets/book.png');
_Book_38.name = '_Book_38';
_Book_38.anchor.set(0.5, 0.5);
_Book_38.x = 221.33333333333331;
_Book_38.y = 709.3333333333333;
_Book_38.scale.set(0.856760374832664, 0.8802588996763754);
reaction.makeClickable( _Book_38 );
reaction.makeUnDraggable( _Book_38 );
_Book_38.visible = false;
myGame.scene(1).addChild(_Book_38);


//================interaction=====================

//--------------Click--------------
_Harry_14.DIY_CLICK = function(){
	myGame.messageBox.startConversation(['Harry: I want to have a girlfriend..... '], function(){
		});//messageBox end
}//interaction end

//--------------Click--------------
_Ron_13.DIY_CLICK = function(){
	myGame.messageBox.startConversation(['Ron: I know it"s hard..'], function(){
		});//messageBox end
}//interaction end

//--------------Click--------------
_Door_18.DIY_CLICK = function(){
	if ((myGame.stateManager.states.HintOpened_25==true) &&(myGame.stateManager.states.WandCollected_37==true)){
		reaction.transitToScene(1);
		return;
	}//if statement end
}//interaction end

//--------------Click--------------
_Book_30.DIY_CLICK = function(){
	myGame.messageBox.startConversation([' "Dating Advice for Wizard.....written by David Culyba......"'], function(){
		myGame.messageBox.startConversation(['"......All you can do...is to try  "Iroke Hae Do An" spell on this book......"'], function(){
			});//messageBox end
		});//messageBox end
}//interaction end

//-------------USE--------------
myGame.eventSystem.addUsedEvent(_Magicwand_27, _Book_30, function(){
	myGame.messageBox.startConversation(['Harry: Hope the spell works...!'], function(){
		reaction.removeObject(_Book_30);
		reaction.makeObjVisible(_Tweedledee_34);
		myGame.messageBox.startConversation(['Funny looking guy: Oh Thank you! you just saved me from the curse! Now you will be cursed instead of me! Haha Good luck!'], function(){
			reaction.makeObjInvisible(_Wizard3_35);
			reaction.makeObjVisible(_Book_38);
			reaction.removeObject(_Magicwand_27);
			myGame.messageBox.startConversation(['Funny looking guy: hahahahahahaha!!!!!!!'], function(){
				});//messageBox end
			});//messageBox end
		});//messageBox end
}); //interaction end

//--------------Click--------------
_Magicwand_27.DIY_CLICK = function(){
	reaction.addToInventory(_Magicwand_27);
	reaction.setState('WandCollected_37', true);
}//interaction end

//--------------Click--------------
_Hermione_12.DIY_CLICK = function(){
	myGame.messageBox.startConversation(['Hermione: check out "Dating advice for wizard" in library. It probably helps '], function(){
		reaction.setState('HintOpened_25', true);
		});//messageBox end
}//interaction end

myGame.start(0);
import { TxtQuesInfoModel } from './TxtQuesInfoModel';
import { DgrmImageInfoModel } from './DgrmImageInfoModel';
import { userModel } from 'src/app/home/user/userModel';

export class KiKidderQuestModel{

	isEdit : boolean = false;

    ki_kidder_quest_id : number;

	 ki_kidder_quest_name : string;
	
	 ki_kidder_quest_optionA : string;
	
	 ki_kidder_quest_optionB : string;
	
	 ki_kidder_quest_optionC : string;
	
	 ki_kidder_quest_optionD : string;
	
	 ki_kidder_quest_level : number;

	 deleteFl : boolean;

	 questType : number;
	
	 ki_kidder_quest_ans : string;
	ki_kidder_quest_sub  : string;
	uniqueCode : string;
	
	 ki_kidder_quest_topic  : string;
	ki_kidder_quest_marks : number;

	 userModel : userModel ;

	 txtQuesInfoModel : TxtQuesInfoModel;

	 dgrmImageInfoModels : Array<DgrmImageInfoModel>;


}
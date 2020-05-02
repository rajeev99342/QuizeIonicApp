import { QuestImageModel } from './QuestImageModel';
import { QuestTxtModel } from './QuestTxtModel';
import { userModel } from 'src/app/home/user/userModel';

export class UserQuestionModel
{

	 user_quest_optionA : string;
	 user_quest_optionB : string;
	 user_quest_optionC : string;
	 user_quest_optionD : string;
	 user_quest_ans  : string;
     user_quest_marks : number;
     
     imageInfoModel : QuestImageModel;
     dgrmImageInfoModel : QuestImageModel;
	 txtQuesInfoModel : QuestTxtModel;
	 userInfoTbl : userModel;
	 isEdit : boolean = false;

}
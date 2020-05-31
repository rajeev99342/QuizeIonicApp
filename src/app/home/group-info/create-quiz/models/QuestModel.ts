import { userModel } from 'src/app/home/user/userModel';
import { TxtQuesInfoModel } from './TxtQuesInfoModel';
import { ImageInfoModel } from './ImageInfoModel';
import { DgrmImageInfoModel } from './DgrmImageInfoModel';

export class UserQuestionModel
{

	 user_quest_optionA : string;
	 user_quest_optionB : string;
	 user_quest_optionC : string;
	 user_quest_optionD : string;
	 user_quest_ans  : string;
     user_quest_marks : number;
     
     imgInfoTbls : Array<ImageInfoModel>;
	 txtQuesInfoModel : TxtQuesInfoModel;
	 dgrmImage : DgrmImageInfoModel;
	 userInfoTbl : userModel;
	 isEdit : boolean = false;

}
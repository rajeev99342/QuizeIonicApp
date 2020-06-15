
import { UserQuestionModel } from './QuestModel';
import { Time } from '@angular/common';
import { userModel } from 'src/app/home/user/userModel';
import { GroupModel } from 'src/app/models/GroupModel';
import { KidderQuestionModel } from './KidderQuestionModel';
import { KiKidderQuestModel } from './KiKidderQuestModel';

export class QuizModel
{
	quizId : number;
	quizName : string;
	quizCreatedDate : Date;
	quiz_time : Time;
	quizDuration  : number;
	quizMarks  : number;
	quizNoOfQuest : number;
	quizSub : string;
	quizDesc : string;
	quizStatus : number;
	quizPublishedDate : Date;
	userModel : userModel;
	quiz_created_date_string : string;
	quiz_publish_date_string : string;
	status : string;
	grpModel: GroupModel;
	uniqueCode : string;
	deleteFl : boolean = false;

	kidderQuestModels : Array<KiKidderQuestModel>


}

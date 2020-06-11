import { userModel } from '../user/userModel';
import { QuizModel } from './create-quiz/models/QuizModel';
export class GroupDetailsModel {
	
	 quizList :Array<QuizModel>;
    userList :Array<userModel> ;
    
}
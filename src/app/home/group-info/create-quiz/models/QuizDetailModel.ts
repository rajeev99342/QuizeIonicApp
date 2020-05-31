import { UserQuestionModel } from './QuestModel';
import { QuizModel } from './QuizModel';

export class QuizDetailModel{
    questions : Array<UserQuestionModel>;
    quizModel : QuizModel;
    status : string ;
}
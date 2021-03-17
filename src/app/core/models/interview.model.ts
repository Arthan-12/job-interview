import { Question } from "./questions.model";

export interface Interview {
    id: number;
    category: string;
    vacancy: string;
    questions: Question[];
}
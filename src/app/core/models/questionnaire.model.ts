import { Interview } from "./interview.model";
import { Question } from "./question.model";

export interface Questionnaire {
    id?: number;
    title?: string;
    category?: string;
    questions?: Question[];
    vacancies?: Interview[];
}
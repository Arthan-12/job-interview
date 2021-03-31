import { Question } from "./question.model";

export interface Questionnaire {
    id?: number;
    title?: string;
    difficulty?: number;
    category?: string;
    questions?: Question[];
}
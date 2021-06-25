import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, getTestBed } from "@angular/core/testing";
import { Question } from "../models/question.model";
import { QuestionService } from "./questions.service";

describe(QuestionService.name, () => {
    let questionService: QuestionService = null;
    let httpClientMock: HttpTestingController;
    let injector: TestBed;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [QuestionService]
        });
        injector = getTestBed();
        questionService = injector.get(QuestionService);
        httpClientMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpClientMock.verify();
    });

    it(`#${QuestionService.prototype.getAllQuestions.name}
    should return all questions when called`, () => {
        const expectedQuestions: Question[] = [
            {
                id: 1,
                question: 'dummy question 1',
                questionnaireId: 2,
                answer: 'dummy answer 1',
                difficulty: 'médio',
            },
            {
                id: 2,
                question: 'dummy question 2',
                questionnaireId: 2,
                answer: 'dummy answer 2',
                difficulty: 'difícil',
            }
        ];

        questionService.getAllQuestions().subscribe(
            questions => {
                expect(questions).toEqual(expectedQuestions);
            }
        );

        const req = httpClientMock.expectOne(`${questionService.API_URL}/questions`);
        expect(req.request.method).toBe('GET');
        req.flush(expectedQuestions); 
    });

    it(`#${QuestionService.prototype.findQuestionsByQuestionnaireId.name}
    should return an array of questions with the same QuestionnaireId when called`, () => {
        const expectedQuestionnaireId = 1;
        const expectedQuestions: Question[] = [
            {
                id: 1,
                question: 'dummy question 1',
                questionnaireId: 2,
                answer: 'dummy answer 1',
                difficulty: 'médio',
            },
            {
                id: 2,
                question: 'dummy question 2',
                questionnaireId: 2,
                answer: 'dummy answer 2',
                difficulty: 'difícil',
            }
        ];

        questionService.findQuestionsByQuestionnaireId(expectedQuestionnaireId).subscribe(
            questions => {
                expect(questions).toEqual(expectedQuestions);
            }
        );

        const req = httpClientMock.expectOne( req => req.method === 'GET' && req.url === `${questionService.API_URL}/questionnaires/${expectedQuestionnaireId}/questions`);
        req.flush(expectedQuestions);
    });

    it(`#${QuestionService.prototype.addQuestion.name}
    should create a question and return it when called`, () => {
        const expectedQuestion: Question = {
            id: 1,
            question: 'dummy question 1',
            questionnaireId: 2,
            answer: 'dummy answer 1',
            difficulty: 'médio',
        }

        questionService.addQuestion(expectedQuestion).subscribe(
            question => {
                expect(question).toEqual(expectedQuestion);
        }
    );

    const req = httpClientMock.expectOne( req => req.method === 'POST' && req.url === `${questionService.API_URL}/questions`);
        req.flush(expectedQuestion);
    });

    it(`#${QuestionService.prototype.editQuestion.name}
     should edit a question and return it when called`, () => {
        const expectedQuestion: Question = {
            id: 1,
            question: 'dummy question 1',
            questionnaireId: 2,
            answer: 'dummy answer 1',
            difficulty: 'médio',
        }

        questionService.editQuestion(expectedQuestion.id ,expectedQuestion).subscribe(
            question => {
                expect(question).toEqual(expectedQuestion);
            }
        );

        const req = httpClientMock.expectOne( req => req.method === 'PUT' && req.url === `${questionService.API_URL}/questions/${expectedQuestion.id}`);
        req.flush(expectedQuestion);
    });

    it(`#${QuestionService.prototype.deleteQuestion.name}
     should delete a question and return it when called`, () => {
        const expectedQuestion: Question = {
            id: 1,
            question: 'dummy question 1',
            questionnaireId: 2,
            answer: 'dummy answer 1',
            difficulty: 'médio',
        }

        questionService.deleteQuestion(expectedQuestion.id ).subscribe(
            question => {
                expect(question).toEqual(expectedQuestion);
            }
        );

        const req = httpClientMock.expectOne( req => req.method === 'DELETE' && req.url === `${questionService.API_URL}/questions/${expectedQuestion.id}`);
        req.flush(expectedQuestion);
    });
});
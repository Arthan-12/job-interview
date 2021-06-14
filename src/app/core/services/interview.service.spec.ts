import { getTestBed, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Interview } from "../models/interview.model";
import { InterviewService } from "./interview.service";


describe(InterviewService.name, () => {
    let interviewService: InterviewService = null;
    let httpClientMock: HttpTestingController;
    let injector: TestBed;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [InterviewService]
        });
        injector = getTestBed();
        interviewService = injector.get(InterviewService);
        httpClientMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpClientMock.verify();
    })

    it(`#${InterviewService.prototype.getAllInterviews.name}
    should return all interviews when called`, () => {
        const expectedInterviews: Interview[] = 
        [{id: 1, category: 'Front End', vacancy: 'Desenvolvedor Angular Pl'}, { id: 2, category: 'Back End', vacancy: 'Desenvolvedor Java Jr' }];

        interviewService.getAllInterviews().subscribe(
            interviews => {
                expect(interviews).toEqual(expectedInterviews, 'expected interviews');
            }
        );

        const req = httpClientMock.expectOne(`${interviewService.API_URL}`);
        expect(req.request.method).toBe('GET');
        req.flush(expectedInterviews);
    });

    it(`#${InterviewService.prototype.findById.name}
    should return a specific interviview by it's ID when called`, () => {
       // const expectedInterviewId: number = 1;
        const expectedInterview: Interview = {id: 1, category: 'Front End', vacancy: 'Desenvolvedor Angular Pl'};

        interviewService.findById(expectedInterview.id).subscribe(
            interview => {
                expect(interview).toEqual(expectedInterview)
            }
        );

        const req = httpClientMock.expectOne(req => req.method === 'GET' && req.url === `${interviewService.API_URL}/${expectedInterview.id}`);
        req.flush(expectedInterview);
        
    });

    it(`#${InterviewService.prototype.editInterview.name}
    should update an interview and return it when called`, () => {
        const expectedInterviewId: number = 1;
        const expectedUpdatedInterview: Interview = { id: 1, category: 'Front End', vacancy: 'Desenvolvedor Angular Sr' };

        interviewService.editInterview(expectedInterviewId, expectedUpdatedInterview).subscribe(
            interview => {
                expect(interview).toEqual(expectedUpdatedInterview)
                //fail
            }
        );

        const req = httpClientMock.expectOne( req => req.method === 'PUT' && req.url ===`${interviewService.API_URL}/${expectedInterviewId}`);
        req.flush(expectedUpdatedInterview);
    });

    it(`#${InterviewService.prototype.addInterview.name}
    should add an interview when called`, () => {
        const expectedInterview: Interview = {id: 4, category: 'Back End', vacancy: 'Desenvolvedor .NET Pl'};

        interviewService.addInterview(expectedInterview).subscribe(
            interview => {
                expect(interview).toEqual(expectedInterview)
            }
        );

        const req = httpClientMock.expectOne(req => req.method === 'POST' && req.url === `${interviewService.API_URL}`);
        req.flush(expectedInterview);
    });
});

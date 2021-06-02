import { getTestBed, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from "rxjs";
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
});



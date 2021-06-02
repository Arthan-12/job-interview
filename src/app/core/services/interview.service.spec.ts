import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { Interview } from "../models/interview.model";
import { InterviewService } from "./interview.service";

describe(InterviewService.name, () => {
    let interviewService: InterviewService = null;
    let httpClientSpy: { get: jasmine.Spy };
    let injector: TestBed;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        interviewService = new InterviewService(httpClientSpy as any);
    });

    it(`#${InterviewService.prototype.getAllInterviews.name}
    should return all interviews when called`, (done: DoneFn) => {
        const expectedInterviews: Interview[] = 
        [{id: 1, category: 'Front End', vacancy: 'Desenvolvedor Angular Pl'}, { id: 2, category: 'Back End', vacancy: 'Desenvolvedor Java Jr' }];

        httpClientSpy.get.and.returnValue(of(expectedInterviews));

        interviewService.getAllInterviews().subscribe(
            interviews => {
                expect(interviews).toEqual(expectedInterviews, 'expected interviews');
                done();
            }
        )
    })
})



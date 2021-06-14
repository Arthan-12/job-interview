import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, getTestBed } from "@angular/core/testing";
import { Candidate } from "../models/candidate.model";
import { CandidateService } from "./candidates.service";

describe(CandidateService.name, () => {
    let candidateService: CandidateService = null;
    let httpClientMock: HttpTestingController;
    let injector: TestBed;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CandidateService]
        });
        injector = getTestBed();
        candidateService = injector.get(CandidateService);
        httpClientMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpClientMock.verify();
    });

    it(`#${CandidateService.prototype.getAllCandidates.name}
    should return all candidates when called`, () => {
        const expectedCandidates: Candidate[] = [
            {
                id: 1,
                name: 'Jar Jar Binks',
                interview: 'Scrum Master',
                score: 250,
            },
            {
                id: 2,
                name: 'Darth Maul',
                interview: 'Desenvolvedor Java Pl',
                score: 850,
            },
            {
                id: 3,
                name: 'Wedge Antilles',
                interview: 'Desenvolvedor React Sr',
                score: 950,
            }
        ];

        candidateService.getAllCandidates().subscribe(
            candidates => {
                expect(candidates).toEqual(expectedCandidates)
            }
        );

        const req = httpClientMock.expectOne(`${candidateService.API_URL}`);
        expect(req.request.method).toBe('GET');
        req.flush(expectedCandidates);
    });

    it(`#${CandidateService.prototype.findById.name} 
    should return a specific candidate by it's ID when called`, () => {
        const expectedCandidate: Candidate = {
                id: 1,
                name: 'Jar Jar Binks',
                interview: 'Scrum Master',
                score: 250,
            };

        candidateService.findById(expectedCandidate.id).subscribe(
            candidate => {
                expect(candidate).toEqual(expectedCandidate)
            }
        );

        const req = httpClientMock.expectOne(req => req.method === 'GET' && req.url === `${candidateService.API_URL}/${expectedCandidate.id}`);
        req.flush(expectedCandidate);
    });

    it(`#${CandidateService.prototype.createCandidate.name}
    should create a new candidate when called`, () => {
        const expectedNewCandidate: Candidate = {
            id: 12,
            name: 'Ezra Bridger',
            interview: 'Trainee Consultoria',
            score: 700
        };

        candidateService.createCandidate(expectedNewCandidate).subscribe(
            newCandidate => {
                expect(newCandidate).toEqual(expectedNewCandidate)
            }
        );

        const req = httpClientMock.expectOne(req => req.method === 'POST' && req.url === `${candidateService.API_URL}`);
        req.flush(expectedNewCandidate);
    });

    it(`#${CandidateService.prototype.editCandidate.name}
    should edit the candidate when called`, () => {
        const expectedCandidate: Candidate = {
            id: 12,
            name: 'Ezra Bridger',
            interview: 'Trainee Consultoria',
            score: 700
        };

        candidateService.editCandidate(expectedCandidate.id, expectedCandidate).subscribe(
            candidate => {
                expect(candidate.id).toEqual(expectedCandidate.id);
                expect(candidate).toEqual(expectedCandidate);
            }
        );

        const req = httpClientMock.expectOne(req => req.method === 'PUT' && req.url === `${candidateService.API_URL}/${expectedCandidate.id}`);
        req.flush(expectedCandidate);
    });

    it(`#${CandidateService.prototype.editCandidateScore.name}
    should edit the candidate when called`, () => {
        const expectedCandidate: Candidate = {
            id: 12,
            name: 'Ezra Bridger',
            interview: 'Trainee Consultoria',
            score: 700
        };

        candidateService.editCandidateScore(expectedCandidate.id, expectedCandidate.score).subscribe(
            candidate => {
                expect(candidate.id).toEqual(expectedCandidate.id);
                expect(candidate.score).toEqual(expectedCandidate.score);
            }
        );

        const req = httpClientMock.expectOne(req => req.method === 'PUT' && req.url === `${candidateService.API_URL}/${expectedCandidate.id}`);
        req.flush(expectedCandidate);
    });


    it(`#${CandidateService.prototype.deleteCandidate.name}
    should edit the candidate when called`, () => {
        const expectedCandidate: Candidate = {
            id: 12,
            name: 'Ezra Bridger',
            interview: 'Trainee Consultoria',
            score: 700
        };

        candidateService.deleteCandidate(expectedCandidate.id).subscribe(
            candidate => {
                expect(candidate.id).toEqual(expectedCandidate.id);
            }
        );

        const req = httpClientMock.expectOne(req => req.method === 'DELETE' && req.url === `${candidateService.API_URL}/${expectedCandidate.id}`);
        req.flush(expectedCandidate);
    });

});
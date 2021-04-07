import { Pipe, PipeTransform } from "@angular/core";
import { debounceTime } from "rxjs/operators";


@Pipe({
    name: 'candidateFilter'
})

export class SearchCandidatePipe implements PipeTransform {

    transform(value: any, ...args: any[]) {
        if(!args) {
            return value;
        }
        return value.filter((val) => {
            let searchValue = (val.name.toLowerCase().includes(args)) ||
            (val.interview.toLowerCase().includes(args)) ||
            (val.score.toLowerCase().includes(args)) ||
            (val.date.toLowerCase().includes(args));
            return searchValue
        })
    }

}
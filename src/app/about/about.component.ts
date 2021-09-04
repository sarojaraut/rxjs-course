import { ConditionalExpr } from '@angular/compiler';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    concat,
    fromEvent,
    interval,
    noop,
    observable,
    Observable,
    of,
    timer,
    merge,
    Subject,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';
import { Course } from '../model/course';


@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    begC : Course[];
    AdvC : Course[];

    ngOnInit() {
        const http$ = createHttpObservable1('/api/courses');

        const courses$ = http$.pipe(
            map(res => (res["payload"]))
        )

        courses$.subscribe(
            courses => console.log(courses),
            noop, // no operation
            () => console.log("completed")
        )

        courses$.subscribe(
            courses => {
                this.begC = courses.filter(course => course.category == 'BEGINNER');
                console.log(this.begC);
            }
        )

        // if you want to filter beginner and intermediate courses

    }


}

// Better to move this function to utility component 
function createHttpObservable1(url: string){
    return new Observable( observer => {
        // observer.next();
        // observer.complete();
        // observer.error;
        fetch ('/api/courses')
            .then(response =>{
                return response.json();  //
            })
            // success
            .then(body => {
                observer.next(body);
                observer.complete();
            })
            // If any error happens
            .catch( err =>{
                observer.error(err)
        })
    
    })
}





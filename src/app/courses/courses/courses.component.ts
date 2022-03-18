import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  displayedColumns: string[] = ['name', 'category'];

 

  constructor(

    private coursesService: CoursesService,
    public dialog: MatDialog 
    
    ) {

    this.courses$ = this.coursesService.listAll()
    .pipe(
      catchError(err => {
        this.onError("404: The requested resource was not found.")
        return of ([])
      })
    );

  }


  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  } 

  ngOnInit(): void {
    
  }

}

import {
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import {
  HttpClient
} from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Validators
} from '@angular/forms';
import {
  FormArray,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import {
  FormControl
} from '@angular/forms';
import {
  ReactiveFormsModule
} from '@angular/forms';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import {
  Router
} from '@angular/router';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import * as _moment from 'moment'
import { defaultFormat as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },

  ],
})
export class RegisterComponent implements OnInit {

  date = new FormControl(moment);

  isLinear = false;
  hide = true;
  isEditable = false

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  forthFormGroup!: FormGroup

  minDate: Date;
  maxDate: Date;
  items!: FormArray;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 50, 0, 1);
    this.maxDate = new Date(currentYear - 0, 11, 31);
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      location: ['', Validators.required],
      linkedin: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8)]],
    });
    this.secondFormGroup = this.formBuilder.group({
      course: ['', Validators.required],
      courseName: ['', Validators.required],
      instName: ['', Validators.required],
      fromYr: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      toYr: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      cgpa: ['', Validators.required],
      items: this.formBuilder.array([ this.createItem() ])
    });
    this.thirdFormGroup = this.formBuilder.group({
      aboutUser: ['', Validators.required],
      compName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      fromYr: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      toYr: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      aboutJob: ['', Validators.required],
    })
    this.forthFormGroup = this.formBuilder.group({
      skillName: ['', Validators.required],
      langName: ['', Validators.required],
      skillRating: ['', Validators.required],
      langRating: ['', Validators.required]
    })
  }

  onLogoClick(): void {
    this.router.navigate([''])
  }

  onAdd2(): void {
    this.snackBar.open('Functionality not added!', 'Close', {
      duration: 4000
    });
    //alert("")

  }

  onAdd3(): void {
    this.snackBar.open('Functionality not added!', 'Close', {
      duration: 4000
    });
    //alert("")

  }

  onAddSkill(): void {
    this.snackBar.open('Functionality not added!', 'Close', {
      duration: 4000
    });
    //alert("")

  }

  onAddLang(): void {
    this.snackBar.open('Functionality not added!', 'Close', {
      duration: 4000
    });
    //alert("")

  }

  submitBasicInfo(): void {

    console.log(this.firstFormGroup.value.dob.toISOString())
    const body = {
      fname: this.firstFormGroup.value.fName,
      lname: this.firstFormGroup.value.lName,
      dob: this.firstFormGroup.value.dob.toISOString(),
      email: this.firstFormGroup.value.email,
      mob: this.firstFormGroup.value.mobile,
      linkedIn: this.firstFormGroup.value.linkedin,
      pass: this.firstFormGroup.value.password,
      location: this.firstFormGroup.value.location
    };

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    //console.log(body)
    this.http
      .post(
        "http://localhost:8080/api/createUser",
        body,
        httpOptions
      )
      .subscribe((response) => {
        console.log(response)

        this.snackBar.open('Basic Info submitted!', 'Close', {
          duration: 4000
        });

      })
  }

  submitEduInfo(): void {
    const body = {
      userCourse: this.secondFormGroup.value.course,
      fromYr: this.secondFormGroup.value.fromYr,
      toYr: this.secondFormGroup.value.toYr,
      userInstName: this.secondFormGroup.value.instName,
      userCGPA: this.secondFormGroup.value.cgpa,
      userCourseName: this.secondFormGroup.value.courseName
    };

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    //console.log(body)
    this.http
      .post(
        "http://localhost:8080/api/addEduDetails",
        body,
        httpOptions
      )
      .subscribe(res => {
        console.log(res)

        this.snackBar.open('Education Info submitted!', 'Close', {
          duration: 4000
        });

      })
  }

  submitWorkInfo(): void {
    const body = {
      toYr: this.thirdFormGroup.value.toYr,
      fromYr: this.thirdFormGroup.value.fromYr,
      userSummary: this.thirdFormGroup.value.aboutUser,
      userCompName: this.thirdFormGroup.value.compName,
      userJobTitle: this.thirdFormGroup.value.jobTitle,
      jobDesc: this.thirdFormGroup.value.aboutJob,


    };

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    console.log(body)
    this.http
      .post(
        "http://localhost:8080/api/addWork",
        body,
        httpOptions
      )
      .subscribe(res => {
        console.log(res)


      });
  }

  submitSkillInfo(): void {
    const body = {
      userType: "Skill",
      typeDesc: this.forthFormGroup.value.skillName,
      typeRating: this.forthFormGroup.value.skillRating,


    };

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    console.log(body)
    this.http
      .post(
        "http://localhost:8080/api/addSkills",
        body,
        httpOptions
      )
      .subscribe(res => {
        console.log(res)




      });

    const body1 = {
      userType: "Language",
      typeDesc: this.forthFormGroup.value.langName,
      typeRating: this.forthFormGroup.value.langRating,


    };
    this.http
      .post(
        "http://localhost:8080/api/addSkills",
        body1,
        httpOptions
      ).subscribe(res => {

        //console.log(res)
        this.router.navigate(['/profile'])
      })

  }

  
  createItem(): FormGroup {
    return this.formBuilder.group({
      items: ['', Validators.required],
      course: ['', Validators.required],
      courseName: ['', Validators.required],
      instName: ['', Validators.required],
      fromYr: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      toYr: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      cgpa: ['', Validators.required],
    });
  }
  addItem(): void {
    this.items = this.secondFormGroup.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  get userFormGroups () {
    return this.secondFormGroup.get('items') as FormArray
  }

  removeQuantity(i:number) {
    if(i >= 1) {
    this.userFormGroups.removeAt(i);  
  }
  }  

//Check this https://www.javatpoint.com/dynamically-add-and-remove-fields-in-angular
}

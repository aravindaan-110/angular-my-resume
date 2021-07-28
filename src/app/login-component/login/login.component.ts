import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.email]),
    pass: new FormControl('',[Validators.required,Validators.minLength(8)])
  })

  hide=true;
  loading = true;
    errorMessage = "";

  constructor(private http: HttpClient,private router: Router,private snackBar: MatSnackBar) {}

  ngOnInit() {
    
  }

  onRegister(): void{
    console.log('Clicked!')
    this.router.navigate(['/register'])
  }


  onLogin(): void {
    console.log(this.loginForm.status)
    // console.log("Username: "+this.loginForm.value.userName)
    // console.log("Password: "+this.loginForm.value.userPass)


    const body = {
      email: this.loginForm.value.email,
      pass: this.loginForm.value.pass
    };

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    //console.log(body)
    this.http
      .post(
        "http://localhost:8080/api/validateLogin",
        body,
        httpOptions
      ).subscribe((response) => {
        //console.log(res)
        
        if(response === true){
          this.snackBar.open('Welcome back!','Close',{
            duration: 5000
          });
          this.router.navigate(['/profile'])
        }else {
          this.snackBar.open('Invalid Credentials!','Close',{
            duration: 3000
          });
        }
      },(error)=> {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
              console.log("Error Event");
          } else {
            console.log(error.error)
            switch (error.status) {
              case 0:      //login
              this.snackBar.open(`No response recieved from backend!`,'Close',{
                duration: 3000
              });
                  break;
              case 403:     //forbidden
              this.snackBar.open(`${error.statusText} occured!`,'Close',{
                duration: 3000
              });
                  break;
          }
              //console.log(`error status : ${error.status} ${error.statusText}`);
              
          } 
      } else {
        this.snackBar.open(`Unknown Error occured!`,'Close',{
          duration: 3000
        });
      }
      }
      );

      

     // getUsers() {


    
        //this.http.get('http://localhost:8080/api/getEdu/1');
    
    
      //}

  }

  


  // this.http.post<any>('https://reqres.in/invalid-url', { title: 'Angular POST Request Example' }).subscribe({ next: data => { this.postId = data.id; }, error: error => { this.errorMessage = error.message; console.error('There was an error!', error); } })


}

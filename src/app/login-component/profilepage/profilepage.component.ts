import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {

  constructor(private router: Router,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onLogout(): void{
    this.snackBar.open('See you soon!','Close',{
      duration: 5000
    });

    this.router.navigate([''])
  }
}

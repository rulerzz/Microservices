import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;

  public subjectsArray = [
    'Arts & Humanities',
    'Business',
    'Computer Science & IT',
    'Data Science',
    'Health & Medicine',
    'Language Learning',
    'Life Sciences',
    'Mathematics',
    'Physical Science',
    'Social Sciences',
  ];

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("[A-Za-z]*[0-9]*")]],
      subjects: [this.buildSubjects(), Validators.required],
      verification: [false, Validators.required],
      accept: [false, Validators.required],
    });
  }

  buildSubjects() {
    const array = this.subjectsArray.map((subject) => {
      return this.fb.control(false);
    });
    return this.fb.array(array);
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form submitted:', this.signupForm.value);
    }
  }
  showerrors(){

    console.log(this.signupForm.get('username')?.errors)
  }
  getErrorMessage(fieldName: string){
    if(fieldName === 'username')
      return "This field is required";
    else if(fieldName === 'email')
      return "This field is required";
    else if(fieldName === 'password')
      return "This field is required";
    else
      return;
  }
}

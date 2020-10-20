import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private auth: AuthService,
    private route: Router
  ) {}
  emailPattern = "^[a-z0-9_]+@[a-z]+\\.[a-z]{2,3}$";
  ngOnInit() {}

  /**
   * Login Form
   * Reactive Form
   */
  loginForm = this._fb.group({
    email: new FormControl("", [
      Validators.required,
      Validators.pattern(this.emailPattern),
    ]),
    password: new FormControl("", [Validators.required]),
  });

  /**
   * Get the instance of input field
   */
  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }

  /**
   * On form Submission
   */
  onSubmit() {
    let formData = new FormData();
    formData.append("email", this.loginForm.get("email").value);
    formData.append("password", this.loginForm.get("password").value);

    var email = this.loginForm.get("email").value
    var pass = this.loginForm.get("password").value

    this.auth.login(this.loginForm.value).subscribe((res) => {
      if(res){
        this.auth.setLoggedIn(true);
        this.route.navigateByUrl("/");
      }else{
        this.auth.setLoggedIn(false);
        alert("Invalid Credentials Provided");
      }
    });
  }
  }
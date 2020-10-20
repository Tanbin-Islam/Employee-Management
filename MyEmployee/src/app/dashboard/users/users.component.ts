import { Component, OnInit } from "@angular/core";
import { UsersService } from "./users.service";
import { Users } from "./users";
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from "@angular/forms";
declare var $: any;

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  constructor(private _userService: UsersService, private _fb: FormBuilder) {}
  // roles;
  users: Users[];
  userEdit;
  selectFile;
  unamePattern = "^[A-Za-z ]{5,15}$";
  emailPattern = "^[a-z0-9_]+@[a-z]+\\.[a-z]{2,3}$";
  public temp: Object = false;

  ngOnInit() {
    // //get roles from database
    // this._userService.getRoles().subscribe((data: Users[]) => {
    //   this.roles = data;
    //   this.temp = true;
    // });

    //get all user data
    this._userService.getUsers().subscribe((users: Users[]) => {
      this.users = users;
    });
  }

  /**
   * Reactive form
   */
  userForm = this._fb.group({
    username: new FormControl("", [
      Validators.required,
      Validators.pattern(this.unamePattern),
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.pattern(this.emailPattern),
    ]),
  
    password: new FormControl("", [Validators.required]),
    confirm: new FormControl("", [Validators.required]),
   
  });

  /**
   * Get the instance of input field
   */
  get username() {
    return this.userForm.get("username");
  }
  get email() {
    return this.userForm.get("email");
  }
 
  get password() {
    return this.userForm.get("password");
  }
  get confirm() {
    return this.userForm.get("confirm");
  }
  
  
 
  /**
   * Create new user
   */
  onSubmit($event): void {
    let formData = new FormData();
    formData.append("userName", this.userForm.get("username").value);
    formData.append("email", this.userForm.get("email").value);
   
    formData.append("password", this.userForm.get("password").value);
    console.log("res");
    console.log(this.userForm.get("username").value);
    console.log(this.userForm.get("email").value);
    console.log( this.userForm.get("password").value);

    this._userService.addUser(this.userForm.value).subscribe((res) => {
      console.log(res)
      if(res){
        this.userForm.reset();
        this.ngOnInit();
      }
      // if (res["status"] == "200") {
      //   this.users = res["users"];
      //   this.userForm.reset();
      // } else if (res["status"] == "404") {
      //   alert("Something went wrong!!!");
      // } else {
      //   alert(res["status"]);
      // }
    });
  }

  /**
   * Edit user
   * @param event
   */
  userEditForm = new FormGroup({
    UserId: new FormControl(),
    userName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
   

  });

  onEdit(user) {
    this.userEditForm.setValue({
      UserId: user.UserId,
      userName: user.UserName,
      email: user.Email,
      password:user.Password,
    });
  }

  /**
   * User Update
   * @param event
   */
  onUpdate($event): void {
    let formData = new FormData();
    formData.append("UserId", this.userEditForm.get("UserId").value);
    formData.append("UserName", this.userEditForm.get("userName").value);
    formData.append("Email", this.userEditForm.get("email").value);
    formData.append("Password", this.userEditForm.get("password").value);
    var id = this.userEditForm.get("UserId").value;
   
    console.log(this.userEditForm.value)

    this._userService.updateUser(this.userEditForm.value, id).subscribe((res) => {
      console.log(res)
      if(res){
        this.ngOnInit();
            this.temp = true;
        $("#userEdit").modal("hide");
      }
    });
  }

  /**
   * Delete data
   */
  onDelete(id) {
    if (confirm("Are sure to delete?")) {
      this._userService.onDelete(id).subscribe((res) => {
        if(res){
          this.ngOnInit()
        }
      });
    }
  }
}

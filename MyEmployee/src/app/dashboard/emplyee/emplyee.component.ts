import { Component, OnInit } from "@angular/core";
import { Emplyee } from "./emplyee";
import { EmplyeeService } from "./emplyee.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
declare var $: any;

@Component({
  selector: "app-emplyee",
  templateUrl: "./emplyee.component.html",
  styleUrls: ["./emplyee.component.css"],
})
export class EmplyeeComponent implements OnInit {
  employees: Emplyee[];
 

  checks = false;
  public temp: Object = false;

  constructor(private employee: EmplyeeService, private _fb: FormBuilder) {}

  ngOnInit() {
    //get All Employee list
    this.employee.getEmployee().subscribe((res) => {
      this.employees = res;
      console.log(this.employees)
    });

  
    
  }

  checkAll(e) {
    if (e.target.checked == true) {
      this.checks = true;
    } else {
      this.checks = false;
    }
  }

  /**
   * Add new item
   * @param id
   */
  employeeForm = this._fb.group({
   
    EmployeeName: new FormControl(""),
    address: new FormControl(""),
    email: new FormControl(""),
    phone: new FormControl(""),
    role: new FormControl(""),
  });

  //Get the instance of input field
 
  

  
  onSubmit() {

    let formData = new FormData();
  
    formData.append("EmployeeName", this.employeeForm.get("EmployeeName").value);
  
    formData.append("Address", this.employeeForm.get("address").value);
    formData.append("Email", this.employeeForm.get("email").value);
    formData.append("Phone", this.employeeForm.get("phone").value);
    formData.append("Role", this.employeeForm.get("role").value);
    console.log(this.employeeForm.value)
    this.employee.addEmployee(this.employeeForm.value).subscribe((res) => {
     if(res){
       this.ngOnInit()
       this.employeeForm.reset()
       this.temp = true;
       $("#empAdd").modal("hide");
     }
    });

  }

  /**
   * Edit Position
   * @param id
   */
  employeeEdit = new FormGroup({
    EmployeeId: new FormControl(""),
    EmployeeName: new FormControl(""),
    Address: new FormControl(""),
    Email: new FormControl(""),
    Phone: new FormControl(""),
    Role: new FormControl(""),
  });

  onEdit(employee) {
    this.employeeEdit.setValue({
      EmployeeId: employee.EmployeeId,
      EmployeeName: employee.EmployeeName,
      Address: employee.Address,
      Email: employee.Email,
      Phone: employee.Phone,
      Role: employee.Role,
     
    });
  }

  /**
   * Update Single item
   * @param id
   */
  onUpdate(): void {
    let formData = new FormData();
    formData.append("EmployeeId", this.employeeEdit.get("EmployeeId").value);
    formData.append("EmployeeName", this.employeeEdit.get("EmployeeName").value);
    formData.append("Address", this.employeeEdit.get("Address").value);
    formData.append("Email", this.employeeEdit.get("Email").value);
    formData.append("Phone", this.employeeEdit.get("Phone").value);
    formData.append("Role", this.employeeEdit.get("Role").value);
    let i= this.employeeEdit.get("EmployeeId").value;
    console.log(this.employeeEdit.value);
    this.employee.updateEmp(i,this.employeeEdit.value).subscribe((res) => {
      console.log(res)
      this.ngOnInit()
      this.employeeEdit.reset()
      this.temp = true;
      $("#empEdit").modal("hide");
    
   });
  }

  /**
   * Delete data
   */
  onDelete(event) {
    if (confirm("Are sure to delete?")) {
      this.employee.onDelete(event).subscribe((res) => {
        if(res){
          this.ngOnInit()
        }
      });
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { Department } from "./department";
import { DepartmentService } from "./department.service";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
declare var $: any;

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.css"],
})
export class DepartmentComponent implements OnInit {
  constructor(
    private deptService: DepartmentService,
    private _fb: FormBuilder
  ) {}

  departments: Department[];
  public temp: Object = false;

  ngOnInit() {
    //get departments list
    this.deptService.getDept().subscribe((data: Department[]) => {
      this.departments = data;
      console.log(data)
    });
  }

  deptForm = this._fb.group({
    DeptName: new FormControl("", [Validators.required]),
    description: new FormControl(""),
  });

  /**
   * Get the instance of input field
   */
  get DeptName() {
    return this.deptForm.get("DeptName");
  }

  /**
   * Form Submittion
   */
  onSubmit(): void {
    if (this.deptForm.invalid) {
      alert("one or more field is empty");
    } else {
      let formData = new FormData();
      formData.append("DeptName", this.deptForm.get("DeptName").value);
      formData.append("description", this.deptForm.get("description").value);
      console.log(this.deptForm.value)
      this.deptService.addDept(this.deptForm.value).subscribe((res) => {
        if(res){
          this.ngOnInit()
          this.deptForm.reset();
        }
      });
    }
  }

  /**
   * Data edit
   * @param event
   */
  deptEdit = new FormGroup({
    id: new FormControl(),
    DeptName: new FormControl(),
    Description: new FormControl(),
  });

  onEdit(department) {
    this.deptEdit.setValue({
      id: department.Dept_Id,
      DeptName: department.DeptName,
      Description: department.Description,
    });
  }

  /**
   * Data update
   * @param event
   */
  onUpdate($event): void {
    let formData = new FormData();
    var id = this.deptEdit.get("Dept_Id").value
    formData.append("DeptName", this.deptEdit.get("DeptName").value);
    formData.append("Description", this.deptEdit.get("Description").value);
    console.log(this.deptEdit.value)
    this.deptService.updateDept(this.deptEdit.value, id).subscribe((res) => {
      console.log(res)
    });
  }

  /**
   * Delete data
   */
  onDelete(event) {
    if (confirm("Are sure to delete?")) {
      this.deptService.onDelete(event).subscribe((res) => {
        if(res){
          this.ngOnInit()
        }
      });
    }
  }
}

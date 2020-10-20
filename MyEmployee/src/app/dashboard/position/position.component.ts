import { Component, OnInit } from "@angular/core";
import { Position } from "./position";
import { PositionService } from "./position.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
declare var $: any;

@Component({
  selector: "app-position",
  templateUrl: "./position.component.html",
  styleUrls: ["./position.component.css"],
})
export class PositionComponent implements OnInit {
  constructor(
    private _postService: PositionService,
    private _fb: FormBuilder
  ) {}

  positions: Position[];
  departments;
  public temp: Object = false;

  ngOnInit() {
    /**
     * Get all departments
     */
    this._postService.getDept().subscribe((res) => {
      this.departments = res;
      console.log(res)
    });

    /**
     * Get All Positions
     */
    this._postService.getPost().subscribe((res: Position[]) => {
      this.positions = res;
      console.log(res)
    });
  }

  /**
   * Add new item
   * @param id
   */
  postForm = this._fb.group({
    PtsTitle: new FormControl("", [Validators.required]),
    Dept_Id: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
  });

  //Get the instance of input field
  get PtsTitle() {
    return this.postForm.get("PtsTitle");
  }
  get Dept_Id() {
    return this.postForm.get("Dept_Id");
  }
  get description() {
    return this.postForm.get("description");
  }

  onSubmit() {
    if (this.postForm.invalid) {
      alert("Cannot Submit! One or more field is empty");
    } else {
      let formData = new FormData();
      formData.append("PtsTitle", this.postForm.get("PtsTitle").value);
      formData.append("Dept_Id", this.postForm.get("Dept_Id").value);
      formData.append("Description", this.postForm.get("description").value);
console.log(this.postForm.value)
      this._postService.addPost(this.postForm.value).subscribe((res) => {
        if(res){
          this.ngOnInit()
        }
      });
    }
  }

  /**
   * Edit Position
   * @param id
   */
  postEdit = new FormGroup({
    id: new FormControl(""),
    PtsTitle: new FormControl(""),
    Dept_Id: new FormControl(""),
    Description: new FormControl(""),
  });

  onEdit(position) {
    this.postEdit.setValue({
      id: position.PstId,
      PtsTitle: position.PtsTitle,
      Dept_Id: position.Dept_Id,
      Description: position.Description,
    });
  }

  /**
   * Update Single item
   * @param id
   */
  onUpdate($event): void {
    let formData = new FormData();
    formData.append("PstId", this.postEdit.get("PstId").value);
    formData.append("PtsTitle", this.postEdit.get("PtsTitle").value);
    formData.append("Dept_Id", this.postEdit.get("Dept_Id").value);
    formData.append("Description", this.postEdit.get("Description").value);

    this._postService.updatePost(formData).subscribe((res) => {
      console.log(res)
      // if (res["status"] == "200") {
      //   this.positions = res["positions"];
      //   this.temp = true;
      //   $("#postEdit").modal("hide");
      // } else if (res["status"] == "404") {
      //   alert("Something went wrong!!!");
      // } else {
      //   alert(res["status"]);
      // }
    });
  }

  /**
   * Delete item
   */
  onDelete(id: number): void {
    if (confirm("Are sure to delete?")) {
      this._postService.onDelete(id).subscribe((res) => {
      if(res){
        this.ngOnInit()
      }
      });
    }
  }
}

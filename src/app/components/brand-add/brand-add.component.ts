import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validator,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  brandAddFrom: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.createAddBrandForm();
  }

  createAddBrandForm() {
    this.brandAddFrom = this.formBuilder.group({
      brandName: ['', Validators.required],
    });
  }

  add() {
    console.log(this.brandAddFrom.value);
    if (this.brandAddFrom.valid) {
      let brandModel = Object.assign({}, this.brandAddFrom.value);
      this.brandService.add(brandModel).subscribe((response) => {
        console.log(response);
        this.toastrService.success('Araba markası eklendi', 'Başarılı');
      });
    } else {
      this.toastrService.error('Form bilgileri eksik', 'Dikkat');
    }
  }
}

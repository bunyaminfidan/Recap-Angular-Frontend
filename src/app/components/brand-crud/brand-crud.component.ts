import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-crud',
  templateUrl: './brand-crud.component.html',
  styleUrls: ['./brand-crud.component.css'],
})
export class BrandCrudComponent implements OnInit {
  brandAddFrom: FormGroup;
  @Input() brands: Brand;

  dataLoaded: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createAddBrandForm();

    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getByIdBrand(params['brandId']);
      }
    });
  }

  ngOnChanges() {
    this.isBrandEmpty();
  }

  isBrandEmpty() {
    this.brands
      ? this.brandAddFrom.setValue({
          brandName: this.brands.brandName,
        })
      : '';
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
      this.brandService.add(brandModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.success('Marka eklendi', 'Başarılı');
        },
        (responseError) => {
          console.log(responseError);

          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Form bilgileri eksik', 'Dikkat');
    }
  }

  update() {
    console.log(this.brandAddFrom.value);
    if (this.brandAddFrom.valid) {
      let brandModel = Object.assign({}, this.brandAddFrom.value);
      brandModel.id = this.brands.id;
      this.brandService.update(brandModel).subscribe(
        (response) => {
          this.toastrService.success('Marka güncellendi', 'Başarılı');
        },
        (responseError) => {
          console.log(responseError);

          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Form bilgileri eksik', 'Dikkat');
    }
  }

  delete() {
    console.log(this.brandAddFrom.value);
    if (this.brandAddFrom.valid) {
      let brandModel = Object.assign({}, this.brandAddFrom.value);
      brandModel.id = this.brands.id;
      this.brandService.delete(brandModel).subscribe((response) => {
        this.toastrService.success('Marka silindi', 'Başarılı');
      });
    } else {
      this.toastrService.error('Form bilgileri eksik', 'Dikkat');
    }
  }

  getByIdBrand(carId: number) {
    this.brandService.getByIdBrand(carId).subscribe((response) => {
      this.brands = response.data[0];
      this.brandAddFrom.setValue({
        brandName: this.brands.brandName,
      });

      this.dataLoaded = true;
    });
  }

  addOrUpdateButtonText() {
    if (this.brands) {
      return 'Güncelle';
    }
    return 'Ekle';
  }
  addorUpdateClick() {
    if (this.brands) {
      this.update();
      console.log('update');
    } else {
      this.add();
      console.log('add');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-crud',
  templateUrl: './car-crud.component.html',
  styleUrls: ['./car-crud.component.css'],
})
export class CarCrudComponent implements OnInit {
  colors: Color[] = [];
  brands: Brand[] = [];
  cars: Car;
  dataLoaded: boolean = false;
  carAddForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private colorService: ColorService,
    private brandService: BrandService,
    private carService: CarService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getByIdCar(params['carId']);
      }
    });
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((respone) => {
      this.brands = respone.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getByIdCar(carId: number) {
    this.carService.getByIdCar(carId).subscribe((response) => {
      this.cars = response.data[0];
      this.carAddForm.setValue({
        brandId: this.cars.brandId,
        colorId: this.cars.colorId,
        modelYear: this.cars.modelYear,
        dailyPrice: this.cars.dailyPrice,
        description: this.cars.description,
      });

      this.dataLoaded = true;
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.add(carModel).subscribe(
        (response) => {
          this.toastrService.success('Araba eklendi', 'Başarılı');
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
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      carModel.id = this.cars.id;
      this.carService.update(carModel).subscribe(
        (response) => {
    
          this.toastrService.success('Araba güncellendi', 'Başarılı');
        },
        (responseError) => {
          console.log(responseError);
          console.log("responseError" );

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
    console.log(this.carAddForm.value);
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      carModel.id = this.cars.id;
      this.carService.delete(carModel).subscribe((response) => {
        this.toastrService.success('Araba silindi', 'Başarılı');
      });
    } else {
      this.toastrService.error('Form bilgileri eksik', 'Dikkat');
    }
  }

  addOrUpdateButtonText() {
    if (this.cars) {
      return 'Güncelle';
    }
    return 'Ekle';
  }
  addorUpdateClick() {
    if (this.cars) {
      this.update();
      console.log('update');
    } else {
      this.add();
      console.log('add');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validator,
  Validators,
} from '@angular/forms';
import { CarDetail } from 'src/app/models/carDetail';
import { Car } from 'src/app/models/car';

//FormBuilder servis html de ki form ile .ts arasında bağlantı kuruyor.

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
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
    this.getBrands();
    this.getColors();

    this.createCarAddForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getByIdCar(params['carId']);
        console.log(params['carId']);
      } else {
        console.log('else çalıştı.');
      }
    });
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
     
      brandId: [this.cars.id, Validators.required],
      colorId: [this.cars.colorId, Validators.required],
      modelYear: [this.cars.modelYear, Validators.required],
      dailyPrice: [this.cars.dailyPrice, Validators.required],
      description: [this.cars.description, Validators.required],
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
      console.log(this.cars);

      this.dataLoaded = true;
    });
  }

  add() {
    console.log(this.carAddForm.value);
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.add(carModel).subscribe((response) => {
        console.log(response);
        this.toastrService.success('Araba eklendi', 'Başarılı');
      });
    } else {
      this.toastrService.error('Form bilgileri eksik', 'Dikkat');
    }
  }
}

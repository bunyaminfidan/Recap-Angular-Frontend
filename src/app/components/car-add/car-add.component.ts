import { Component, OnInit } from '@angular/core';
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
//FormBuilder servis html de ki form ile .ts arasında bağlantı kuruyor.

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  colors: Color[] = [];
  brands: Brand[] = [];

  carAddForm: FormGroup;

  constructor(
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

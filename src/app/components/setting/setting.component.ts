import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
  cars: Car[] = [];
  carDetails: CarDetail[] = [];
  colors: Color[] = [];
  brands: Brand[] = [];
  dataLoaded: boolean;


  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private colorService: ColorService,
    private brandService: BrandService,
    private toastrService: ToastrService,
    private activadetRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }
  getCars() {
    this.carService.getCarsDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
}

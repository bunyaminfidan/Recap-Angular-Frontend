import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  dataLoaded: boolean = false;
  basePath = environment.baseURL;
  defaultImages = environment.defaultImages;
  filterText = '';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getByFilterCars(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
      }
    });
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrands(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarsByColors(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getByFilterCars(brandId: number, colorId: number) {
    console.log('getByFilterCars');
    console.log('brand:' + brandId + ' color: ' + colorId);
    this.carService.getByFilterCars(brandId, colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  imageIsNullCheck(imagePath: string[]) {
    // "{{ basePath }}{{ car.imagePath[0] }}"
    if (imagePath.length > 0) {
      return this.basePath + imagePath[0];
    } else {
      return this.basePath + this.defaultImages;
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-crud',
  templateUrl: './color-crud.component.html',
  styleUrls: ['./color-crud.component.css'],
})
export class ColorCrudComponent implements OnInit {
  colorAddForm: FormGroup;
  @Input()  colors: Color;
  dataLoaded: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createAddColorFrom();

    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getByIdColor(params['colorId']);
      }
    });
  }

  createAddColorFrom() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
  }

  add() {
    console.log(this.colorAddForm.value);
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.add(colorModel).subscribe((response) => {
        
        this.toastrService.success('Araba rengi eklendi', 'Başarılı');
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
      });
    } else {
      this.toastrService.error('Form bilgileri eksik', 'Dikkat');
    }
  }

  update() {
    console.log(this.colorAddForm.value);
    if (this.colorAddForm.valid) {
      let brandModel = Object.assign({}, this.colorAddForm.value);
      brandModel.id = this.colors.id;
      this.colorService.update(brandModel).subscribe((response) => {
        this.toastrService.success('Renk güncellendi', 'Başarılı');
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
      });
    } else {
      this.toastrService.error('Form bilgileri eksik', 'Dikkat');
    }
  }

  delete() {
    console.log(this.colorAddForm.value);
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value);
      colorModel.id = this.colors.id;
      this.colorService.delete(colorModel).subscribe((response) => {
        this.toastrService.success('Renk silindi', 'Başarılı');
      });
    } else {
      this.toastrService.error('Form bilgileri eksik', 'Dikkat');
    }
  }

  getByIdColor(colorId: number) {
    this.colorService.getByIdColor(colorId).subscribe((response) => {
      this.colors = response.data[0];
      console.log(this.colors);
      this.colorAddForm.setValue({
        colorName: this.colors.colorName,
      });

      this.dataLoaded = true;
    });
  }

  addOrUpdateButtonText() {
    if (this.colors) {
      return 'Güncelle';
    }
    return 'Ekle';
  }
  addorUpdateClick() {
    if (this.colors) {
      this.update();
      console.log('update');
    } else {
      this.add();
      console.log('add');
    }
  }

  



}

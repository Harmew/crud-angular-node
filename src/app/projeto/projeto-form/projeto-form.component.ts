import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-projeto-form',
  templateUrl: './projeto-form.component.html',
  styleUrls: ['./projeto-form.component.scss'],
})
export class ProjetoFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  submitted = false;
  isReadonly = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params?.['editar'] == 'vizualizar') {
      this.isReadonly = true;
    }
    let _id: string = this.route.snapshot.params['id'];
    if (_id) this.getDados(_id);

    this.form = this.formBuilder.group({
      _id: [_id],
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [this.validatorNumber]],
      job: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
    });
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  validatorNumber(input: FormControl) {
    const reg =
      /(\b\(\d{2}\)\s?[9]?\s?\d{4}(\-|\s)?\d\d{4})|(\b\d{2}\s?[9]?\s?\d{4}(\-|\s)?\d{4})|(\b([9]|[9]\s)?\d{4}(\-|\s)?\d{4})|(\b\d{4}(\-|\s)?\d{4})/;
    if (reg.test(input.value)) {
      return null;
    } else {
      return {
        number: true,
      };
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.clientService.saveMethod(this.form.value).subscribe(() => {
        this.router.navigate(['/projeto']);
      });
    }
  }

  onCancel(): void {
    this.submitted = false;
    this.form.reset();
    this.router.navigate(['/projeto']);
  }

  getDados(_id: string) {
    return this.clientService
      .getByIdMethod(_id)
      .pipe(take(1))
      .subscribe({
        next: (client) => {
          this.form.patchValue(client);
        },
        error: (err) => {
          alert('Erro ao buscar cliente');
          this.router.navigate(['/projeto/']);
        },
      });
  }
}

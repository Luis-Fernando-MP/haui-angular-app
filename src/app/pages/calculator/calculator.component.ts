import { Component, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus, Trash2 } from 'lucide-angular';

type CashFlow = FormControl<number | null>;

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LucideAngularModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent {
  protected readonly TrashIcon = Trash2;
  protected readonly PlusIcon = Plus;

  protected form = signal(
    new FormGroup({
      initialInvestment: new FormControl(0),
      interestRate: new FormControl(0),
      cashFlows: new FormArray([new FormControl(0)]),
    })
  );

  protected netPresentValue = 0;

  get cashFlows() {
    return this.form().get('cashFlows') as FormArray<CashFlow>;
  }

  addCashFlow() {
    this.cashFlows.push(new FormControl(0));
  }

  removeCashFlow(index: number) {
    this.cashFlows.removeAt(index);
  }

  calculateNPV() {
    const { valid, value: formValue } = this.form();
    if (!valid) return alert('Please fill in all fields correctly.');

    const initialInvestment = formValue.initialInvestment ?? 0;
    const interestRate = formValue.interestRate ?? 0;
    const flows = formValue.cashFlows ?? [];

    const cashFlows = flows.map((flow) => Number(flow ?? 0));

    const calculateVan = this.van(
      initialInvestment,
      interestRate,
      ...cashFlows
    );

    this.netPresentValue = calculateVan;
  }

  van = (I: number, r: number, ...V: number[]) => {
    let VAN = 0;
    for (let t = 1; t < V.length + 1; t++) {
      VAN += V[t - 1] / Math.pow(1 + r, t);
    }
    return Math.round(VAN - I);
  };
}

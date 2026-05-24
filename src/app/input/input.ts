import { Component } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {
   maxDigits = 12;

  value = '';
  displayValue = '';

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    // Remove commas and non-digits
    let rawValue = input.value
      .replace(/,/g, '')
      .replace(/\D/g, '');

    // Limit digit length
    rawValue = rawValue.slice(0, this.maxDigits);

    // Save raw value
    this.value = rawValue;

    // Format with commas
    this.displayValue = Number(rawValue).toLocaleString();

    // Handle empty input
    if (!rawValue) {
      this.displayValue = '';
    }

    // Update input
    input.value = this.displayValue;
    console.log(this.value, 'value')
  }
}

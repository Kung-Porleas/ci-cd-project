import { Component, Input, signal } from '@angular/core';

interface Account {
  id: number;
  accountNo: string;
  name: string;
  currency: string;
}

@Component({
  selector: 'app-account-table',
  imports: [],
  templateUrl: './account-table.html',
  styleUrl: './account-table.css',
})
export class AccountTable {
    accounts: Account[] = [
    {
      id: 1,
      accountNo: '010371018',
      name: 'John Doe',
      currency: 'USD',
    },
    {
      id: 2,
      accountNo: '677669',
      name: 'Jane Smith',
      currency: 'KHR',
    },
    {
      id: 3,
      accountNo: '123456789',
      name: 'David Lee',
      currency: 'USD',
    },
  ];

  @Input() multiple = false;


  copiedRowId = signal<number | null>(null);
  copiedAll = signal(false);

  async copyRow(account: Account) {
    const text =
      `${account.accountNo}` +
      `${account.name}` +
      `${account.currency}`;

    await navigator.clipboard.writeText(text);

    this.copiedRowId.set(account.id);

    setTimeout(() => {
      if (this.copiedRowId() === account.id) {
        this.copiedRowId.set(null);
      }
    }, 1500);
  }

  async copyAll() {
    const text = this.accounts
      .map(
        account =>
          `${account.accountNo}, ` +
          `${account.name}, ` +
          `${account.currency}`
      )
      .join('\n');

    await navigator.clipboard.writeText(text);

    this.copiedAll.set(true);

    setTimeout(() => {
      this.copiedAll.set(false);
    }, 1500);
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface BoxItem {
  id: number;
  label: string;
}

@Component({
  selector: 'app-select-box',
  imports: [CommonModule],
  templateUrl: './select-box.html',
  styleUrl: './select-box.css',
})
export class SelectBox {
  @Input() multiple = false;

  items: BoxItem[] = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' },
  ];

  selectedIds = new Set<number>();

  toggleSelection(item: BoxItem) {
    if (this.multiple) {
      if (this.selectedIds.has(item.id)) {
        this.selectedIds.delete(item.id);
      } else {
        this.selectedIds.add(item.id);
      }
      console.log('Selected:', this.selectedIds);
      const payload = {
        selectedIds: [...this.selectedIds],
      };

      console.log(payload);

      return;
    }

    // single select
    this.selectedIds.clear();
    this.selectedIds.add(item.id);
    console.log('Selected:', this.selectedIds);
  }

  isSelected(id: number): boolean {
    return this.selectedIds.has(id);
  }
}

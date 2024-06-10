import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventsService } from '../events.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { EventModalComponent } from '../event-modal/event-modal.component';
import Event from '../event';
@Component({
  selector: 'app-events',
  standalone: true,
  imports: [DatePipe, CommonModule, ReactiveFormsModule,MatDialogModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnChanges {
  @Input() selected: Date | null = null;

  title = new FormControl<string | null>('');
  desc = new FormControl<string | null>('');

  newEvent = new FormGroup({
    title: this.title,
    desc: this.desc
  });

  currEvents: Event[] = [];

  constructor(public events: EventsService , public dialog: MatDialog) {}

  openDialog(event : Event ) {
    const dialogRef = this.dialog.open(EventModalComponent ,{
      data : {
        title : event.title,
        date :event.date,
        id : event.id,
        desc : event.date

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selected'] && changes['selected'].currentValue) {
      this.updateCurrEvents();
    }
  }

  updateCurrEvents(): void {
    if (this.selected) {
      this.currEvents = this.events.events.filter(event =>
        event.date.toDateString() === this.selected?.toDateString()
      );
    }
  }
  truncate(text: string, limit: number): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
  onSubmit(): void {
    if (this.title.value && this.desc.value && this.selected) {
      this.events.events.push({
        id: this.events.index++,
        title: this.title.value,
        desc: this.desc.value,
        date: this.selected
      });
      this.title.reset();
      this.desc.reset();
      this.updateCurrEvents();
    }
    else{
      alert('pls fill out all details')
    }
  }
}

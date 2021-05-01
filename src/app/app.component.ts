import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { SampleDialogComponent } from './components/sample-dialog/sample-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('fullscreenArea') fullscreenArea!: ElementRef;
  isFullscreen$ = new BehaviorSubject<boolean>(false);

  constructor(public dialog: MatDialog) {}

  public handleOpenDialog() {
    this.dialog.open(SampleDialogComponent);
  }

  public handleClickFullscreen() {
    if (!this.isFullscreen$.value) {
      this.fullscreenArea.nativeElement.requestFullscreen();
      return;
    }

    document.exitFullscreen();
  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  public fullscreenEvent() {
    if (document.fullscreenElement) {
      this.isFullscreen$.next(true);
      return;
    }

    this.isFullscreen$.next(false);
  }
}

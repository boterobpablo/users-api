import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { UserSmall } from '../../interfaces/user-small';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(
    public dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public user: UserSmall
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close('Juan');
  }
}

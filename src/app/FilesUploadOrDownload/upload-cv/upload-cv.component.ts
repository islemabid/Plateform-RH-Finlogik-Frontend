import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileService } from 'src/services/file.service';

@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrls: ['./upload-cv.component.scss']
})
export class UploadCvComponent implements OnInit {
  CVToUpload:any;
  message: any;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private fileService:FileService) { }

  ngOnInit() {
  }

  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.fileService.uploadCV(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.message =event.body;
          this.CVToUpload=this.message.substring(15);
          this.onUploadFinished.emit(event.body);
        }
      });
  }

}


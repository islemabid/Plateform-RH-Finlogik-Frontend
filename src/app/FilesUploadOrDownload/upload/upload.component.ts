
import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileService } from 'src/services/file.service';





@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  photoToUpload:any;
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

    this.fileService.upload(formData)
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.message =event.body;
          this.photoToUpload=this.message.substring(18);

          this.onUploadFinished.emit(event.body);
        }
      });
  }
}



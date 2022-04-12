
import { Component, Input, OnInit } from '@angular/core';
import { FileService } from 'src/services/file.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {
  @Input() public fileUrl: string;
  progress:any;
  message:string;
  constructor(private fileService:FileService) { }

  ngOnInit(): void {
  }

  download() {
    this.fileService.download(this.fileUrl).subscribe((event) => {
      console.log(event);
      this.downloadFile(event);
});
}
private downloadFile(data) {
         const downloadedFile = new Blob([data.body], { type: data.type });
         console.log(downloadedFile);
         const a = document.createElement('a');
          a.setAttribute('style', 'display:none;');
          document.body.appendChild(a);
          console.log(this.fileUrl);
          a.download = this.fileUrl;
          a.href = URL.createObjectURL(downloadedFile);
          a.target = '_blank';
          a.click();
         document.body.removeChild(a);
}

}

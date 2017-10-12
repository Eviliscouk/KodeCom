import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BatchService } from '../batch.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-batch-reports-view',
  templateUrl: './batch-reports-view.component.html',
  styleUrls: ['./batch-reports-view.component.css'],
  providers: [BatchService]
})
export class BatchReportsViewComponent implements OnInit {
public batches : string[] = [];
private batchesSub: Subscription;
  constructor(private route: ActivatedRoute, private router: Router, private batchService: BatchService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.batchService.getBatches().subscribe(b => this.batches = b);
          this.batchesSub = this.batchService.batchesChanged.subscribe(c => this.batchService.getBatches().subscribe((b => this.batches = b)));
          
        }
      );
  }

  public getBatch(batch : string)
  {
      this.batchService.getBatch(batch);
  }

  public deleteBatch(batch : string)
  {
     this.batchService.deleteBatch(batch);
  }

}

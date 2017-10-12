import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BatchService } from '../batch.service';
import { Batch } from '../batch.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-batch-reports-view',
  templateUrl: './batch-reports-view.component.html',
  styleUrls: ['./batch-reports-view.component.css'],
  providers: [BatchService]
})
export class BatchReportsViewComponent implements OnInit, OnDestroy {
public batches : Batch[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private batchService: BatchService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.batchService.getBatches().subscribe(b => {this.batches = b;});
        }
      );
  }

  public getBatch(batch : string)
  {
      this.batchService.getBatch(batch);
  }

  public async deleteBatch(batch : string)
  {
    var result = await this.batchService.deleteBatch(batch);
    if (result == 'Ok')
    {
      this.batchService.getBatches().subscribe((b => this.batches = b));
    }
  }

  ngOnDestroy() {
       
    }

}

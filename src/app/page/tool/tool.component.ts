import { Component, OnInit } from '@angular/core';
import { LoopCard } from './../../tool/loop-card/loopcard';
import { RequesterService } from './../../service/requester.service';
import { StorageService } from './../../service/storage.service';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css'],
  providers: [RequesterService, StorageService]
})
export class ToolComponent implements OnInit {

  public loopCards: LoopCard[];

  constructor(private requesterService: RequesterService) { }

  ngOnInit() {

    this.loopCards = new Array<LoopCard>();

    this.loopCards.push(new LoopCard());

  }

  saveLoopCard(card: any): void {
    this.requesterService.upload('/test', [{ key: 'image', file: card.file }], { param_one: 1, params_two: 2 });
    card.status = true;
  }

  deleteLoopCard(card: any): void {
    this.loopCards.splice(this.loopCards.indexOf(card), 1);
  }

}

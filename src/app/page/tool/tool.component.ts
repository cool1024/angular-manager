import { Component, OnInit } from '@angular/core';
import { LoopCard } from './../../tool/loop-card/loopcard';
import { RequesterService } from './../../service/requester.service';
import { StorageService } from './../../service/storage.service';
import { LoopsService } from './loops.service';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css'],
  providers: [RequesterService, StorageService, LoopsService]
})
export class ToolComponent implements OnInit {

  public loopCards: LoopCard[];

  constructor(private loopsService: LoopsService) { }

  ngOnInit() {

    this.loopCards = new Array<LoopCard>();

    this.loopCards.push(new LoopCard());

  }

  saveLoopCard(card: LoopCard): void {
    this.loopsService.add(card, url => {
      card.image = url;
      card.base64 = "";
      card.file = null;
    });
    card.status = true;
  }

  deleteLoopCard(card: LoopCard): void {
    this.loopCards.splice(this.loopCards.indexOf(card), 1);
  }

}

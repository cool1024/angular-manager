import { Component, OnInit } from '@angular/core';
import { RequesterService } from './../../../service/requester.service';
import { LoopCard } from './../../../tool/loop-card/loopcard';

@Component({
  selector: 'app-card-demo',
  templateUrl: './card-demo.component.html',
  styleUrls: ['./card-demo.component.css']
})
export class CardDemoComponent implements OnInit {

  public loopCards: Array<LoopCard> = new Array<LoopCard>();

  constructor(private requesterService: RequesterService) { }

  ngOnInit() { }

  saveLoopCard(card: LoopCard): void {
    //上传图片，并携带参数url
    this.requesterService.upload('/loop-card', [{ key: 'image', file: card.file }], { url: card.url }, res => {
      card.status = true;
    });
  }

  addCard(): void {
    this.loopCards.push(new LoopCard());
  }

  deleteLoopCard(card: any): void {
    this.loopCards.splice(this.loopCards.indexOf(card), 1);
  }
}

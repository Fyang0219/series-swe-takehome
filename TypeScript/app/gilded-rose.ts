export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      // Decrease the item quality if item is not Aged Brie and Backstage passes to a TAFKAL80ETC concert and the quality is higher than 0
      if (
        this.items[i].name !== "Aged Brie" &&
        this.items[i].name !== "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name !== "Sulfuras, Hand of Ragnaros") {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      }
      // Increase the item quality if item is not Aged Brie and Backstage passes to a TAFKAL80ETC concert and the if the quality is below 50
      else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          // if Item is Backstage passes to a TAFKAL80ETC concert and the sellin is below 11 and quality below 50, increase the quality by 1
          if (
            this.items[i].name === "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            // if Item is Backstage passes to a TAFKAL80ETC concert and the sellin is below 6 and quality below 50, increase the quality by 1
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      // If Item is not Sulfuras, Hand of Ragnaros, decrease the sellIn by 1, Sulfuras is a legendary item and should not decrease
      if (this.items[i].name !== "Sulfuras, Hand of Ragnaros") {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      // If selllIn is below 0 and Item is not Aged Brie and not Backstage passes to a TAFKAL80ETC concert and quality is bigger than 0 and item is not Sulfras, decrease the quality by 1, else set quality to zero
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name !== "Aged Brie") {
          if (
            this.items[i].name !== "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name !== "Sulfuras, Hand of Ragnaros") {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        }
        // as long as quality is smaller than 0, increase it by 1
        else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}

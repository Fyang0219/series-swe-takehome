import { Item, GildedRose } from "@/gilded-rose";

describe("GildedRose", () => {
  describe("updateQuality", () => {
    it("should decrease sellIn and quality values for normal items", () => {
      const items = [
        new Item("+5 Dexterity Vest", 10, 20),
        new Item("Elixir of the Mongoose", 5, 7),
      ];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0].sellIn).toBe(9);
      expect(updatedItems[0].quality).toBe(19);
      expect(updatedItems[1].sellIn).toBe(4);
      expect(updatedItems[1].quality).toBe(6);
    });

    it("should decrease quality by 2 when sell by date has passed", () => {
      const items = [new Item("+5 Dexterity Vest", 0, 20)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0].sellIn).toBe(-1);
      expect(updatedItems[0].quality).toBe(18);
    });

    it("should increase quality for Aged Brie", () => {
      const items = [new Item("Aged Brie", 2, 0)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0].sellIn).toBe(1);
      expect(updatedItems[0].quality).toBe(1);
    });

    it("should not allow quality to exceed 50", () => {
      const items = [new Item("Aged Brie", 2, 50)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0].sellIn).toBe(1);
      expect(updatedItems[0].quality).toBe(50);
    });

    it("should not decrease quality for Sulfuras", () => {
      const items = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0].sellIn).toBe(0);
      expect(updatedItems[0].quality).toBe(80);
    });

    it("should increase quality for Backstage Passes", () => {
      const items = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      ];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0].sellIn).toBe(14);
      expect(updatedItems[0].quality).toBe(21);
    });

    it("should increase quality by 3 for Backstage Passes with 5 or less days left", () => {
      const items = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
      ];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();
      expect(updatedItems[0].sellIn).toBe(4);
      expect(updatedItems[0].quality).toBe(23);
    });

    it("should set quality to 0 for Backstage Passes after the concert", () => {
      const items = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
      ];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0].sellIn).toBe(-1);
      expect(updatedItems[0].quality).toBe(0);
    });

    it("should not allow negative quality values", () => {
      const items = [new Item("+5 Dexterity Vest", 0, 0)];
      const gildedRose = new GildedRose(items);
      const updatedItems = gildedRose.updateQuality();

      expect(updatedItems[0].sellIn).toBe(-1);
      expect(updatedItems[0].quality).toBe(0);
    });
  });
});

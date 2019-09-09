import {by, element, expect} from 'detox';
import {reloadApp} from "detox-expo-helpers";

const colors = [ 'black', 'blue', 'cyan', 'green', 'magenta', 'red', 'yellow' ];

describe('Color Grid tests', () => {
    beforeEach(async () => {
        await reloadApp();
    });

    it('Should display header text and sub header text', async () => {
        await expect(element(by.id("MainHeaderText"))).toExist();
        await expect(element(by.id("SubHeaderText"))).toExist();
        await expect(element(by.label("Tap on the colors below to change"))).toBeVisible();
        await expect(element(by.label("7 X 7 Color Grid"))).toBeVisible();
    });

    it('should display Grid component and rows', async () => {
        await expect(element(by.id("GridComponent"))).toBeVisible();

        await expect(element(by.id("row-0"))).toBeVisible();
        await expect(element(by.id("row-1"))).toBeVisible();
        await expect(element(by.id("row-2"))).toBeVisible();
        await expect(element(by.id("row-3"))).toBeVisible();
        await expect(element(by.id("row-4"))).toBeVisible();
        await expect(element(by.id("row-5"))).toBeVisible();
        await expect(element(by.id("row-6"))).toBeVisible();

    });


    it('should show row boxes in right color order', async () => {
        await expect(element(by.id("GridComponent"))).toBeVisible();

        await expect(element(by.id("row-0"))).toBeVisible();

        await expect(element(by.id('box-00'))).toBeVisible();
        await expect(element(by.id('box-01'))).toBeVisible();
        await expect(element(by.id('box-02'))).toBeVisible();
        await expect(element(by.id('box-03'))).toBeVisible();
        await expect(element(by.id('box-04'))).toBeVisible();
        await expect(element(by.id('box-05'))).toBeVisible();
        await expect(element(by.id('box-06'))).toBeVisible();

        await expect(element(by.id('box-22').withAncestor(by.id('row-2')))).toExist();
        await expect(element(by.id('box-32').withAncestor(by.id('row-2')))).toNotExist();

        await expect(element(by.id('box-10'))).toHaveLabel(colors[0]);
        await expect(element(by.id('box-11'))).toHaveLabel(colors[1]);
        await expect(element(by.id('box-12'))).toHaveLabel(colors[2]);
        await expect(element(by.id('box-13'))).toHaveLabel(colors[3]);
        await expect(element(by.id('box-14'))).toHaveLabel(colors[4]);
        await expect(element(by.id('box-15'))).toHaveLabel(colors[5]);
        await expect(element(by.id('box-16'))).toHaveLabel(colors[6]);
    });

    it('should change box color to next color in sequence when tapped', async () => {
        await expect(element(by.id("GridComponent"))).toBeVisible();

        await expect(element(by.id("row-7"))).toNotExist();

        await expect(element(by.id('box-20'))).toHaveLabel(colors[0]);
        await expect(element(by.id('box-21'))).toHaveLabel(colors[1]);
        await expect(element(by.id('box-22'))).toHaveLabel(colors[2]);
        await expect(element(by.id('box-23'))).toHaveLabel(colors[3]);
        await expect(element(by.id('box-24'))).toHaveLabel(colors[4]);
        await expect(element(by.id('box-25'))).toHaveLabel(colors[5]);
        await expect(element(by.id('box-26'))).toHaveLabel(colors[6]);

        await element(by.id('box-20')).tap();
        await element(by.id('box-21')).tap();
        await element(by.id('box-22')).tap();
        await element(by.id('box-23')).tap();
        await element(by.id('box-24')).tap();
        await element(by.id('box-25')).tap();
        await element(by.id('box-26')).tap();

        await expect(element(by.id('box-20'))).toHaveLabel(colors[1]);
        await expect(element(by.id('box-21'))).toHaveLabel(colors[2]);
        await expect(element(by.id('box-22'))).toHaveLabel(colors[3]);
        await expect(element(by.id('box-23'))).toHaveLabel(colors[4]);
        await expect(element(by.id('box-24'))).toHaveLabel(colors[5]);
        await expect(element(by.id('box-25'))).toHaveLabel(colors[6]);
        await expect(element(by.id('box-26'))).toHaveLabel(colors[0]);
    });
    
    it('box color should revert to original color if tapped 7 times', async () => {
        await expect(element(by.id('box-60'))).toBeVisible();
        await expect(element(by.id('box-70'))).toBeNotVisible();

        await expect(element(by.id('box-60'))).toHaveLabel(colors[0]);

        await element(by.id('box-60')).tap();
        await expect(element(by.id('box-60'))).toHaveLabel(colors[1]);
        await element(by.id('box-60')).tap();
        await expect(element(by.id('box-60'))).toHaveLabel(colors[2]);
        await element(by.id('box-60')).tap();
        await expect(element(by.id('box-60'))).toHaveLabel(colors[3]);
        await element(by.id('box-60')).tap();
        await expect(element(by.id('box-60'))).toHaveLabel(colors[4]);
        await element(by.id('box-60')).tap();
        await expect(element(by.id('box-60'))).toHaveLabel(colors[5]);
        await element(by.id('box-60')).tap();
        await expect(element(by.id('box-60'))).toHaveLabel(colors[6]);
        await element(by.id('box-60')).tap();
        await expect(element(by.id('box-60'))).toHaveLabel(colors[0]);
    });
});
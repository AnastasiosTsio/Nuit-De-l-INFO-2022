import { Wallpaper } from "./wallpaper.js";
import { chapitre, Histoire } from "./types.js";
import { Interface } from "./interface.js";

console.log("🚁");

window.onload = async () => {
    
    let wpDiv = <HTMLDivElement>document.querySelector(".wallpaper");
    if (!wpDiv) throw "Merci de ne pas détruire le HTML";

    const wall = new Wallpaper(wpDiv);
    
    wall.ajouteBG("journee", "/img/bg/journee.svg");
    wall.ajouteBG("matin", "/img/bg/matin.svg");
    wall.ajouteBG("nuit", "/img/bg/nuit.svg");
    wall.ajouteBG("soir", "/img/bg/soir.svg");
    wall.ajouteBG("soiree", "/img/bg/soiree.svg");
    
    wall.loadBG("journee");

    // @ts-ignore
    window.wall = wall;

    // Histoire

    let reqChapitres = await fetch("/data/scenario.json");
    let reqFacts = await fetch("/data/facts.json");
    let reqDesc = await fetch("/data/desc.json");


    let chapitres = <chapitre[]>JSON.parse(await reqChapitres.text());
    let facts = <string[][]>JSON.parse(await reqFacts.text());
    let desc_fin = <string[][]>JSON.parse(await reqDesc.text());

    const histoire = new Histoire(chapitres, facts, desc_fin);

    let truc = <HTMLDivElement>document.querySelector(".wrapper");
    let truc2 = <HTMLDivElement>document.querySelector(".modal");
    // @ts-ignore
    let iface = window.iface = new Interface(truc, histoire, wall, truc2);

}
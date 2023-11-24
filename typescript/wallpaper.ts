// export type WallpaperMode = 'clair' | 'sombre' | 'daltonien';

export class Wallpaper {

    private backgrounds: {nom: string, sombre: string}[] = [];
    // private mode: WallpaperMode = 'clair';
    private bg: string;

    constructor(
        private container: HTMLDivElement,
    ) {
        // Salut :D
    }

    /**
     * 
     * @param nom nom du fond
     * @param sombre url fond sombre
     * @param clair url fond clair
     * @param daltonien url fond daltonien
     */
    ajouteBG (nom: string, sombre: string) {
        this.backgrounds.push({ nom, sombre });
    }

    getBG (nom: string): string | undefined {
        let bg = this.backgrounds.filter(e => e.nom == nom)[0];
        if (!bg) return undefined;
        return bg.sombre //[this.mode];
    }

    /**
     * Charge un svg en tant que fond d'écran
     * @param url URL du SVG
     */
    loadBG (nom: string) {
        let url = this.getBG(nom);
        if (!url) return;

        this.bg = nom;
        this.container.style.setProperty("--img", `url(${url})`)

    }

    /**
     * Change le thème
     * @param mode Le mode
     */
    // changeMode (mode: WallpaperMode) {
    //     this.mode = mode;
    //     this.loadBG(this.bg);
    // }

}
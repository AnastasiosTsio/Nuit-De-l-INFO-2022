export class Histoire {
    heros: personnage;
    heros_decouverte: boolean[];

    constructor(private chapitres: chapitre[], private facts: string[][], private desc_fin: string[][]){

        if(localStorage.getItem("mst.hero")){
            this.heros = <personnage>JSON.parse(localStorage.getItem("mst.hero"));
        }else {
            this.heros = {
                branches_visitees: [0],
                index_branche: 0,
                index_dernier_checkpoint: 0,
                niveau_alcool: 0,
                max_alcool: 3,
                temps_parcours: 0
            }
        }

        if(localStorage.getItem("mst.hero.decouverte")){
            this.heros_decouverte = JSON.parse(localStorage.getItem("mst.hero.decouverte"));
        }else{
            this.heros_decouverte = [].fill(false,0,chapitres.length);
        }
   };

    dump(): void {
        localStorage.setItem("mst.hero", JSON.stringify(this.heros));
        localStorage.setItem("mst.hero.decouverte", JSON.stringify(this.heros_decouverte));
    }

    get_premier_chapitre(): chapitre {
        return this.get_chapitre(this.heros.branches_visitees[this.heros.index_branche]);
    }

    get_chapitre(id: number): chapitre {
        return this.chapitres.filter(e => id==e.id)[0];
    }

    get_avancee(): number {
        return Math.round((this.heros_decouverte.filter(e=>e).length/this.chapitres.length)*100);
    }

    get_alcool(): number {
        return this.heros.niveau_alcool;
    }

    est_fin(): boolean {
        let fin = this.get_chapitre(this.heros.branches_visitees[this.heros.index_branche]).reponses.length == 0;
        if(fin) localStorage.setItem("mst.hero", "");
        return fin;
    }

    incremente_alcool(gramme: number): void {
        this.heros.niveau_alcool += gramme;
        if(this.heros.niveau_alcool < 0) this.heros.niveau_alcool = 0;
        if(this.heros.niveau_alcool > this.heros.max_alcool) this.heros.niveau_alcool = this.heros.max_alcool;
    }

    chapitre_suivant(reponse: number): chapitre {
        /** Retourne le chapitre suivant en fonction du choix de l'utilisateur */
        const chap_actuel: chapitre = this.get_chapitre(this.heros.branches_visitees[this.heros.index_branche]);

        const rep = chap_actuel.reponses[reponse];
        const id_chap_suivant: number = rep.chapitre_destination;
        const new_chap: chapitre = this.get_chapitre(id_chap_suivant);

        this.heros_decouverte[id_chap_suivant]=true;

        this.incremente_alcool(-0.1); // Redescente de l'alcool.

        //MAJ donnees personnage.
        this.heros.index_branche++;
        this.heros.branches_visitees[this.heros.index_branche]=id_chap_suivant;
        if(new_chap.checkpoint) this.heros.index_dernier_checkpoint = this.heros.index_branche;
        if(rep.augmente_alcool) this.incremente_alcool(0.25);

        this.dump();

        return new_chap;
    };
    
    chapitre_precedent(): chapitre {
        /** Retourne le chapitre precedent par rapport a la position actuelle de l'utilisateur */
        this.heros.index_branche--;
        this.incremente_alcool(0.1);
        this.dump();
        return this.get_chapitre(this.heros.index_branche);
    }; // Retourne l'id du chapitre precedent

    get_fact(): string[] {
        return this.facts[~~(Math.random()*this.facts.length)];
    }

    get_texte_fin(): string {
        let fin = this.desc_fin.filter(e => e[0]==this.get_chapitre(this.heros.branches_visitees[this.heros.index_branche]).titre)[0]
        if (!fin) return "Rechargez le site pour découvir les autres pages ;)";
        return fin[1];
    }

}

export type personnage = {
    niveau_alcool: number;
    max_alcool: number;
    branches_visitees: number[]; // id des branches visites dans l'ordre de visite.
    index_branche: number;
    index_dernier_checkpoint: number; // position du dernier chapitre checkpoint dans branches_visitees.
    temps_parcours: number; // Temps de parcours depuis le debut de la game.
}

type reponse = {
    texte: string;
    min_alcool: number; // Pour etre affiche
    max_alcool: number; // Pour etre affiche
    chapitre_destination: number; // id du chapitre
    augmente_alcool: boolean; // True : augmente le taux d'alcool
};

export type chapitre = {
    id: number;
    titre: string;
    description: string;
    heure: string;
    nom_background: string;
    nom_image: string;
    checkpoint: boolean;
    reponses: reponse[];
};
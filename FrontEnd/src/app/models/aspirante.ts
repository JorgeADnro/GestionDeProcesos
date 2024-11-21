export class Aspirante{
    _id?: number;
    mat:String;
    nom: String;
    apeP: String;
    apeM: String;
    calle: String;
    no: String;
    col: String;
    ciudad: String;
    cp: Number;
    numTelCa: String;
    numTelAsp: String;
    numTelMaPa: String;
    mail: String;
    nomBach: String;
    promBach: Number;
    espCur: String;
    nomMa: String;
    apePMa: String;
    apeMMa: String;
    nomPa: String;
    apePPa: String;
    apeMPa: String;
    fechReg: Date;
    carrCur: String;
    foto?: string;
    cert?: String;
    compDom?: String;

    constructor(mat:String,nom: String,apeP: String,apeM: String,calle: String,no: String,col: String, 
        ciudad: String,cp: Number,numTelCa: String,numTelAsp: String,numTelMaPa: String,mail: String,
        nomBach: String,promBach: Number,espCur: String,nomMa: String,apePMa: String,apeMMa: String,
        nomPa: String,apePPa: String,apeMPa: String,fechReg: Date,carrCur: String, foto: string,cert: String,compDom: String){
            this.nom = nom;
            this.mat = mat;
            this.apeP = apeP;
            this.apeM = apeM;
            this.calle = calle;
            this.no = no;
            this.col = col;
            this.ciudad = ciudad;
            this.cp = cp;
            this.numTelCa = numTelCa;
            this.numTelAsp = numTelAsp;
            this.numTelMaPa = numTelMaPa;
            this.mail = mail;
            this.nomBach = nomBach;
            this.promBach = promBach;
            this.espCur = espCur;
            this.nomMa = nomMa;
            this.apePMa = apePMa;
            this.apeMMa = apeMMa;
            this.nomPa = nomPa;
            this.apePPa = apePPa;
            this.apeMPa = apeMPa;
            this.fechReg = fechReg;
            this.carrCur = carrCur;
            this.foto = foto;
            this.cert = cert;
            this.compDom = compDom;
    }
}


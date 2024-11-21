export class Paciente {
    _id?: number;
    mat: String;
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
    coment: String;
    fechReg: Date;
    carrCur: String;
    foto?: string;
    cert?: String;

    constructor(mat: String, nom: String, apeP: String, apeM: String, calle: String, no: String, col: String,
        ciudad: String, cp: Number, numTelCa: String, numTelAsp: String, numTelMaPa: String, mail: String, coment: String, fechReg: Date, carrCur: String, foto: string, cert: String) {
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
        this.coment = coment;
        this.fechReg = fechReg;
        this.carrCur = carrCur;
        this.foto = foto;
        this.cert = cert;
    }
}


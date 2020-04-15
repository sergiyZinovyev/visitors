export class VisitorModel {
    regnum:number;
    name:string;
    pobatkovi:string;
    prizv:string;
    gender:string;
    cellphone:string;
    email:string;
    countryid:string;
    regionid:string;
    city:string;
    m_robotu:string;
    posada:string;
    sferadij:string;
    potvid: string;

    namepovne: string;
    postindeks: string;
    address:string;
    postaddreses: string;
    telephon: string;
    type: string;
    kompeten: string;
    datawnesenny: string;
    datelastcor: string;
    rating: string;
    ins_user: string;

    constructor(getVisitorData?){
        this.regnum = getVisitorData?.regnum ?? "";
        this.name = getVisitorData?.name ?? "";
        this.pobatkovi = getVisitorData?.pobatkovi ?? "";
        this.prizv = getVisitorData?.prizv ?? "";
        this.gender = getVisitorData?.gender ?? "";
        this.cellphone = getVisitorData?.cellphone ?? "";
        this.email = getVisitorData?.email ?? "";
        this.countryid = String(getVisitorData?.countryid ?? "1");
        this.regionid = String(getVisitorData?.regionid ?? "");
        this.city = getVisitorData?.city ?? "";
        this.m_robotu = getVisitorData?.m_robotu ?? "";
        this.posada = getVisitorData?.posada ?? "";
        this.sferadij = getVisitorData?.sferadij ?? "";
        this.potvid = getVisitorData?.potvid ?? "";

        this.namepovne = getVisitorData?.namepovne ?? "";
        this.postindeks = getVisitorData?.postindeks ?? "";
        this.address = getVisitorData?.address ?? "";
        this.postaddreses = getVisitorData?.postaddreses ?? "";
        this.telephon = getVisitorData?.telephon ?? "";
        this.type = getVisitorData?.type ?? "";
        this.kompeten = getVisitorData?.kompeten ?? "";
        this.datawnesenny = getVisitorData?.datawnesenny ?? "";
        this.datelastcor = getVisitorData?.datelastcor ?? "";
        this.rating = getVisitorData?.rating ?? "";
        this.ins_user = getVisitorData?.ins_user ?? "";
    }

    
    public get fullName(): string {
        return this.name + ' ' + this.prizv
    }

    public set newEmail(v : string) {
        this.email = v;
    }

    public set newCellphone(v : string) {
        this.cellphone = v;
    }
    
    
}

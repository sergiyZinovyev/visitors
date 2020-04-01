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

    constructor(getVisitorData?){
        this.regnum = getVisitorData?.regnum ?? null;
        this.name = getVisitorData?.name ?? null;
        this.pobatkovi = getVisitorData?.pobatkovi ?? null;
        this.prizv = getVisitorData?.prizv ?? null;
        this.gender = getVisitorData?.gender ?? null;
        this.cellphone = getVisitorData?.cellphone ?? null;
        this.email = getVisitorData?.email ?? null;
        this.countryid = String(getVisitorData?.countryid ?? "1");
        this.regionid = String(getVisitorData?.regionid ?? null);
        this.city = getVisitorData?.city ?? null;
        this.m_robotu = getVisitorData?.m_robotu ?? null;
        this.posada = getVisitorData?.posada ?? null;
        this.sferadij = getVisitorData?.sferadij ?? null;
        this.potvid = getVisitorData?.potvid ?? null;
    }

    
    public get fullName(): string {
        return this.name + this.pobatkovi + this.prizv
    }

    public set newEmail(v : string) {
        this.email = v;
    }

    public set newCellphone(v : string) {
        this.cellphone = v;
    }
    
    
}

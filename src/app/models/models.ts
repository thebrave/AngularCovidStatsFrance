// tslint:disable-next-line: no-unused-expression
export interface GlobalDataFrance{
    casConfirmes: number;
    casConfirmesEhpad: number;
    code: string;
    date: number;
    deces: number;
    decesEhpad: number;
    gueris: number;
    hospitalises: number;
    nom: string;
    nouvellesHospitalisations: number;
    nouvellesReanimations: number;
    reanimation: number;
    source: {
        nom: string
    };
 }

// tslint:disable-next-line: class-name
export interface keyable {
    [key: string]: any;
}

export interface GlobalDataFranceParDepartement {
    code: string;
    date: number;
    deces: number;
    gueris: number;
    hospitalises: number;
    nom: string;
    nouvellesHospitalisations: number;
    nouvellesReanimations: number;
    reanimation: number;
    source: {
        nom: string
    };
    sourceType: string;
}


export interface CourseRoundsEndpoint {
  course: Course;
  termsWithCourseRounds: TermsWithCourseRound[];
  formattedGradeScales: FormattedGradeScales;
}

export interface Course {
  title: Title;
  credits: number;
  creditUnitLabel: CreditUnitLabel;
  creditUnitAbbr: CreditUnitAbbr;
  state: string;
}

export interface Title {
  sv: string;
  en: string;
}

export interface CreditUnitLabel {
  sv: string;
  en: string;
}

export interface CreditUnitAbbr {
  sv: string;
  en: string;
}

export interface TermsWithCourseRound {
  term: string;
  rounds: Round[];
  examinationRounds: ExaminationRound[];
  courseSyllabus: any;
}

export interface Round {
  shortName: string;
  ladokRoundId: string;
  applicationCode: string;
  ladokUID: string;
  firstTuitionDate: string;
  lastTuitionDate: string;
  state: string;
  language: Language;
  campus: Campus;
  connectedProgrammes: ConnectedProgramme[];
}

export interface Language {
  sv: string;
  en: string;
}

export interface Campus {
  sv: string;
  en: string;
}

export interface ConnectedProgramme {
  programmeCode: string;
  title: Title2;
  electiveCondition: ElectiveCondition;
}

export interface Title2 {
  sv: string;
  en: string;
}

export interface ElectiveCondition {
  sv: string;
  en: string;
}

export interface ExaminationRound {
  examCode: string;
  title: Title3;
  credits: number;
  creditUnitLabel: CreditUnitLabel2;
  creditUnitAbbr: CreditUnitAbbr2;
  gradeScaleCode: string;
  ladokUID: string;
}

export interface Title3 {
  sv: string;
  en: string;
}

export interface CreditUnitLabel2 {
  sv: string;
  en: string;
}

export interface CreditUnitAbbr2 {
  sv: string;
  en: string;
}

export interface FormattedGradeScales {
  AF: string;
}

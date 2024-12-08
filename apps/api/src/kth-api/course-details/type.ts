export interface CourseDetailsEndpoint {
  course: Course;
  examiners: Examiner[];
  roundInfos: RoundInfo[];
  mainSubjects: string[];
  examinationSets: Record<string, N20072>;
  publicSyllabusVersions: PublicSyllabusVersion[];
  socialCoursePageUrl: string;
  formattedGradeScales: FormattedGradeScales;
}

export interface Course {
  academicLevel: string;
  addOn: string;
  courseCode: string;
  versionNumber: number;
  departmentCode: string;
  department: Department;
  educationalLevelCode: string;
  educationalTypeId: number;
  gradeScaleCode: string;
  infoContactName: string;
  title: string;
  titleOther: string;
  cancelled: boolean;
  deactivated: boolean;
  credits: number;
  creditUnitLabel: string;
  creditUnitAbbr: string;
  state: string;
  courseVersion: CourseVersion;
}

export interface Department {
  code: string;
  name: string;
}

export interface CourseVersion {
  versionNumber: number;
  keywordsEn: any[];
  keywordsSv: any[];
}

export interface Examiner {
  kthid: string;
  givenName: string;
  lastName: string;
  email: string;
  username: string;
}

export interface RoundInfo {
  lectureCount: number;
  excerciseCount: number;
  usage: Usage[];
  timeslots: string;
  hasTimeslots: boolean;
  schemaUrl: string;
  ldapResponsibles: LdapResponsible[];
  ldapTeachers: LdapTeacher[];
  round: Round;
}

export interface Usage {
  specCode: string;
  programmeCode: string;
  progAdmissionTerm: ProgAdmissionTerm;
  studyYear: number;
  title: string;
  electiveCondition: ElectiveCondition;
}

export interface ProgAdmissionTerm {
  term: number;
}

export interface ElectiveCondition {
  ordinal: number;
  name: string;
  abbrLabel: string;
}

export interface LdapResponsible {
  kthid: string;
  givenName: string;
  lastName: string;
  email: string;
  username: string;
}

export interface LdapTeacher {
  kthid: string;
  givenName: string;
  lastName: string;
  email: string;
  username: string;
}

export interface Round {
  ladokRoundId: string;
  ladokUID: string;
  state: string;
  tutoringTimeOfDay: TutoringTimeOfDay;
  municipalityCode: string;
  tutoringForm: TutoringForm;
  shortName: string;
  campus: Campus;
  selectionCriteriaSv: string;
  selectionCriteriaEn: string;
  language: string;
  targetGroup: string;
  draftCourseRoundType: DraftCourseRoundType;
  courseRoundTerms: CourseRoundTerm[];
  applicationCodes: ApplicationCode[];
  startTerm: StartTerm;
  isPU: boolean;
  isVU: boolean;
  startWeek: StartWeek2;
  endWeek: EndWeek2;
  startDate: string;
  firstTuitionDate: string;
  lastTuitionDate: string;
  studyPace: number;
}

export interface TutoringTimeOfDay {
  name: string;
  key: string;
}

export interface TutoringForm {
  name: string;
  key: string;
}

export interface Campus {
  name: string;
  label: string;
}

export interface DraftCourseRoundType {
  code: string;
  name: string;
  active: boolean;
  category: string;
}

export interface CourseRoundTerm {
  formattedPeriodsAndCredits: string;
  term: Term;
  startWeek: StartWeek;
  endWeek: EndWeek;
  creditsP2?: number;
  creditsP3?: number;
}

export interface Term {
  term: number;
}

export interface StartWeek {
  year: number;
  week: number;
}

export interface EndWeek {
  year: number;
  week: number;
}

export interface ApplicationCode {
  applicationCode: string;
  term: string;
  courseRoundType: CourseRoundType;
  avgFri: boolean;
  admissionRoundCode: string;
}

export interface CourseRoundType {
  code: string;
  name: string;
  active: boolean;
  category: string;
}

export interface StartTerm {
  term: number;
}

export interface StartWeek2 {
  year: number;
  week: number;
}

export interface EndWeek2 {
  year: number;
  week: number;
}

export interface N20072 {
  startingTerm: StartingTerm;
  examinationRounds: ExaminationRound[];
}

export interface StartingTerm {
  term: number;
}

export interface ExaminationRound {
  examCode: string;
  title: string;
  gradeScaleCode: string;
  credits: number;
  creditUnitLabel: string;
  creditUnitAbbr: string;
  ladokUID: string;
}

export interface PublicSyllabusVersion {
  edition: number;
  validFromTerm: ValidFromTerm;
  inStateApproved: boolean;
  courseSyllabus: CourseSyllabus;
}

export interface ValidFromTerm {
  term: number;
}

export interface CourseSyllabus {
  discontinuationText: string;
  goals: string;
  content: string;
  eligibility?: string;
  examComments: string;
  establishment: string;
  languageOfInstruction: string;
  transitionalRegulations?: string;
  ethicalApproach: string;
  courseSyllabusVersionValidFromTerm: CourseSyllabusVersionValidFromTerm;
  literature?: string;
  reqsForFinalGrade?: string;
}

export interface CourseSyllabusVersionValidFromTerm {
  term: number;
}

export interface FormattedGradeScales {
  AF: string;
  PF: string;
}

export interface SubjectRequestDto {
  subjectName: string;
  totalQuestions: number;
  difficultyLevel: string;
  totalSecondsToComplete: number;
  additionalNotes?: string;
  id?: string;
  createdAt?: string;
}

export interface NewExamRequestsDto {
  uniqueExamIdentification: string;
  domainName: string;
  emailIDs: string[];
  additionalNotes?: string;
  expiryDate: Date;
  subjects: SubjectRequestDto[];
}

export interface ExamsDetailsDto {
  createdBy: string;
  uniqueExamIdentification: string;
  domainName: string;
  emailIDs: string[];
  failedEmailIDs?: string[];
  additionalNotes?: string;
  expiryDate: string; // or Date if you parse it
  id: string;
  createdAt: string;
  subjects: SubjectRequestDto[];
}

//#region Student Exams
export interface StudentExam extends CommonDBFields {
  examRequestId: string;
  studentId: string;
  studentEmailId: string;
  examCreatedByUserId: string;
  examName: string;
  domain: string;
  additionalNotes: string;
  examLink: string;
  emailSent: boolean;
  linkClicked: boolean;
  score: number;
  examCompleted: boolean;
  expiryDate: string;
  subjects: StudentExamSubjectsQandAData[];
}
export function createEmptyStudentExam(): StudentExam {
  return {
    // CommonDBFields (if you have them)
    id: '',
    createdAt: '',

    // StudentExam fields
    examRequestId: '',
    studentId: '',
    studentEmailId: '',
    examCreatedByUserId: '',
    examName: '',
    domain: '',
    additionalNotes: '',
    examLink: '',
    emailSent: false,
    linkClicked: false,
    score: 0,
    examCompleted: false,
    expiryDate: '',
    subjects: []
  };
}

export interface StudentExamSubjectsQandAData extends SubjectRequestDto {
  examRetryCount: number;
  examStartedDateTime: string;
  examCompletedDateTime: string;
  score: number;
  examStatus: ExamStatus;
  isVerified: boolean;
  qandA: Question[];
}

export enum ExamStatus {
  NOT_STARTED = 0,
  LINK_CLICKED = 1,
  STARTED = 2,
  COMPLETED = 3,
  CLOSED_IN_MIDDLE = 4,
  FATAL_ERROR = 5
}

export interface Question {
  id: number;
  questionType: string;  // MCSS, MCMS, TF, COP, CW, SA, LAD
  q: string;
  a: string;
  studentAnswer: string;
  options?: string[] | null;
  score: number;
}

export interface CommonDBFields {
  id: string;
  createdAt: string;
}

//#endregion


export interface StartExamRequest {
  ExamId: string;
  SubjectId: string;
}

export interface ExamsSubjectsQuestionsData {
    questions: Question[];
    totalSecondsToComplete: number;
}

export interface SubmitExamRequest {
  ExamId: string;
  SubjectId: string;
  Questions: Question[];
}

export type QuestionType = 
  | "MCSS" 
  | "MCMS" 
  | "TF" 
  | "COP" 
  | "SA" 
  | "LAD" 
  | "CW";

  export const QUESTION_TYPE_LABELS: Record<string, string> = {
  "MCSS": "Multiple Choice – Single Select",
  "MCMS": "Multiple Choice – Multi Select",
  "TF": "True / False",
  "COP": "Code Output Prediction",
  "SA": "Short Answer",
  "LAD": "Long Answer / Descriptive",
  "CW": "Code Writing"
};
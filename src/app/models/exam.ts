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

export interface StudentExamSubjectsQandAData extends SubjectRequestDto {
  examRetryCount: number;
  examStartedDateTime: string;
  examCompletedDateTime: string;
  score: number;
  examStatus: ExamStatus;
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
  q: string;
  a: string;
  score: number;
}

export interface CommonDBFields {
  id: string;
  createdAt: string;
}
//#endregion
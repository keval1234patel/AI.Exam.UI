export interface SubjectRequestDto {
  subjectName: string;
  totalQuestions: number;
  difficultyLevel: string;
  totalSecondsToComplete: number;
  additionalNotes: string;
}

export interface NewExamRequestsDto {
  uniqueExamIdentification: string;
  domainName: string;
  emailIDs: string[];
  additionalNotes: string;
  expiryDate: Date;
  subjects: SubjectRequestDto[];
}
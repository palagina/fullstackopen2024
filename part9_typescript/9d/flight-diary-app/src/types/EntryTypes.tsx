export interface EntryType {
  id: number;
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}

export interface NewEntryType {
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}
  
  // interface CoursePartBaseDescription extends CoursePartBase {
  //   description: string;
  // }
  // interface CoursePartBasic extends CoursePartBaseDescription {
  //   kind: "basic"
  // }
  
  // interface CoursePartGroup extends CoursePartBase {
  //   groupProjectCount: number;
  //   kind: "group"
  // }
  
  // interface CoursePartBackground extends CoursePartBaseDescription {
  //   backgroundMaterial: string;
  //   kind: "background"
  // }
  
  // export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

// export type EntryType = EntryBase;


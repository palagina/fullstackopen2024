interface NewEntryType {
  date: string;
  visibility: string;
  weather: string;
  comment: string;
}

interface EntryTypeWithId extends NewEntryType {
  id: number;
}

export type EntryType = EntryTypeWithId | NewEntryType
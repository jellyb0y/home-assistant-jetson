export interface IStorage {
  [camID: string]: {
    uploadAvailable: boolean;
    uploaded: string;
    processed: string;
  };
}

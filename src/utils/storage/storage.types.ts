export interface IStorage {
  [camID: string]: {
    queued: string | null;
    processed: string | null;
  };
}

export interface IUploadedImage {
  path: string;
  type: string;
  name: string;
}

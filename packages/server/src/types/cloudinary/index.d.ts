declare module 'cloudinary' {
  export function config(options?: ConfigOptions): ConfigOptions;
  export function image(filename: string, options: any): void;
  export const v2: V2;
}

interface V2 {
  uploader: Uploader;
}

interface Uploader {
  upload: Upload;
  rename: Rename;
  destroy: Destroy;
}

interface Upload {
  (filename: string, callback?: (result: UploadResult, error: any) => void): Promise<UploadResult>;
  (filename: string, options: UploadOptions, callback?: (result: UploadResult, error: any) => void): Promise<
    UploadResult
  >;
}

interface Rename {
  (from_public_id: string, to_public_id: string, options: RenameOptions, callback?: any): RenameResult;
  (from_public_id: string, to_public_id: string, callback?: any): RenameResult;
}

interface Destroy {
  (public_id: string, options: DestroyOptions, callback?: any): Promise<{ result: string }>;
  (public_id: string, callback?: any): Promise<{ result: string }>;
}

interface UploadOptions {
  resource_type?: string;
  type?: string;
  invalidate?: boolean;
  overwrite?: boolean;
  folder?: string;
}

interface RenameOptions {
  resource_type?: string;
  type?: string;
  invalidate?: boolean;
  overwrite?: boolean;
  to_type?: string;
}

interface DestroyOptions {
  resource_type?: string;
  type?: string;
  invalidate?: boolean;
}

interface ConfigOptions {
  cloud_name?: string;
  api_key?: string;
  api_secret?: string;
  private_cdn?: boolean;
  secure_distribution?: string;
}

interface AccessControlOptions {
  access_type?: string;
  start?: string;
  end?: string;
}

interface EagerResponse {
  transformation: string;
  width: number;
  height: number;
  url: string;
  secure_url: string;
}

interface UploadResult {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  access_control: AccessControlOptions[];
  format: string;
  resource_type: string;
  created_at: string;
  tags: [];
  bytes: number;
  type: string;
  etag: string;
  url: string;
  secure_url: string;
  original_filename: string;
  eager: EagerResponse[];
}

interface RenameResult {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: [];
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
}

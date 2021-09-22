export interface Font {
  filePath: string;
  targetFilePath?: string;
  fontName: string;
  text?: string[];
  unicodes?: string[];
  weight: string;
  style: string;
  skip?: boolean;
}

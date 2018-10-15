declare interface IRatingWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'RatingWebPartStrings' {
  const strings: IRatingWebPartStrings;
  export = strings;
}

interface JQuery
{
  rateYo(options: IOptions | string): Function;
}
interface IOptions {
  rating?: number;  
  starWidth?:string; 
  readOnly?:boolean;
  ratedFill?:string;
}

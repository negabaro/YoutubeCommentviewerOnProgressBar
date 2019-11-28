/* =====================================  */
export interface IoriginComment {
  items: IoriginCommentItem[];
  nextPageToken?: string;
}

export interface IoriginCommentItem {
  snippet: {
    topLevelComment: {
      snippet: {
        textDisplay: string;
        textOriginal: string;
        likeCount: number;
      };
    };
  };
}

/* =====================================  */
export interface IfilteredComment {
  result: IfilteredCommentItem[];
  nextPageToken?: string;
}

export interface IfilteredCommentItem {
  origin: string;
  time: RegExpMatchArray | null;
}

/* =====================================  */

export interface IcommentCountDetail {
  items: [IcommentCountDetailItem];
}

export interface IcommentCountDetailItem {
  statistics: {
    commentCount: number;
  };
}

export interface IdurationDetail {
  items: [
    {
      contentDetails: {
        duration: string;
      };
    }
  ];
}

export interface items<T> {
  // items: T[];
  items: Array<T>;
}

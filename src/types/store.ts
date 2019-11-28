export interface Istate {
  currentNextPageToken: string | null;
  // allCommentCount: number;
  // allFilteredCommentCount: number;
  slideBarWidthSize: number;
  currentVideoId: string;
  videoDuration: number;
  // commentItem: {};
}

export interface Istore {
  getters: any;
  state: any;
  mutation: any;
  // actions: any;
}

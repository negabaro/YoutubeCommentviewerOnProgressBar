export interface Istate {
  currentNextPageToken: string | null;
  allCommentCount: number;
  allFilteredCommentCount: number;
  slideBarWidthSize: number;
  currentVideoId: string;
  allCommentsApiStatus: {};
  videoDurationApiStatus: {};
  videoDuration: string;
  commentItem: {};
}

export interface Istore {
  getters: any;
  state: any;
  mutation: any;
  actions: any;
}

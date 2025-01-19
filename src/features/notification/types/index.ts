export interface GetNotificationsReponse {
  data: Array<MoimeNotification>;
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  total: number;
  last: boolean;
}

export interface MoimeNotification {
  id: number;
  type:
    | 'MOIM_INVITED'
    | 'MOIM_STARTED'
    | 'MOIM_FAILED'
    | 'MOIM_FINISHED'
    | 'MOIM_COMPLETED'
    | 'MOIM_OWNER_ASSIGNED'
    | 'FOLLOWER_ADDED';
  content: string;
  checked: boolean;
  createdAt: string;
}

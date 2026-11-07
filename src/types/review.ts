export interface Reviewer {
  displayName: string;
  profilePhotoUrl?: string;
}

export interface ReviewReply {
  comment: string;
  updateTime: string;
  reviewReplyState?: string;
}

export interface CustomerReview {
  reviewId: string;
  reviewer: Reviewer;
  starRating: number;
  comment: string;
  createTime: string;
  updateTime?: string;
  reviewReply?: ReviewReply;
  reviewReplyUrl?: string;
}

export interface FeaturableWidgetData {
  success?: boolean;
  widget: string;
  layout?: string;
  published?: boolean;
  averageRating: number;
  totalReviewCount: number;
  batchSize?: number;
  profileUrl: string;
  reviews: CustomerReview[];
}


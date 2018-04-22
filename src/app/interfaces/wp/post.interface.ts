import { CommentStatus } from '../../enum/wp/comment-status.enum';
import { PingStatus } from '../../enum/wp/ping-status.enum';
import { PostStatus } from '../../enum/wp/post-status.enum';
import { PostFormat } from '../../enum/wp/post-format.enum';

/**
 * Wordpress Post interface
 *
 * @export
 * @interface WPpost
 */
export interface WPpost {
  date: string;
  date_gmt: string;
  readonly guid?: any;
  readonly id?: number;
  readonly link?: string;
  readonly modified?: string;
  readonly modified_gmt?: string;
  slug: string;
  status: PostStatus;
  readonly type?: string;
  password: string;
  title: any;
  content: any;
  author: number;
  excerpt: any;
  featured_media: number;
  comment_status: CommentStatus;
  ping_status: PingStatus;
  format: PostFormat;
  meta: any;
  sticky: boolean;
  template: string;
  categories: any[];
  tags: any[];
}

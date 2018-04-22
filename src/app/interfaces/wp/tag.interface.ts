/**
 * Wordpress tags interface
 *
 * @export
 * @interface WPtag
 */
export interface WPtag {
  readonly id: number;
  readonly count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  readonly taxonomy: string;
  meta: any;
}

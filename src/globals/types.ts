export interface QuestionsResponse {
  items: QuestionType[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}
export interface QuestionType {
  tags?: string[] | null;
  owner: Owner;
  is_answered: boolean;
  view_count: number;
  answer_count: number;
  score: number;
  last_activity_date: number;
  creation_date: number;
  question_id: number;
  content_license: string;
  link: string;
  title: string;
  body: string;
  last_edit_date?: number | null;
  accepted_answer_id?: number | null;
}
export interface Owner {
  reputation: number;
  user_id: number;
  user_type: string;
  profile_image: string;
  display_name: string;
  link: string;
  accept_rate?: number | null;
}

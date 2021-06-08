import { QuestionsResponse } from '../globals/types';

export async function fetchStackoverflowQuestions({
  page = 1,
  pageSize = 100,
} = {}) {
  const url = new URL('https://api.stackexchange.com/2.2/questions');
  url.search = new URLSearchParams([
    ['key', process.env.REACT_APP_API_KEY as string],
    ['filter', 'withbody'],
    ['order', 'desc'],
    ['sort', 'activity'],
    ['site', 'stackoverflow'],
    ['page', page.toString()],
    ['pagesize', pageSize.toString()],
  ]).toString();

  const response: QuestionsResponse = await (
    await fetch(url.toString())
  ).json();

  const questions = response.items;

  return { questions };
}

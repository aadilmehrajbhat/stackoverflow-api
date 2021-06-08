import { useState, useEffect, useCallback } from 'react';
import type { QuestionType } from '../globals/types';
import { fetchStackoverflowQuestions } from '../services/api';

const MAX_QUESTION_SIZE = 30;

function useQuestionsData() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(MAX_QUESTION_SIZE);

  const filterUniqueQuestions = useCallback((questions: QuestionType[]) => {
    const questionIds = new Set<QuestionType['question_id']>();

    return questions.filter((question) => {
      if (!questionIds.has(question.question_id)) {
        questionIds.add(question.question_id);
        return true;
      }

      return false;
    });
  }, []);

  const fetchQuestions = async () => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const { questions: questionsList } = await fetchStackoverflowQuestions({
        page,
        pageSize,
      });

      setQuestions((prevQuestions) =>
        filterUniqueQuestions([...prevQuestions, ...questionsList]),
      );
      setPage((page) => page + 1);
    } catch (error) {
      console.log('Error while fetching questions:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    questions,
    fetchQuestions,
  };
}

export default useQuestionsData;

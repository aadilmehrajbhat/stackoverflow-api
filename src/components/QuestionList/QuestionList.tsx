import { InfiniteScroll } from '../InfiniteScroll';
import { QuestionItem, QuestionItemProps } from '../QuestionItem';
import type { QuestionType } from '../../globals/types';
import styles from './QuestionList.module.css';
import useQuestionsData from '../../hooks/useQuestionsData';
import { useState } from 'react';
import { QuestionDetail } from '../QuestionDetail';

function QuestionList() {
  const { questions, fetchQuestions } = useQuestionsData();

  const [activeQuestion, setActiveQuestion] =
    useState<QuestionType | null>(null);

  if (!Array.isArray(questions) || !questions.length) return null;

  return (
    <div className={styles.questionContainer}>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Created on</th>
          </tr>
        </thead>
        <tbody>
          <InfiniteScroll<QuestionType, QuestionItemProps>
            data={questions}
            renderItem={QuestionItem}
            itemProps={{ onQuestionItemClick: setActiveQuestion }}
            itemKey="question_id"
            scrollThreshold="500px"
            onScrollEnd={fetchQuestions}
          />
        </tbody>
      </table>
      {activeQuestion && (
        <QuestionDetail
          question={activeQuestion}
          onCloseClick={() => setActiveQuestion(null)}
        />
      )}
    </div>
  );
}

export default QuestionList;

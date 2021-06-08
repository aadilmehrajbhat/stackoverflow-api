import { useEffect, useRef } from 'react';
import styles from './QuestionDetail.module.css';
import type { QuestionType } from '../../globals/types';
import { getReadableDate } from '../../utils/date';
import useClickAway from '../../hooks/useClickAway';

type QuestionDetailProps = {
  question: QuestionType;
  onCloseClick: () => void;
};

function QuestionDetail({ question, onCloseClick }: QuestionDetailProps) {
  const questionDetailRef = useRef<HTMLDivElement | null>(null);

  useClickAway<HTMLDivElement | undefined>({
    root: questionDetailRef,
    callback: onCloseClick,
  });
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <section className={styles.questionDetailWrapper}>
      <div className={styles.questionDetailMain} ref={questionDetailRef}>
        <div className={styles.questionDetail}>
          <div className={styles.questionHeading}>
            <h2 dangerouslySetInnerHTML={{ __html: question.title }}></h2>
            <div className={styles.questionMeta}>
              <div>
                <p>
                  Asked by <b>{question.owner.display_name}</b> on{' '}
                  {getReadableDate(question.creation_date)}
                </p>
              </div>
              <a href={question.link} target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View question
              </a>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: question.body }}></div>
        </div>
        <button className={styles.questionClose} onClick={onCloseClick}>
          &times;
        </button>
      </div>
    </section>
  );
}

export default QuestionDetail;

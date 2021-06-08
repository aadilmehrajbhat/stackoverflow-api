import styles from './QuestionItem.module.css';
import { getReadableDate } from '../../utils/date';
import type { QuestionType } from '../../globals/types';
import { RefObject } from 'react';

export type QuestionItemProps = {
  item: QuestionType;
  itemRef: RefObject<Element> | null;
  onQuestionItemClick: (question: QuestionType) => void;
};

function QuestionItem({
  item,
  itemRef,
  onQuestionItemClick,
}: QuestionItemProps) {
  return (
    <tr
      className={styles.questionItem}
      onClick={(_) => onQuestionItemClick(item)}
      ref={itemRef as unknown as RefObject<HTMLTableRowElement>}
    >
      <td className={styles.author} title={item.owner.display_name}>
        {item.owner.display_name}
      </td>
      <td
        className={styles.question}
        dangerouslySetInnerHTML={{ __html: item.title }}
      ></td>
      <td className={styles.timestamp}>
        {getReadableDate(item.creation_date)}
      </td>
    </tr>
  );
}

export default QuestionItem;

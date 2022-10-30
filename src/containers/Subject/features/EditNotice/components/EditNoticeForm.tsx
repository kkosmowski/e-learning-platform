import { useTranslation } from 'react-i18next';

import { useNoticeForm } from 'shared/hooks';
import { NoticeForm } from 'shared/types/notice';

interface EditNoticeFormProps {
  initialValues: NoticeForm;
  onSubmit: (form: NoticeForm) => void;
}

export default function EditNoticeForm(props: EditNoticeFormProps) {
  const { initialValues, onSubmit } = props;
  const { t } = useTranslation('notice');

  const { Form } = useNoticeForm({
    initialValues,
    submitButtonLabel: t('common:save'),
    onSubmit,
    t,
  });

  return Form;
}

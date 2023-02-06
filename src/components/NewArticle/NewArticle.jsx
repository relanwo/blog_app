import { Button } from 'antd';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './NewArticle.module.scss';
import {
  changeChosenTag, clearArticle, clearTagsList, deleteChosenTag, editArticle, postNewArticle, setCreatedTag,
} from '../../store/article-slice';

function NewArticle({ articleData }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const editOrNewParam = location.pathname;

  const storeTags = useSelector((state) => state.articles.tagList);

  const onChange = (field, event) => sessionStorage.setItem(field, event.target.value);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      tags: [{ name: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });

  const onSubmit = async (data) => {
    if (articleData) {
      data.tagList = JSON.parse(sessionStorage.getItem('tagList'));
      data.tags = [];
      await dispatch(editArticle([articleData.slug, data])).then(() => {
        navigate(`/articles/${articleData.slug}`);
        dispatch(clearTagsList());
        dispatch(clearArticle());
      });
    } else {
      sessionStorage.setItem('tagList', JSON.stringify(fields));
      data.tagList = JSON.parse(sessionStorage.getItem('tagList')).map((element) => element?.name !== undefined && element.name);
      await dispatch(postNewArticle(data)).then(() => {
        navigate('/articles');
        dispatch(clearTagsList());
        dispatch(clearArticle());
      });
    }
  };

  const handleTagAdd = () => dispatch(setCreatedTag(''));

  const handleTagRemove = (index) => dispatch(deleteChosenTag(index));

  const handleInputChange = (event, index) => {
    let newData;
    if (storeTags) {
      const params = [index, event.target.value];
      dispatch(changeChosenTag(params));
      newData = event.target.value;
    } else {
      articleData.tagList[index] = event.target.value;
    }
    sessionStorage.setItem('tagList', newData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={style.form}
    >
      <p className={style.title}>
        {editOrNewParam === '/new-article'
          ? 'Create new article'
          : 'Edit article'}
      </p>
      <label className={style.wrapper}>
        Title
        <input
          {...register('title', {
            required: 'Title field can\'t be blank',
          })}
          className={style.input}
          placeholder="Title"
          style={{ border: errors.title ? '1px solid red' : '' }}
          onChange={(event) => onChange('title', event)}
          defaultValue={articleData ? sessionStorage.getItem('title') : ''}
        />
      </label>
      <div>
        {errors.title && <p className={style.error}>{errors.title.message || 'Some error'}</p>}
      </div>

      <label className={style.wrapper}>
        Short description
        <input
          {...register('description', {
            required: 'Short description field can\'t be blank',
          })}
          className={style.input}
          placeholder="Description"
          style={{ border: errors.description ? '1px solid red' : '' }}
          onChange={(event) => onChange('description', event)}
          defaultValue={articleData ? sessionStorage.getItem('description') : ''}
        />
      </label>
      <div>
        {errors.description && <p className={style.error}>{errors.description.message}</p>}
      </div>

      <label className={style.wrapper}>
        Text
        <textarea
          {...register('body', {
            required: 'Text field can\'t be blank',
          })}
          rows={11}
          className={style.input}
          placeholder="Text"
          style={{ border: errors.body ? '1px solid red' : '' }}
          onChange={(event) => onChange('body', event)}
          defaultValue={articleData ? sessionStorage.getItem('body') : ''}
        />
      </label>
      <div>
        {errors.body && <p className={style.error}>{errors.body.message}</p>}
      </div>

      <label className={style.wrapper}>
        Tags
      </label>
      <ul className={style['tag-wrapper']}>

        {(!articleData?.tagList ? fields : []).map((singleTag, index) => (
          <li className={style.tag} key={singleTag?.id ? singleTag.id : index}>
            <input
              {...register(`tags.${index}.name`)}
              className={style['tags-input']}
              placeholder="Tag"
            />
            {(fields && fields.length) > 1
                && (
                <Button
                  type="button"
                  className={style['delete-button']}
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
                )}

            {(fields && fields.length) - 1 === index
                && (
                <Button
                  type="button"
                  className={style['add-button']}
                  onClick={() => append()}
                >
                  Add Tag
                </Button>
                )}
          </li>
        ))}

        {(articleData?.tagList !== undefined ? articleData.tagList : []).map((singleTag, index) => (
          <li className={style.tag} key={index}>
            <input
              className={style['tags-input']}
              placeholder="Tag"
              defaultValue={singleTag}
              onChange={(event) => handleInputChange(event, index)}
            />
            {(articleData?.tagList !== undefined ? JSON.parse(sessionStorage.getItem('tagList')) : storeTags).length > 1
                && (
                <Button
                  className={style['delete-button']}
                  onClick={() => handleTagRemove(index)}
                >
                  Delete
                </Button>
                )}

            {(articleData?.tagList !== undefined ? articleData.tagList : storeTags).length - 1 === index
                && (
                <Button
                  className={style['add-button']}
                  onClick={() => handleTagAdd(index)}
                >
                  Add Tag
                </Button>
                )}
          </li>
        ))}
        <div>
          {errors.tag && <p className={style.error}>{errors.tag.message}</p>}
        </div>
      </ul>

      <button
        type="submit"
        className={
            isValid
              ? style.button
              : `${style.button} ${style.inactive}`
          }
      >
        Send
      </button>

    </form>
  );
}

export default NewArticle;

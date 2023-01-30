/* eslint-disable no-unused-vars */
import {Form, Input, TextArea, TagList, Button} from 'antd';
import NewArticle from '../components/NewArticle'

const NewArticlePage = () => {
  return (<NewArticle />)
  // const onSubmit = (data) => (slug ? handleUpdateArticle(data) : handleCreateArticle(data));
  // return (
    // <section 
    // // className={styles.section}
    // >
    //   <Form 
    //   title={'Create new article'}
    //   // title={slug ? 'Edit article' : 'Create new article'} 
    //   // onSubmit={handleSubmit(onSubmit)}
    //   >
    //     <div 
    //     // className={styles['input-wrapper']}
    //     >
    //       <Input
    //         placeholder="Title"
    //         label="Title"
    //         name="title"
    //         // register={register}
    //         required="Required"
    //         // errors={errors}
    //         minLength="6"
    //         maxLength="40"
    //       />
    //       <Input
    //         placeholder="Description"
    //         label="Short description"
    //         name="description"
    //         // register={register}
    //         required="Required"
    //         // errors={errors}
    //         minLength="6"
    //         maxLength="40"
    //       />
    //       <TextArea
    //         placeholder="Text"
    //         label="Text"
    //         name="body"
    //         // register={register}
    //         required="Required"
    //         // errors={errors}
    //         minLength="6"
    //         maxLength="200"
    //       />
    //       <TagList label="Tags" name="tagList" 
    //       // register={register} errors={errors} control={control} 
    //       required />
    //     </div>
    //     <div 
    //     // className={styles['button-wrapper']}
    //     >
    //       <Button type="primary" block size="large" htmlType="submit" 
    //       // loading={isLoading || isLoadingCreate}
    //       >
    //         Send
    //       </Button>
    //     </div>
    //   </Form>
    // </section>
    // );
};

export default NewArticlePage